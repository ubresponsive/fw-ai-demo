'use strict';

/**
 * @version 0.5
 * @overview Fluid Reveal Helper functions
 */
var fldRev = (function() {

   var _fldRev = {
      VERSION: "0.5",
      debug: false,
      baseUrl: "",
      themeDefined: false,

      log: {
         /** Debugging messages */
         trace: function() { if (_fldRev.debug) { console.log.apply(console, arguments); } },
         /** General messages */
         info: function() { console.info.apply(console, arguments); },
         /** General warnings */
         warn: function() { console.warn.apply(console, arguments); },
         /** Debugging errors */
         allay: function() { if (_fldRev.debug) { console.warn.apply(console, arguments); } },
         /** General errors */
         error: function() { console.error.apply(console, arguments); }
      },

      isDuplicateName: async function(name) {
         const resp = await fetch(this.baseUrl + `dashboardSaveIsDuplicate/${name}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + fldGetReportingAccessToken() }
         });
         return await resp.text();
      },

      getDashboardData: async function(name) {
         const resp = await fetch(this.baseUrl + `dashboards/data/${name}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + fldGetReportingAccessToken() }
         });
         return await resp.json();
      },

      saveDashboardData: function(name) {
         _fldRev.getDashboardData(name).then(jsonData => {
            // console.log(name);
            // console.log(jsonData);
            fldSaveReportingDashboardData(name, jsonData);
         });
      },

      /**
       * Return the DIV ID to attach the Reveal dashboard to.<br/>
       * @param {string} dummyDivId The ID to the dummy div created in the Fluid Activity Definition
       * @returns {string} The ID of the DIV to attach to
       * @memberof fldRev
       */
      getRevealDiv: function(dummyDivId) {

         var dummyDiv = document.getElementById(dummyDivId);
         var divId = "#" + dummyDiv.parentNode.parentNode.id;
         dummyDiv.remove();

         return divId;
      },

      getCssVar: function(varName) {
         return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      },
      
      getFontFamilyName: function(varName) {
         let value = _fldRev.resolveCssVar(varName);
         return value.split(',')[0].replace(/['"]/g, '').trim();
      },

      resolveCssVar: function(varName) {
         let value = _fldRev.getCssVar(varName);
         let varMatch = value.match(/^var\((--[^)]+)\)$/);
         while (varMatch) {
            value = _fldRev.getCssVar(varMatch[1]);
            varMatch = value.match(/^var\((--[^)]+)\)$/);
         }
         return value;
      },

   };

   /** 
    * @namespace fldRev 
    */
   var fldRev = {

      /**
       * Creates the Reveal View object and sets the default properties
       * @param {object} dashboard The dashboard returned from the load event
       * @param {string} dummyDivId The DIV ID to attach to
       * @param {boolean} canEdit Can the user edit this dashboard or save as a new dashboard
       * @param {string} visualizationName The name of the visulization to open in maximized mode and with singleVisualizationMode=true
       * @returns {object} The RevealView object.  Further properties can be set
       * @memberof fldRev
       */
      createRevealView: function(dashboard, dummyDivId, canEdit, visualizationName) {

         if (!_fldRev.themeDefined) {
            $.ig.RevealSdkSettings.theme = new FluidRevealTheme();
            _fldRev.log.info("Reveal Theme: FluidRevealTheme");
            _fldRev.themeDefined = true;
         }
         
         var divId = _fldRev.getRevealDiv(dummyDivId);
         var revealView = new $.ig.RevealView(divId);

         if (dashboard != null) {
            revealView.dashboard = dashboard;
         }

         if (canEdit) {
            fldRev.addRevealEditEvents(revealView);
         } else {
            revealView.canEdit = false;
            revealView.showSave = false;
            revealView.canCopyVisualization = false;
         }
         //Don't allow save-as unless in edit mode so that when exiting edit mode we can sync the dashboard definition
         revealView.canSaveAs = false;

         //revealView.interactiveFilteringEnabled = true;  needs to be done in the dashboard only if all the visulizations support the filter
         revealView.showMenu = true;
         //revealView.canMaximizeVisualization = true;
         //revealView.showHeader = true;
         //revealView.showRefresh = true;

         if (visualizationName != null) {
            revealView.maximizedVisualization = dashboard.visualizations.getByTitle(visualizationName);
            //revealView.canMaximizeVisualization = false;
            revealView.singleVisualizationMode = true;
            revealView.showMenu = true;
         }

         return revealView;
      },

      /**
       * Setup the Edit Events handler for the Reveal View.  Manages the saveing of a dashboard.
       * 
       * @param {object} revealView The Reveal View
       * @memberof fldRev
       */
      addRevealEditEvents: function(revealView) {

         revealView.onSave = (_rv, args) => {
            if (!args.dashboardId || args.saveAs) {
               isc.askForValue("Please enter the dashboard name", function(newName) {
                  if (newName == null) return;  //user clicked cancel
                  if (newName.trim() == "") {
                     isc.say("Please enter a name for the dashboard");
                     return;
                  } else {
                     _fldRev.isDuplicateName(newName.replaceAll(" ", "")).then(isDuplicate => {
                        if (isDuplicate === "true") {
                           isc.ask("A dashboard with name: " + newName.replaceAll(" ", "") + " already exists. Do you want to override it?", function(value) {
                              if (value) {
                                 args.dashboardId = newName.replaceAll(" ", "")
                                 args.name = newName;
                                 args.saveFinished();
                              } else {
                                 return;
                              }
                           });
                        } else {
                           args.dashboardId = newName.replaceAll(" ", "")
                           args.name = newName;
                           args.saveFinished();
                        }
                     });
                  }

               }, { defaultValue: args.name, width: 400 });
            } else {
               args.saveFinished();
            }
         }

         //When exiting edit mode, sync the reveal server definition with the ABL server backend
         revealView.onEditModeExited = (args) => {
            //send the data to the ABL backend to save as an activity definition
            _fldRev.saveDashboardData(args.dashboard._dashboardId);
            revealView.canSaveAs = false;
         }

         //Don't allow save-as unless in edit mode so that when exiting edit mode we can sync the dashboard definition
         revealView.onEditModeEntered = (args) => {
            revealView.canSaveAs = true;
         }

         revealView.onDashboardSelectorRequested = (args) => {
            //openDialog(args.callback);
            args.callback("Sales");  //for now just return "Sales" as a dummy dashboard to link to
         }

         revealView.onLinkedDashboardProviderAsync = (dashboardId, title) => {
            return $.ig.RVDashboard.loadDashboard(dashboardId);
         };
      },

      /**
       * Helper function to build a Fluid launch activity
       * @param {string} activityType The Fluid activity type (srd, htf, dash, etc)
       * @param {string} activityTabId The ID given to the new activity Tab.  
       *                               If the tab already exists then just refocus to it an inject the contract.  
       *                               If "null" then alway open a new activity.
       * @param {string} service The backend ABL service for this activity
       */
      buildLaunchActivity: function(activityType, activityTabId, service) {
         return activityType + "," + activityTabId.replaceAll(",", "_") + "," + service.replaceAll(",", "_");
      },

      /**
       * Build a launch activity for an SRD container
       * @param {string} service The backend ABL service for this activity
       */
      buildSrdLaunchActivity: function(service) {
         return fldRev.buildLaunchActivity("srd", "null", service);
      },

      /**
       * Build a launch activity for an HTF container
       * @param {string} service The backend ABL service for this activity
       */
      buildHtfLaunchActivity: function(service) {
         return fldRev.buildLaunchActivity("htf", "null", service);
      },

      /**
       * Build a launch activity for an DASH container
       * @param {string} service The backend ABL service for this activity
       */
      buildDashLaunchActivity: function(service) {
         return fldRev.buildLaunchActivity("dash", "null", service);
      },

      /**
       * Build a launch contract for an SRD container
       * @param {string} params A comma separated list of param=value pairs to pass into the activity
       * @param {boolean} clickFind Should the Find button be auto clicked.
       */
      buildSearchLaunchContract: function(params, clickFind) {
         var clickFindString = "no";
         if (clickFind === true) {
            clickFindString = "yes";
         }
         return "search[" + params + ",button.find.click=" + clickFindString + "]";
      },

      /**
       * Build a launch contract for an HTF container where a loadData() is called.
       * @param {string} rowid The ROWID or GUID of the record to load
       * @param {string} params A comma separated list of param=value pairs to pass as extra parameters to the loadData() call
       */
      buildLoadLaunchContract: function(rowid, params) {
         return "loadData[" + rowid + "," + params + "]";
      },

      /**
       * Returns the value of a specific claim from the user's JWT token
       * @param {string} claimName The name of the claim to retrieve
       * @returns {*} The claim value or null if not found or token is invalid
       * @memberof fldRev
       */
      getTokenClaim: function(claimName) {
         try {
            var token = fldGetReportingAccessToken();
            if (!token || typeof token !== 'string') {
               return null;
            }

            // JWT tokens have three parts separated by dots: header.payload.signature
            var parts = token.split('.');
            if (parts.length !== 3) {
               return null;
            }

            // Decode the payload (second part)
            var payload = parts[1];
            // Add padding if needed for base64 decoding
            while (payload.length % 4) {
               payload += '=';
            }

            // Decode base64 and parse JSON
            var decodedPayload = JSON.parse(atob(payload));
            
            // Return the requested claim
            return decodedPayload.hasOwnProperty(claimName) ? decodedPayload[claimName] : null;
            
         } catch (error) {
            _fldRev.log.error('Error parsing JWT token:', error);
            return null;
         }
      },

      /**
       * Version of this JavaScript library
       *
       * @constant {string}
       * @memberof fldRev
       */
      version: _fldRev.VERSION,

      /**
       * Returns the base URL to the FASRep (Reveal Reporting) server
       *
       * @constant {string}
       * @memberof fldRev
       */
      baseUrl: _fldRev.baseUrl
   };

   class FluidRevealTheme extends $.ig.RevealTheme {
      constructor() {
         super();

         const fontFamily = _fldRev.getFontFamilyName('--font-family');
         this.regularFont = fontFamily;
         this.mediumFont = fontFamily;
         this.boldFont = fontFamily;
         this.fontColor = _fldRev.resolveCssVar('--color-text-primary');

         this.accentColor = _fldRev.resolveCssVar('--color-action');
         this.chartColors = _fldRev.getCssVar('--color-chart-array')
            .split(',')
            .map(s => {
               const clean = s.replace(/['"]/g, '').trim();
               const match = clean.match(/^var\((--[^)]+)\)$/);
               if (match) {
                  return _fldRev.resolveCssVar(match[1]);
               }
               return clean;
            })
            .filter(Boolean);

         this.dashboardBackgroundColor = _fldRev.resolveCssVar('--color-background-grouped-secondary');
         this.useRoundedCorners = true;
         this.visualizationBackgroundColor = _fldRev.resolveCssVar('--color-background-grouped-primary');

      }
   }

   function init() {
      var currentUrl = new URL(document.location.href);
      if (currentUrl.searchParams.has("debug")) {
         _fldRev.debug = true;
      }
      
      var webapp = currentUrl.pathname.split("/", 2)[1];
      if (currentUrl.hostname == "localhost") {
         if (webapp == "Frameworks") {
            _fldRev.baseUrl = new URL("http://localhost:5111/Reporting/").toString();
         } else if (webapp == "AgilityFluid") {
            _fldRev.baseUrl = new URL("http://localhost:5111/Reporting/").toString();
         } else {
            _fldRev.baseUrl = new URL("http://localhost:5111/" + webapp.replace("fw", "rp") + "/").toString();
         }
      } else if (webapp == "Frameworks") {
         _fldRev.baseUrl = new URL("/Reporting/", currentUrl).toString();
      } else if (webapp == "AgilityFluid") {
         _fldRev.baseUrl = new URL("/Reporting/", currentUrl).toString();
      } else {
         _fldRev.baseUrl = new URL("/" + webapp.replace("fw", "rp") + "/", currentUrl).toString();
      }

      _fldRev.log.info("Fluid Reveal Helper version:" + _fldRev.VERSION);
      _fldRev.log.info("FASRep URL:" + _fldRev.baseUrl);

      $.ig.RevealSdkSettings.setBaseUrl(_fldRev.baseUrl);

      $.ig.RevealSdkSettings.enableBetaFeatures = (currentUrl.searchParams.get("enableBetaFeatures") == "true" || currentUrl.searchParams.has("enableAllReveal"));
      $.ig.RevealSdkSettings.enableNewToolbar = (currentUrl.searchParams.get("enableNewToolbar") == "true" || currentUrl.searchParams.has("enableAllReveal"));
      $.ig.RevealSdkSettings.enableActionsOnHoverTooltip = (currentUrl.searchParams.get("enableActionsOnHoverTooltip") == "true" || currentUrl.searchParams.has("enableAllReveal"));
      if (currentUrl.searchParams.get("enableNewCharts") != "false") {
         $.ig.RevealSdkSettings.enableNewCharts = true;
      }
      $.ig.RevealSdkSettings.enableScalingSupport = (currentUrl.searchParams.get("enableScalingSupport") == "true" || currentUrl.searchParams.has("enableAllReveal"));

      _fldRev.log.trace("Reveal Sdk Settings.enableBetaFeatures:" + $.ig.RevealSdkSettings.enableBetaFeatures);
      _fldRev.log.trace("Reveal Sdk Settings.enableNewToolbar:" + $.ig.RevealSdkSettings.enableNewToolbar);
      _fldRev.log.trace("Reveal Sdk Settings.enableActionsOnHoverTooltip:" + $.ig.RevealSdkSettings.enableActionsOnHoverTooltip);
      _fldRev.log.trace("Reveal Sdk Settings.enableNewCharts:" + $.ig.RevealSdkSettings.enableNewCharts);
      _fldRev.log.trace("Reveal Sdk Settings.enableScalingSupport:" + $.ig.RevealSdkSettings.enableScalingSupport);

      $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function(_url) {
         const headers = {};
         headers["Authorization"] = "Bearer " + fldGetReportingAccessToken();
         return headers;
      });

   };

   init();

   return fldRev;
})();

(function() {
   if (typeof define === 'function' && define.amd) {
      define(fldRev);
   } else if (typeof exports === 'object') {
      module.exports = fldRev;
   } else {
      window.fldRev = fldRev;
   }
})();

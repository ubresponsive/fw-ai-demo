/*============================================================
    "Frameworks" theme programmatic settings
============================================================*/

isc.loadSkin = function (theWindow) {
  if (theWindow == null) theWindow = window;
  with (theWindow) {
    //----------------------------------------
    // Specify skin directory
    //----------------------------------------
    // must be relative to your application file or isomorphicDir
    isc.Page.setSkinDir("[ISOMORPHIC]/skins/Frameworks7/");

    //----------------------------------------
    // Load skin style sheet(s) (Change version number to force browser to refresh cache
    //----------------------------------------
    // if loadStyleSheet() returns false, callback will fire when the CSS is loaded
    var cssLoaded = isc.Page.loadStyleSheet("[SKIN]/skin_styles.css?fld_version=2506261143", theWindow, 
                                            "isc.FontLoader.loadCustomFonts()");

    isc.Page.checkBrowserAndRedirect("[SKIN]/unsupported_browser.html");
    
    isc.Class.modifyFrameworkStart();
    
    // Register icons to resize with controls / fonts
    isc.Canvas.registerIconSizingAttributes(
        "fonts",
        {
            ComboBoxItem:[
                ["pickerIconHeight","pickerIconWidth"],
                ["pickButtonHeight","pickButtonWidth"]
            ],
            SelectItem:[
                ["pickerIconHeight","pickerIconWidth"],
                ["pickButtonHeight","pickButtonWidth"]
            ],
            CheckboxItem:[
                ["valueIconHeight","valueIconWidth"]
            ],
            TreeGrid: [
                "openerIconSize"
            ],
            ListGrid:[
                ["checkboxFieldImageHeight", "checkboxFieldImageWidth"],
                ["booleanImageHeight","booleanImageWidth"],
                "removeIconSize"
            ],
            ToolStripButton:[
                "height", 
                "iconSize"
            ],
            ToolStrip:["height"],
            Label:["height"],
            MenuButton:[
                ["iconHeight","iconWidth"],
                "iconSize"
            ],
            TabSet:[
                "defaultTabIconSize"
            ],
            SpinnerItem:[
                ["stackedIconsHeight", "stackedIconsWidth"]
            ],
            NotifySettings:[
                ["messageIconHeight", "messageIconWidth"]
            ]
        }
    );
    
    isc.Canvas.registerIconSizingAttributes(
        "controls",
        {
            DateItem:[
                ["pickerIconHeight","pickerIconWidth"]
            ],
            DatetimeItem:[
                ["pickerIconHeight","pickerIconWidth"]
            ],
            RelativeDateItem:[
                ["pickerIconHeight","pickerIconWidth"]
            ],
            MiniDateRangeItem:[
                ["pickerIconHeight", "pickerIconWidth"]
            ],
            ColorItem:[
                ["pickerIconHeight", "pickerIconWidth"]
            ],
            ListGrid: [
                "defaultEditableDateFieldWidth", 
                "defaultEditableDateTimeFieldWidth"
            ]
        }
    );

    isc.Canvas.registerIconSizingAttributes("controls",  {
        Snapbar: [
            ["gripBreadth", "gripLength"]
        ]
    }, 1/3);
    
    isc.Canvas.setAutoResizeIcons(true);
    
    isc.Canvas.registerAutoChildSizingAttributes(
        "fonts",
        "Window",
        {
            headerIconDefaults:["height","width"],
            restoreButtonDefaults:["height","width"],
            closeButtonDefaults:["height","width"],
            maximizeButtonDefaults:["height","width"],
            minimizeButtonDefaults:["height","width"]
        }
    );
    
    isc.Canvas.setAutoResizeAutoChildAttributes(true);    

    // register style declarations with padding that should track font size
    isc.Canvas.registerFontScaledPaddingStyles(
        [        "tabButtonTop",         "tabButtonBottom"], 
        ["iconOnlyTabButtonTop", "iconOnlyTabButtonBottom"],
        3
    );

    // ----------------------------------------------------- 
    // css3 and spriting are required for the current skin
    var useCSS3 = isc.Browser.useCSS3,
        useSpriting = isc.Browser.useSpriting;
        
    if (!useCSS3 || !useSpriting) {
        isc.logWarn(currentSkin.name+" skin makes use of HTML5 features which may be " +
            "unsupported in this browser. The appearance of components cannot " +
            "be guaranteed. See the 'Skinning' documentation topic for more information.");
    }
    
    isc.TabSet.addProperties({
      //closeTabIcon:
      //"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXgiPjxsaW5lIHgxPSIxOCIgeTE9IjYiIHgyPSI2IiB5Mj0iMTgiPjwvbGluZT48bGluZSB4MT0iNiIgeTE9IjYiIHgyPSIxOCIgeTI9IjE4Ij48L2xpbmU+PC9zdmc+",
    });

   isc.Canvas.setProperties({
     //This is a custom Fluid attribute to control that when a form or lgrid is hidden it will 
     // auto collapse all Canvas wrappers containing the form or lgrid.
	 fldAutoCollapse: true,
     // this skin uses custom scrollbars
     groupBorderCSS: "1px solid red",
     showCustomScrollbars: true,
   });

   if (isc.Browser.isIE && isc.Browser.version >= 7 && !isc.Browser.isIE9) {
     isc.Canvas.setAllowExternalFilters(false);
     isc.Canvas.setNeverUseFilters(true);

     if (isc.Window) {
       isc.Window.addProperties({
         modalMaskOpacity: null,
         modalMaskStyle: "normal",
       });
       isc.Window.changeDefaults("modalMaskDefaults", {
         src: "[SKIN]opacity.png",
       });
     }
   }

   if (isc.RPCManager) {
     isc.RPCManager.addClassProperties({
       promptStyle: "cursor",
     });
   }

   //----------------------------------------
   // 1) Scrollbars
   //----------------------------------------
   isc.SimpleScrollThumb.addProperties({
     imageWidth: 10,
     imageHeight: 10,
     baseStyle: "scrollThumb",
     hSrc: "[SKIN]hthumb_grip.png",
     vSrc: "[SKIN]vthumb_grip.png",
   });

   isc.Scrollbar.addProperties({
     baseStyle: "scrollbar",
     btnSize: 18,
     hSrc: "[SKIN]hscroll.png",
     hThumbClass: isc.HSimpleScrollThumb,
     showRollOver: true,
     thumbInset: 0,
     thumbMinSize: 20,
     thumbOverlap: 2,
     vSrc: "[SKIN]vscroll.png",
     vThumbClass: isc.VSimpleScrollThumb,
   });

   //----------------------------------------
   // 2) Buttons
   //----------------------------------------
   isc.Button.addProperties({
     height: 22,
     baseStyle: "button",
     showFocusedAsOver:false,
     showFocusOutline:false
   });

   // define IButton so examples that support the new SmartClient skin image-based
   // button will fall back on the CSS-based Button with this skin
   isc.ClassFactory.defineClass("IButton", "Button").addProperties({
     baseStyle: "buttonRounded",
     showFocusedAsOver:false,
     showFocusOutline:false
   });
   isc.ClassFactory.defineClass(
     "IAutoFitButton",
     "AutoFitButton"
   ).addProperties({
     baseStyle: "buttonRounded",
   });

   if (isc.IButton.markAsFrameworkClass != null)
     isc.IButton.markAsFrameworkClass();
   if (isc.IAutoFitButton.markAsFrameworkClass != null)
     isc.IAutoFitButton.markAsFrameworkClass();

   isc.ClassFactory.defineClass("HeaderMenuButton", "IButton").addProperties(
     {
       baseStyle: "headerButton",
     }
   );

   // Have IMenuButton be just a synonym for IMenuButton
   if (isc.MenuButton) {
     isc.ClassFactory.overwriteClass("IMenuButton", "MenuButton");

     if (isc.IMenuButton.markAsFrameworkClass != null)
       isc.IMenuButton.markAsFrameworkClass();

     isc.MenuButton.addProperties({
       // copy the header (.button) background-color to match when sort arrow is hidden
       baseStyle: "button",
     });

     if (isc.ITreeMenuButton) {
       isc.ClassFactory.overwriteClass("ITreeMenuButton", "TreeMenuButton");
       if (isc.ITreeMenuButton.markAsFrameworkClass != null) {
         isc.ITreeMenuButton.markAsFrameworkClass();
       }
     }
   }

   if (isc.MenuButton) {
     isc.MenuButton.addProperties({
       baseStyle: "menuButton",
       iconHeight: 4,
       iconWidth: 7,
       menuButtonImage: "[SKIN]menu_button.png",
       menuButtonImageUp: "[SKIN]menu_button_up.png",
       showFocusedAsOver: true,
     });
   }

   if (isc.IMenuButton) {
     isc.IMenuButton.addProperties({
       capSize: 4,
       height: 22,
       iconWidth: 7,
       iconHeight: 4,
       menuButtonImage: "[SKIN]menu_button.png",
       menuButtonImageUp: "[SKIN]menu_button_up.png",
       showFocused: true,
       showFocusedAsOver: true,
       src: "[SKIN]button/button.png",
       titleStyle: "buttonTitle",
       vertical: false,
       width: 100,
     });
   }

   if (isc.Menu) {
     isc.Menu.addProperties({
       bodyBackgroundColor: null,
       bodyStyleName: "gridBody",
       cellHeight: 22,
       checkmarkDisabledImage: {
         src: "[SKIN]check_disabled.png",
         width: 7,
         height: 6,
       },
       checkmarkImage: { src: "[SKIN]check.png", width: 9, height: 8 },
       fastCellUpdates: false,
       iconBodyStyleName: "menuMain",
       shadowDepth: 5,
       showEdges: false,
       showShadow: false,
       submenuDisabledImage: {
         src: "[SKINIMG]/custom/actions/submenu_Disabled.png",
         height: 9,
         width: 5,
       },
       submenuImage: {
         src: "[SKINIMG]/custom/actions/submenu.png",
         height: 9,
         width: 5,
       },
       showIcons: false,
     });

     isc.addProperties(isc.Menu.ICON_FIELD, {
       baseStyle: "menuIconField",
       width: 24,
     });

     isc.Menu.TITLE_FIELD.baseStyle = "menuTitleField";
   }

   if (isc.PickTreeItem) {
     isc.PickTreeItem.addProperties({
       buttonDefaults: { height: 21 },
     });
   }

   isc.Label.addProperties({
     showFocused: false,
   });

   //----------------------------------------
   // 3) Resizebars
   //----------------------------------------
   // StretchImgSplitbar class renders as resize bar
   isc.StretchImgSplitbar.addProperties({
     capSize: 10,
     showGrip: true,
     showOver: false,
   });

   isc.Snapbar.addProperties({
     hBaseStyle: "hSplitbar",
     vBaseStyle: "vSplitbar",
     showGrip: true,
     gripBreadth: 7,
     gripLength: 41,
     autoApplyDownState: false,
     hSrc: {
       _base: `sprite:[SKIN]sprited_grips.png;offset:${-56 * 3},${
         -28 * 3
       };size:${82 * 3},${14 * 3}`,
       Over: `sprite:[SKIN]sprited_grips.png;offset:${-56 * 3},${
         -56 * 3
       };size:${82 * 3},${14 * 3}`,
       closed: `sprite:[SKIN]sprited_grips.png;offset:${-56 * 3},-${
         14 * 3
       };size:${82 * 3},${14 * 3}`,
       OverClosed: `sprite:[SKIN]sprited_grips.png;offset:${-56 * 3},${
         -42 * 3
       };size:${82 * 3},${14 * 3}`,
     },
     vSrc: {
       _base: `sprite:[SKIN]sprited_grips.png;offset: ${-14 * 3},0;size:${
         14 * 3
       },${82 * 3}`,
       Over: `sprite:[SKIN]sprited_grips.png;offset:${-42 * 3},0;size:${
         14 * 3
       },${82 * 3}`,
       closed: `sprite:[SKIN]sprited_grips.png;offset:  0,0;size:${14 * 3},${
         82 * 3
       }`,
       OverClosed: `sprite:[SKIN]sprited_grips.png;offset:${
         -28 * 3
       },0;size:${14 * 3},${82 * 3}`,
     },
     items: [{ name: "blank", width: "*", height: "*" }],
     showDown: false,
     showDownGrip: false,
     showRollOver: false,
   });

   isc.Layout.addProperties({
     resizeBarSize: 7,
     // Use the Snapbar as a resizeBar by default - subclass of Splitbar that
     // shows interactive (closed/open) grip images
     // Other options include the Splitbar, StretchImgSplitbar or ImgSplitbar
     resizeBarClass: "Snapbar",
     customPickerHeight: 14,
     customPickerWidth: 13,
     customPickerIcon: "[SKINIMG]/custom/buttons/search_icon.png",
     customerPickerIconNoTabIndex: true,
     customPickerInline: true,
     customPickerStyle: null,
     customPickerHspace: 0,
     customLayoutMargin: 5,
     customDashLayoutMargin: 5,
     customSearchLayoutMargin: 5,
     customActivityTabMarginV: 5,
     customActivityTabMarginH: 5,
     customActivityTabPaneStyle: "activityTabPane",
     customActivityTabSetContainerStyle: "activityTabSetContainer",
     customPopupWindowContainerStyle: "activityPane"
   });
   isc.overwriteClass("LayoutResizeBar", "LayoutResizeSnapbar");

   if (isc.ListGrid) {
     isc.ListGrid.addProperties({
       alternateRecordStyles: true,
       alternateBodyStyleName: null,
       backgroundColor: null,
       cellHeight: 22,
       checkboxFieldImageHeight: 13,
       checkboxFieldImageWidth: 13,
       editFailedCSSText: "color:FF6347;",
       errorIconSrc: "[SKINIMG]actions/exclamation.png",
       expansionFieldImageHeight: 16,
       expansionFieldImageWidth: 16,
       expansionFieldFalseImage: "[SKINIMG]/ListGrid/row_collapsed.png",
       expansionFieldTrueImage: "[SKINIMG]/ListGrid/row_expanded.png",
       expansionFieldImageWidth: 16,
       expansionFieldImageHeight: 16,
       groupIcon: "[SKINIMG]/ListGrid/group.png",
       groupIconPadding: 3,
       groupLeadingIndent: 1,
       headerBackgroundColor: null,
       headerBaseStyle: "headerButton",
       headerHeight: 31 /*23*/,
       headerMenuButtonIcon: "[SKINIMG]ListGrid/sort_descending.png",
       headerMenuButtonConstructor: "HeaderMenuButton",
       headerMenuButtonWidth: 17,
       normalCellHeight: 22,
       showHeaderMenuButton: true,
       sortAscendingImage: {
         src: "[SKINIMG]ListGrid/sort_ascending.png",
         width: 9,
         height: 6,
       },
       sortDescendingImage: {
         src: "[SKINIMG]ListGrid/sort_descending.png",
         width: 9,
         height: 6,
       },
       summaryRowHeight: 21,
       tallBaseStyle: "tallCell",
       filterEditorProperties: {
         height: 25,
         cellWidth: 40
        
       },
       filterButtonProperties: {
         iconHeight: 25,
         iconWidth: 16
       },
     });
   }

   if (isc.TreeGrid) {
     isc.TreeGrid.addProperties({
       alternateRecordStyles: false,
       folderIcon: "[SKIN]folder.png",
       manyItemsImage: "[SKIN]folder_file.png",
       nodeIcon: "[SKIN]file.png",
       normalBaseStyle: "treeCell",
       openerIconSize: 22,
       openerImage: "[SKIN]opener.png",
       sortAscendingImage: {
         src: "[SKINIMG]ListGrid/sort_ascending.png",
         width: 9,
         height: 6,
       },
       sortDescendingImage: {
         src: "[SKINIMG]ListGrid/sort_descending.png",
         width: 9,
         height: 6,
       },
       tallBaseStyle: "treeTallCell",
     });
   }

   if (isc.MultiSortPanel) {
     isc.MultiSortPanel.changeDefaults("levelUpButtonDefaults", {
       src: "[SKINIMG]TransferIcons/up.png",
       height: 22,
       width: 24,
     });
     isc.MultiSortPanel.changeDefaults("levelDownButtonDefaults", {
       src: "[SKINIMG]TransferIcons/down.png",
       height: 22,
       width: 24,
     });
   }

   if (isc.TabSet) {
     isc.TabSet.addProperties({
       closeIcon: "",
       closeTabIconSize: 12,
       paneContainerClassName: "tabSetContainer",
       paneMargin: 5,
       pickerButtonSize: 20,
       pickerButtonSrc: "[SKIN]picker.png",
       showScrollerRollOver: false,
       scrollerButtonSize: 19,
       scrollerSrc: "[SKIN]scroll.png",
       showEdges: false,
       symmetricScroller: false,
       symmetricPickerButton: false,
       tabBarThickness: 27,
       useSimpleTabs: true,
     });

     // In Netscape Navigator 4.7x, set the backgroundColor directly since the css
     // background colors are not reliable
     if (isc.Browser.isNav) {
       isc.TabSet.addProperties({
         paneContainerDefaults: { backgroundColor: "#FFFFFF" },
       });
     }

     isc.TabBar.addProperties({
       baseLineConstructor: "Canvas",
       baseLineProperties: {
         backgroundColor: "#b9b9b9",
         height: 1,
         overflow: "hidden",
       },
       baseLineThickness: 1,
       bottomStyleName: "tabBarBottom",
       layoutEndMargin: 5,
       layoutStartMargin: 5,
       leadingMargin: 5,
       leftStyleName: "tabBarLeft",
       membersMargin: 3,
       rightStyleName: "tabBarRight",
       styleName: "tabBar",
       topStyleName: "tabBarTop",
     });
   }

   if (isc.ImgTab) isc.ImgTab.addProperties({ capSize: 6 });

   if (isc.Window) {
     isc.Window.addProperties({
       backgroundColor: null,
       bodyStyle: "windowBody",
       layoutBottomMargin: 4,
       layoutLeftMargin: 4,
       layoutRightMargin: 4,
       layoutTopMargin: 1,
       modalMaskOpacity: 10,
       membersMargin: 0,
       styleName: "windowBackground",
       showHeaderBackground: false,
       showFooter: false,
     });

     isc.Window.changeDefaults("headerDefaults", {
       height: 20,
       layoutMargin: 0,
     });

     isc.Window.changeDefaults("resizerDefaults", {
       src: "[SKIN]/Window/resizer.png",
     });

     isc.Window.changeDefaults("headerIconDefaults", {
       height: 15,
       src: "[SKIN]/Window/headerIcon.png",
       width: 15,
     });

     isc.Window.changeDefaults("restoreButtonDefaults", {
       height: 15,
       showDown: false,
       showRollOver: true,
       src: "[SKIN]/headerIcons/cascade.png",
       width: 15,
     });

     isc.Window.changeDefaults("closeButtonDefaults", {
       height: 15,
       showDown: false,
       showRollOver: true,
       src: "[SKIN]/headerIcons/close.png",
       width: 15,
     });

     isc.Window.changeDefaults("maximizeButtonDefaults", {
       height: 15,
       showRollOver: true,
       src: "[SKIN]/headerIcons/maximize.png",
       width: 15,
     });

     isc.Window.changeDefaults("minimizeButtonDefaults", {
       height: 15,
       showDown: false,
       showRollOver: true,
       src: "[SKIN]/headerIcons/minimize.png",
       width: 15,
     });

     isc.Window.changeDefaults("toolbarDefaults", {
       buttonConstructor: "IButton",
     });

     if (isc.ColorPicker) {
       isc.ColorPicker.addProperties({
         layoutMargin: 2,
       });
     }
   }

   if (isc.Dialog) {
     isc.Dialog.addProperties({
       bodyColor: "#FFFFFF",
       bodyStyle: "windowBody",
       leaveHeaderGap: true,

       layoutBottomMargin: 4,
       layoutLeftMargin: 4,
       layoutRightMargin: 4,
       layoutTopMargin: 1,
       modalMaskOpacity: 10,
       membersMargin: 0,
       styleName: "windowBackground",
       showHeaderBackground: false,
       showFooter: false,
     });

     // even though Dialog inherits from Window, we need a separate changeDefaults block
     // because Dialog defines its own toolbarDefaults
     isc.Dialog.changeDefaults("toolbarDefaults", {
       buttonConstructor: "IButton",
       height: 42, // 10px margins + 22px button
       membersMargin: 10,
     });

     isc.Dialog.changeDefaults("bodyDefaults", {
       layoutTopMargin: 10,
       layoutLeftMargin: 15,
       layoutRightMargin: 15,
       layoutBottomMargin: 10,
     });

     if (isc.Dialog.Warn && isc.Dialog.Warn.toolbarDefaults) {
       isc.addProperties(isc.Dialog.Warn.toolbarDefaults, {
         buttonConstructor: "IButton",
         height: 42,
         membersMargin: 10,
       });
     }

     // Modify the prompt dialog to show a header
     // In the css3-off mode header media is part of the background image, so
     // a header appears to show even though there's no true header widget.
     if (isc.Dialog.Prompt) {
       isc.addProperties(isc.Dialog.Prompt, {
         showHeader: true,
         showTitle: false,
         showCloseButton: false,
         bodyStyle: "windowBody",
       });
     }
   }

   // Dynamic form skinning
   if (isc.SectionHeader) {
     isc.SectionHeader.addProperties({
       //icon:"[SKIN]/SectionHeader/opener.png"
       icon: "[SKINIMG]/custom/actions/opener.png",
       iconHeight: 11,
       iconWidth: 17,
     });
   }

   if (isc.DynamicForm) {
     isc.DynamicForm.addProperties({
       requiredTitlePrefix: "",
       requiredTitleSuffix: "*",
       titleSuffix: "",
       titlePrefix: ""
     });
   }

   if (isc.FormItem) {
     isc.FormItem.addProperties({
       defaultIconSrc: "[SKIN]/DynamicForm/default_formItem_icon.png",
       errorIconSrc: "[SKINIMG]actions/exclamation.png",
       iconHeight: 18,
       iconVAlign: "middle",
       iconWidth: 18,
     });

     //            isc.FormItem.addMethods({
     //	            // this is a copy of the same function is ISC_Forms.js (Version v11.1p_2018-01-29)
     //            	// only added .replace for not strict standard mode
     //            	getErrorIconHTML : function (error) {
     //
     //	                this._currentIconError = error;
     //
     //	                var id = this.getErrorIconId();
     //
     //	                var errorString = "";
     //	                // add the error as an aria-label so that we can point to this as an "aria-describedby"
     //	                // element.  This is added as part of the "extraStuff" parameter below
     //	                if (error != null && isc.Canvas.ariaEnabled() && !isc.Canvas.useLiteAria()) {
     //	                    if (isc.isAn.Array(error)) error = error.join(",");
     //	                    errorString = " aria-label='" + String.asAttValue(String.htmlStringToString(error)) + "'";
     //	                }
     //
     //	                var HTML= this._getIconImgHTML(
     //	                        // unique ID for the img
     //	                        id,
     //	                        this.errorIconWidth, this.errorIconHeight,
     //	                        //vAlign for the icon
     //	                        "top",
     //	                        0,  // vMargin
     //	                        // No left margin for the icon, no background-color for this icon
     //	                        null,
     //	                        null,
     //
     //	                        // Src
     //
     //	                        this.form.getImgURL(this.errorIconSrc),
     //	                        // always suppress 'display:block' in standards mode
     //	                        false,
     //	                        // extraStuff for error icon info for event (This will cause error text
     //	                        // to show up in a hover)
     //	                        // getIconImgHTML doesn't handle this directly since we usually
     //	                        // don't have img-only icons be interactive.
     //	                        isc.DynamicForm._containsItem + "='" + this.getID() + "' " +
     //
     //	                        // Don't use the same ID for the icon part name (used for event handling)
     //	                        // as for the element in the DOM - the 'errorIconId' is retrieved via
     //	                        // _getDOMId which guarantees
     //	                        // a unique ID within the page (required for img name / dom element ID etc),
     //	                        // but doesn't guarantee consistency across page reloads etc.
     //	                        // We want the eventPart type ID to be consistent so the autoTest subsystem
     //	                        // can reliably identify error icons.
     //	                        isc.DynamicForm._itemPart + "='" + this.errorIconName + "'" +
     //	                        errorString
     //	                );
     //
     //	                // this is the customisation
     //	                if (isc.Browser.isStrict) {
     //	                	return HTML;
     //	                } else {
     //	                	return HTML.replaceAll("display:block", "display:inline");
     //	                }
     //
     //	            }
     //            });
   }

   if (isc.CheckboxItem) {
     isc.CheckboxItem.addProperties({
       checkedImage: "[SKINIMG]/DynamicForm/checked.png",
       partialSelectedImage: "[SKINIMG]/DynamicForm/partialcheck.png",
       showValueIconFocused: true,
       showValueIconOver: false,
       uncheckedImage: "[SKINIMG]/DynamicForm/unchecked.png",
       unsetImage: "[SKINIMG]/DynamicForm/unsetcheck.png",
       valueIconWidth: 13,
       valueIconHeight: 13,
     });
   }

   if (isc.TextItem) {
     isc.TextItem.addProperties({
       height: 22,
       showFocused: true,
     });
   }

   if (isc.HeaderItem) {
     isc.HeaderItem.addProperties({
       height: 22,
     });
   }

   // bug fix: needs to be display:block so that rowspacer height property is honoured
   if (isc.RowSpacerItem) {
     isc.RowSpacerItem.addProperties({
       height: 22,
       width: 20,
     });
     //            isc.RowSpacerItem.addMethods({
     //
     //                getElementHTML : function (value) {
     //                	HTML = isc.Canvas.spacerHTML(this.width, this.height);
     //                    return HTML.replaceAll("display:inline-block", "display:block");
     //                }
     //
     //            });
   }

   // bug fix: needs to be display:block so that spacer height property is honoured
   if (isc.SpacerItem) {
     isc.SpacerItem.addProperties({
       height: 22,
       width: 20,
     });
     //            isc.SpacerItem.addMethods({
     //
     //                getElementHTML : function (value) {
     //                	HTML = isc.Canvas.spacerHTML(this.width, this.height);
     //                    return HTML.replaceAll("display:inline-block", "display:block");
     //                }
     //
     //            });
   }

   if (isc.TextAreaItem) {
     isc.TextAreaItem.addProperties({
       showFocused: true,
     });
   }

   if (isc.LinkItem) {
     isc.LinkItem.addProperties({
       textBoxStyle: "staticTextItem",
       readOnlyTextBoxStyle: "staticTextItemDisabled",
       height: 22,
     });
   }

   if (isc.SelectItem) {
     isc.SelectItem.addProperties({
       height: 22,
       pickerIconSrc: "[SKINIMG]/custom/buttons/dropdown2.png",
       pickerIconWidth: 10,
       pickerIconHeight: 8,
       pickerIconStyle:"selectItemPickerIcon",
       showOver:false,
       updateTextBoxOnOver:false,
       updateControlOnOver:true,
       showFocusedPickerIcon:false,
       textBoxStyle: "selectItemText",
       controlStyle:"selectItemControl"
     });
     isc.SelectItem.changeDefaults("pickerIconDefaults", {
         showOver: false,
         showRTL: false
     });
     isc.SelectItem.changeDefaults("separateValuesListDefaults", {
         showOverAsSelected: false
     });

     if (isc.NativeSelectItem) {
         isc.NativeSelectItem.addProperties({
             width: 220
         });
     }
   }

   if (isc.ComboBoxItem) {
     isc.ComboBoxItem.addProperties({
       height: 22,
       pendingTextBoxStyle: "selectItemPendingText",
       pickerIconSrc: "[SKINIMG]/custom/buttons/dropdown2.png",
       pickerIconWidth: 10,
       pickerIconHeight: 8,
       pickerIconStyle:"selectItemPickerIcon",
       showOver:false,
       updateTextBoxOnOver:false,
       updateControlOnOver:true,
       showFocusedPickerIcon:false,
       textBoxStyle: "selectItemText",
       controlStyle:"selectItemControl"
     });
     
     isc.ComboBoxItem.changeDefaults("pickerIconDefaults", {
         showOver: false,
         showRTL: false
     });
     
     isc.ComboBoxItem.changeDefaults("separateValuesListDefaults", {
         showOverAsSelected: false
     });
     
     if (!isc.Browser.isIE || isc.Browser.isIE11) {
         isc.ComboBoxItem.changeDefaults("pickerSearchFormDefaults", {
             height: 22
         });
         isc.ComboBoxItem.changeDefaults("pickerSearchFieldDefaults", {
             textBoxStyle: "pickerSearchBox",
             icons: [{
                 name: "search",
                 inline: true,
                 imgOnly: true,
                 src: "[SKINIMG]/custom/buttons/search_icon.png",
                 width: 14,
                 height: 15,
                 showRTL: false,
                 click : function (form, item, icon) {
                     item.focusInItem();
                 }
             }]
         });
     }
   }

   // used by SelectItem and ComboBoxItem for picklist
   if (isc.ScrollingMenu) {
     isc.ScrollingMenu.addProperties({
       shadowDepth: 5,
       showShadow: false,
     });
   }

   if (isc.DateItem) {
     isc.DateItem.addProperties({
       width: 220,
       height: 22,
       monthSelectorProperties: {width:63},
       daySelectorProperties: {width:51},
       yearSelectorProperties: {width:69},
       pickerIconHeight: 22,
       pickerIconWidth: 21,
       pickerIconSrc: "[SKINIMG]/custom/buttons/calendar.png",
     });
     isc.DateItem.changeDefaults("pickerIconDefaults", {
       showOver: false,
       src: "[SKINIMG]/custom/buttons/calendar.png",
       tabIndex: -1 /*FLUID added*/,
     });
   }

   if (isc.SpinnerItem) {
     isc.SpinnerItem.addProperties({
       height: 22,
       textBoxStyle: "selectItemText",
     });

     isc.SpinnerItem.INCREASE_ICON = isc.addProperties(
       isc.SpinnerItem.INCREASE_ICON,
       {
         height: 11,
         imgOnly: true,
         showDown: false,
         showFocused: false,
         showRollOver: false,
         src: "[SKIN]/DynamicForm/spinner_control_increase.png",
         width: 16,
       }
     );

     isc.SpinnerItem.DECREASE_ICON = isc.addProperties(
       isc.SpinnerItem.DECREASE_ICON,
       {
         height: 11,
         imgOnly: true,
         showDown: false,
         showFocused: false,
         showRollOver: false,
         src: "[SKIN]/DynamicForm/spinner_control_decrease.png",
         width: 16,
       }
     );
   }

   if (isc.PopUpTextAreaItem) {
     isc.PopUpTextAreaItem.addProperties({
       popUpIconHeight: 16,
       popUpIconSrc: "[SKIN]/DynamicForm/text_control.gif",
       popUpIconWidth: 16,
     });
   }
   if (isc.ButtonItem && isc.IButton) {
     isc.ButtonItem.addProperties({
       showFocused: true,
       showFocusAsOver: false,
       showFocusOutline:false,
       buttonConstructor: isc.IButton,
       height: 22,
     });
   }

   if (isc.ToolbarItem && isc.IAutoFitButton) {
     isc.ToolbarItem.addProperties({
       buttonConstructor: isc.IAutoFitButton,
       buttonProperties: { autoFitDirection: isc.Canvas.BOTH },
     });
   }

   if (isc.DateRangeDialog) {
     isc.DateRangeDialog.changeDefaults("headerIconProperties", {
       src: "[SKINIMG]/custom/buttons/calendar.png",
     });
   }

   if (isc.MiniDateRangeItem) {
     isc.MiniDateRangeItem.changeDefaults("pickerIconDefaults", {
       src: "[SKINIMG]/custom/buttons/calendar.png",
     });
   }

   if (isc.RelativeDateItem) {
     isc.RelativeDateItem.changeDefaults("pickerIconDefaults", {
       src: "[SKINIMG]/custom/buttons/calendar.png",
     });
   }

   // Native FILE INPUT items are rendered differently in Safari from other browsers
   // Don't show standard textbox styling around them as it looks odd
   if (isc.UploadItem && isc.Browser.isSafari) {
     isc.UploadItem.addProperties({
       textBoxStyle: "normal",
     });
   }

   if (isc.DateGrid) {
       isc.DateGrid.addProperties({
           minFieldWidth:33,
           cellHeight:27,
           alternateFieldStyles: false,
           fiscalYearColWidth: 45
       });
   }
   
   if (isc.DateChooser) {
     isc.DateChooser.addProperties({
       alternateWeekStyles: false,
       backgroundColor: null,
       baseNavButtonStyle: "dateChooserNavButton",
       baseWeekdayStyle: "dateChooserWeekday",
       baseWeekendStyle: "dateChooserWeekend",
       baseBottomButtonStyle: "dateChooserBorderedBottomButton",
       headerStyle: "dateChooserButton",
       nextMonthIcon: "[SKINIMG]/DateChooser/arrow_right.png",
       nextMonthIconHeight: 20,
       nextMonthIconWidth: 20,
       nextYearIcon: "[SKINIMG]/DateChooser/doubleArrow_right.png",
       nextYearIconHeight: 20,
       nextYearIconWidth: 20,
       prevMonthIcon: "[SKINIMG]/DateChooser/arrow_left.png",
       prevMonthIconHeight: 20,
       prevMonthIconWidth: 20,
       prevYearIcon: "[SKINIMG]/DateChooser/doubleArrow_left.png",
       prevYearIconHeight: 20,
       prevYearIconWidth: 20,
       showDoubleYearIcon: false,
       showEdges: false,
       skinImgDir: "images/DateChooser/",
       todayButtonHeight: 20,
       weekendHeaderStyle: "dateChooserWeekendButton",
       styleName: "dateChooserBorder",
       borderCalendar:0,
       width:200,
       timeLayoutIsVisibleWidth:300,
       timeLayoutIsVisibleMinFieldWidth:47,
       monthMenuFormat:"MMMM",
       weekHeaderStyle: "dateChooserButton",
       fiscalYearHeaderStyle: "dateChooserButton"
     });
     
     isc.DateChooser.changeDefaults("timeLayoutDefaults", { 
         styleName:"dateChooserBorderTop", align:"center"
     });
     isc.DateChooser.changeDefaults("todayButtonDefaults", { 
         autoFit: false,
         overflow: "visible",
         width: 70,
         minWidth: 70
     });
     isc.DateChooser.changeDefaults("cancelButtonDefaults", { 
         autoFit: false,
         overflow: "visible",
         width: 70,
         minWidth: 70
     });
     isc.DateChooser.changeDefaults("applyButtonDefaults", { 
         autoFit: false,
         overflow: "visible",
         width: 70,
         minWidth: 70
     });
     isc.DateChooser.changeDefaults("buttonLayoutDefaults", { 
         membersMargin:10, 
         layoutMargin: 0, 
         layoutTopMargin:4, 
         styleName:"dateChooserBorderTop",
         height:44
     });
     isc.DateChooser.changeDefaults("navigationLayoutDefaults", { 
         styleName:"dateChooserBorderBottom",
         height:32,
         layoutMargin: 0
     });
     isc.DateChooser.changeDefaults("weekChooserButtonDefaults", { height:35, minWidth: 30, width:30, align:"right", showFocusedAsOver: true });
     isc.DateChooser.changeDefaults("fiscalYearChooserButtonDefaults", { height:35, minWidth: 45, width:45, align:"right", showFocusedAsOver: true });
     isc.DateChooser.changeDefaults("previousYearButtonDefaults", { height:35, width:30, align:"right", showFocusedAsOver: true });
     isc.DateChooser.changeDefaults("previousMonthButtonDefaults", { height:35, width:30, align:"left", showFocusedAsOver: true });
     isc.DateChooser.changeDefaults("monthChooserButtonDefaults", { height:35 });
     isc.DateChooser.changeDefaults("yearChooserButtonDefaults", { height:35 });
     isc.DateChooser.changeDefaults("nextMonthButtonDefaults", { height:35, width:30, align:"right", showFocusedAsOver: true });
     isc.DateChooser.changeDefaults("nextYearButtonDefaults", { height:35, width:30, align:"left", showFocusedAsOver: true });
 
   }

     if (isc.TimeItem) {
        isc.TimeItem.addProperties({
            width: 220,
            height:22,
            hourItemProperties: {width:50},
            minuteItemProperties: {width:50},
            secondItemProperties: {width:50}
        });
    }
     
   if (isc.ToolStrip) {
     isc.ToolStrip.addProperties({
       defaultLayoutAlign: "center",
       height: 30,
     });

     isc.ToolStrip.changeDefaults("formWrapperDefaults", { cellPadding: 3 });
   }

   if (isc.ToolStripMenuButton) {
     isc.overwriteClass("ToolStripMenuButton", "MenuButton").addProperties({
       autoFit: true,
       baseStyle: "toolStripButton",
       height: 22,
       labelVPad: 0,
       showDown: true,
       showRollOver: true,
       showTitle: false,
     });
   }

   if (isc.ToolStripButton) {
     isc.overwriteClass("ToolStripButton", "Button").addProperties({
       autoFit: true,
       baseStyle: "toolStripButton",
       height: 22,
       labelVPad: 0,
       showTitle: false,
       showRollOver: true,
       showDown: true,
       title: null,
     });
   }

   if (isc.RichTextEditor) {
     isc.RichTextEditor.addProperties({
       showEdges: false,
       styleName: "richTextEditorBorder",
       toolbarBackgroundColor: "#b9b9b9",
     });
   }

   if (isc.EdgedCanvas) {
     isc.EdgedCanvas.addProperties({
       edgeSize: 3,
       edgeImage: "[SKINIMG]edges/edge.png",
     });
   }

   if (isc.Slider) {
     isc.Slider.addProperties({
       hThumbStyle: "hSliderThumb",
       hTrackStyle: "hSliderTrack",
       thumbConstructor: "StatefulCanvas",
       thumbThickWidth: 14,
       thumbThinWidth: 14,
       trackConstructor: "StatefulCanvas",
       trackWidth: 5,
       vThumbStyle: "vSliderThumb",
       vTrackStyle: "vSliderTrack",
     });
   }

   if (isc.TileGrid) {
     isc.TileGrid.addProperties({
       showEdges: false,
       styleName: null,
       valuesShowRollOver: true,
     });
   }

   if (isc.Calendar) {
     isc.Calendar.changeDefaults("datePickerButtonDefaults", {
       showDown: false,
       showOver: false,
       src: "[SKINIMG]/custom/buttons/calendar.png",
     });

     isc.Calendar.changeDefaults("controlsBarDefaults", {
       height: 10,
       layoutBottomMargin: 10,
     });

     isc.EventWindow.changeDefaults("resizerDefaults", {
       src: "[SKIN]/Window/v_resizer.png",
     });
     isc.TimelineWindow.changeDefaults("resizerDefaults", {
       src: "[SKIN]/Window/h_resizer.png",
     });
   }

   if (isc.Hover) {
     isc.addProperties(isc.Hover.hoverCanvasDefaults, {
       shadowDepth: 5,
       showShadow: false,
     });
   }

   //indicate type of media used for various icon types
   isc.pickerImgType = "png";
   isc.transferImgType = "png";
   isc.headerImgType = "png";

   // Properties specific to the Frameworks skin:
   if (isc.SectionStack) {
     isc.SectionStack.addProperties({
       headerHeight: 23,
       dashboardHeaderHeight: 30, //customer header height for Dashboard sections
       finderHeaderHeight: 30, //customer header height for Finder sections
     });
   }
   if (isc.TabSet) {
     isc.TabSet.addProperties({
       tabBarThickness: 29,
     });
   }
   if (isc.TabBar) {
     isc.TabBar.addProperties({
       baseLineConstructor: "Canvas",
       baseLineProperties: {
         backgroundColor: "#b9b9b9",
         overflow: "hidden",
         height: 1,
       },
       baseLineThickness: 1,
     });
   }
   if (isc.Window) {
     isc.Window.addProperties({
       layoutBottomMargin: 0,
       layoutLeftMargin: 0,
       layoutRightMargin: 0,
     });
   }
   if (isc.Window) {
     isc.Window.changeDefaults("headerDefaults", {
       layoutMargin: 1,
     });
   }
   if (isc.Dialog) {
     isc.Dialog.addProperties({
       layoutBottomMargin: 0,
       layoutLeftMargin: 0,
       layoutRightMargin: 0,
     });
   }

   isc.DateRangeDialog.addProperties({
     headerIconProperties: {
       src: "[SKINIMG]/custom/buttons/calendar.png",
     },
   });

   isc.MiniDateRangeItem.addProperties({
     pickerIconSrc: "[SKINIMG]/custom/buttons/calendar.png",
   });

   //Added FLUID customizations
   if (isc.IButton) {
     isc.IButton.addProperties({
       showFocused: true,
       showFocusAsOver: false,
       height: 22,
       fluidShowIcon: true /*FLUID added*/,
       fluidCRUDSaveStyle: "buttonPositiveAction" /*FLUID added*/,
       fluidCRUDFinishStyle: "buttonPositiveAction" /*FLUID added*/,
       fluidCRUDUseStyle: "buttonPositiveAction" /*FLUID added*/,
       fluidCRUDDeleteStyle: "buttonNegativeAction" /*FLUID added*/,
       fluidCRUDRemoveStyle: "buttonNegativeAction" /*FLUID added*/,
       fluidCRUDCloseStyle: "buttonNegativeAction" /*FLUID added*/,
       fluidCRUDCancelStyle: "buttonNegativeAction" /*FLUID added*/,
     });
   }

    //----------------------------------------
    // 14) Form controls
    //----------------------------------------
    if (isc.MultiComboBoxItem) {
      isc.MultiComboBoxItem.changeDefaults("buttonDefaults", {
        icon: "[SKIN]DynamicForm/drop.png",
        iconWidth: 12,
        iconHeight: 12,
        iconSize: 12,
      });
    }
    if (isc.TabBar) {
      isc.TabBar.addProperties({
        baseLineProperties: {
          backgroundColor: "transparent",
        },
      });
    }
    
    //----------------------------------------
    // 18) CubeGrid
    //----------------------------------------
    if (isc.CubeGrid) {
        isc.CubeGrid.addProperties({
            alternateFieldStyles:false,
            arrowIconSize:14
        });
        isc.CubeGrid.changeDefaults("rollOverCanvasDefaults", { styleName: "cubeSelectionOver" });
    }    
    
    // -------------------------------------------
    // 19) Printing
    // -------------------------------------------
    if (isc.PrintWindow) {
        isc.PrintWindow.changeDefaults("printButtonDefaults", {
            height: 27
        });
    }
    // -------------------------------------------
    // 20) SplitPane
    // -------------------------------------------
    if (isc.SplitPanePagedPanel) {
        isc.SplitPanePagedPanel.addProperties({
            skinUsesCSSTransitions: true
        });
    }
    if (isc.SplitPaneSidePanel) {
        isc.SplitPaneSidePanel.addProperties({
            skinUsesCSSTransitions: true
        });
    }
    if (isc.SplitPane) {
        isc.SplitPane.addProperties({
            desktopNavigationBarHeight: 35
        });
        isc.SplitPane.changeDefaults("backButtonDefaults", {
            icon: "[SKINIMG]custom/actions/hide-menu.png",
            iconWidth: 24,
            iconHeight: 24,
            iconSpacing: 7,
            showRTLIcon: true
        });
        if (isc.Browser.isIPhone || isc.Browser.isIPad) {
            isc.SplitPane.changeDefaults("backButtonDefaults", {
                icon: "[SKINIMG]custom/actions/hide-menu.png"
            });
        }

        isc.SplitPane.changeDefaults("detailTitleLabelDefaults", {
            baseStyle: "detailPaneTitle"
        });
        isc.SplitPane.changeDefaults("listTitleLabelDefaults", {
            baseStyle: "listPaneTitle"
        });
        isc.SplitPane.changeDefaults("navigationBarDefaults", {
            navBarHeaderStyleName: "navBarHeaderPaneTitle"
        });
    }

    // -------------------------------------------
    // 21) Drawing
    // -------------------------------------------
    if (isc.Gauge) {
        isc.Gauge.addProperties({
            fontSize: 11,
            needleColor: "#4e4e4e"
        });
        isc.Gauge.changeDefaults("valueLabelDefaults", {
            fontFamily: "Arial",
            fontWeight: "normal",
            lineColor: "#4e4e4e"
        });
    }
    
    // -------------------------------------------
    // 22) FacetChart
    // -------------------------------------------
    if (isc.FacetChart) {
        isc.FacetChart.addProperties({
            // General Chart changes
            padding: 0,       
            titleProperties: {
                fontFamily: "Arial",
                fontSize: 12,
                fontWeight: "bold",
                fontColor: "#616161"
            },
            titleBackgroundProperties: {
                lineWidth: 0,
                lineOpacity: 0,
                lineColor: "#cccccc",
                fillColor: "#f0f0f0"
            },
            titleAlign: "left",
            titlePadding: 10,
            drawTitleBackground: true,
            drawTitleBoundary: true,
            titleBoundaryProperties: {
                lineColor: "#cccccc",
                lineWidth: 1
            }, 
            titleRectHeight: 32, 
            legendAlign: "right",
            drawLegendBoundary: true,
            legendBoundaryProperties: {
                lineColor: "#cccccc",
                lineWidth: 1
            }, 
            legendRectProperties : {
                lineWidth:1,
                lineOpacity:0,
                lineColor: "#cccccc"
            },
            legendPadding:12,
            // Just replace the border with a white border to give the impression there isn't one
            legendSwatchProperties : {
                lineWidth:0,
                lineColor:"#FFFFFF"
            },
            showLegendRect:true,
            // embed the gradation labels spacing properly
            gradationLabelPadding:10,
            chartRectMargin: 15,
            // Change the Background Banding Color
            backgroundBandProperties : {
                excludeFromQuadTree:true,
                lineOpacity: 0,
                fillColor:"#f7f7f7"
            },
            gradationLineProperties: {
                excludeFromQuadTree: true,
                lineWidth: 1,
                lineColor: "#e4e4e4"
            },
            // Don't use color gradients, shadows or borders around the chart elements
            showShadows: false,
            useAutoGradients:false,
            barProperties: {
                lineColor: null, 
                lineWidth:1
            }, 
            // Pad the Y Axis Data Label 3px from the outer container border
            yAxisLabelPadding : 3,
            matchBarChartDataLineColor: true,
            brightenPercent: 50,
            brightenAllOnHover: true
        });
    }
    
    if (isc.FilterBuilder) {
        isc.FilterBuilder.addProperties({
            fieldPickerWidth:120,
            operatorPickerWidth:180
        });
        isc.FilterBuilder.changeDefaults("topOperatorFormDefaults", {
            width: 130
        });
    }
    
  //----------------------------------------
    // 25) NavigationBar
    //----------------------------------------
    if (isc.MiniNavControl) {
        isc.MiniNavControl.addProperties({
            src: isc.Browser.isIPhone ? "[SKIN]/miniNav.svg" : "[SKIN]/miniNav~2.png",
            showDisabled: true,
            upButtonSrc: null,
            downButtonSrc: null
        });
    }
    if (isc.NavigationBar) {
        
        isc.NavigationBar.addProperties({
            layoutMargin: 7,
            skinUsesCSSTransitions: true,
            leftButtonIcon: "[SKINIMG]custom/actions/hide-menu.png"
        });
        isc.NavigationBar.changeDefaults("leftButtonDefaults", {
            iconWidth: 24,
            iconHeight: 24,
            iconSpacing: 4,
            valign: 'absmiddle',
            showRTLIcon: true
        });
        isc.NavigationBar.changeDefaults("titleLabelDefaults", {
            margin: 0
        });

        if (isc.Browser.isIPhone || isc.Browser.isIPad) {
            isc.NavigationBar.addProperties({
                leftButtonIcon: "[SKINIMG]custom/actions/hide-menu.png"
            });
        }
    }
    if (isc.NavigationButton) {
        isc.NavigationButton.addProperties({
            height: 1,
            overflow: "visible",
            //padding: 5,
            showDown: true,
            showDownIcon: true,
            layoutAlign: "center"
        });
    }
    
    if (isc.Notify) {
    	var defaultNotifiactionSettings = {
    		multiMessageMode: "stack",
    		maxStackSize: 5,
    		stackDirection: "up",
    		stackSpacing:2,
    		position: "BR",
    		topOffset: -50,
    		leftOffset: -20,
    		appearMethod: "fade",
    		disappearMethod: "fade",
    		canDismiss: true,
    		autoFitWidth: true,
    		autoFitMaxWidth: "30%"		
    		};
        
    	isc.Notify.changeDefaults(defaultNotifiactionSettings);
    	isc.Notify.configureMessages("message", defaultNotifiactionSettings);
    	isc.Notify.configureMessages("warn", defaultNotifiactionSettings);
    	isc.Notify.configureMessages("error", defaultNotifiactionSettings);
    }
    
    theWindow.fluidCustomWidgetDefaults = {
		SplitButton: { 				// Standard "FormItem" attributes
			leftPosition: false, 		// Determines whether or not the optionsButton is on the left or right.
		    showTitle: false,
		    height: 1, width: 1, 		// Allows this container to automatically stretch to the inner components sizes. 
		    //style: "splitButtonGroup" // Style that applies to the hLayout container of the components
		    primaryButton: {			// Standard IButton attributes, "name" will become button's ID
		        textAlign: "center",
		        height: 22
		        //baseStyle: "splitButtonLeft" 	// Default style
		    },
		    optionsButton: { 			// Standard "IconMenuButton" attributes
		    	showMenuOnClick: true,
		        showButtonTitle: false,
		        showMenuIconOver: false,
		        menuAlign: "right",
		        //showMenuBelow: false,
		        //"menuAnimationEffect": "slide",	// NOTE, animations assume showMenuBelow:true
		        menuIconSrc: "[SKIN]/custom/buttons/splitbutton.png",
                height: 22, width: 40,
		        //baseStyle: "splitButtonRight"	// Default style
		    },
		    optionsMenu: { 				// Standard "Menu" attributes
	            autoDraw: false,
	            showShadow: true,
	            shadowDepth: 10
	        }/*,
	        optionsMenuItems: [ 		// Standard "MenuItem" attributes, "name" will become button's ID 
	            {
	                name: "btnFoo1",
	                title: "Document",
	                keyTitle: "Ctrl+D",
	                icon: ""
	            },
	            {
	                name: "btnFoo2",
	                title: "Picture",
	                keyTitle: "Ctrl+P",
	                icon: ""
	            },
	            {
	                name: "btnFoo3",
	                title: "Email",
	                keyTitle: "Ctrl+E",
	                icon: ""
	            }
	        ]*/
		}
	}
    
    // if CSS is loaded or being loaded, call FontLoader with same @font-face fonts from CSS
    if (cssLoaded != null) isc.FontLoader.loadCustomFonts([
        "InterVar"
    ], cssLoaded);
    
    isc.Class.modifyFrameworkDone();
  } // end with()
}; // end loadSkin()

isc.loadSkin();

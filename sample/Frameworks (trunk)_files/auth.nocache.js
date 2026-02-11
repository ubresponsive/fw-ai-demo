let auth0Client = null;
let auth0Config = null;
let authParams = null;
//let authIdToken = null;

function getCookie(cname) {
   let name = cname + "=";
   let ca = document.cookie.split(';');
   for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
         c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
      }
   }
   return "";
}

/**
 * Starts the authentication flow
 */
async function auth0Login() {
   try {
      const options = { authorizationParams: authParams };
      await auth0Client.loginWithRedirect(options).then().catch((e) => {
         console.log("Log in failed", e);
         document.getElementById("loadingErrMsg").innerHTML = "Log in failed: " + e;
      });
   } catch (err) {
      console.log("Log in failed", err);
   }
}

/**
 * Executes the logout flow
 */
async function auth0Logout() {
   try {
      //console.log("Logging out");
      navigator.serviceWorker.controller.postMessage({
         action: "logout",
         scope: auth0Config.swscope
      });
      //federated: true,
      await auth0Client.logout({
         logoutParams: {
            returnTo: auth0Config.logout_uri
         }
      });
   } catch (err) {
      console.log("Log out failed", err);
      window.location.replace(auth0Config.logout_uri);
   }
}

/**
 * Initialise the Auth0 client
 */
const configureClient = async () => {
   /**
   const resp_props = await fetch("auth_config.nocache.properties");
    var resp_props_data = await resp_props.text();

    try {
       // convert .properties file into json object
       var formattedData = resp_props_data
         //replace any \ escape characters with blank
         .replaceAll("\\", "")
         // split the data by line
         .split("\n")
         //removes empty lines
         .filter(Boolean) 
         // Remove commented lines:
         .filter((line) => /(\#|\!)/.test(line.replace(/\s/g, "").slice(0, 1)) ? false : line)
         // split each row into key and property
         .map(row => row.split("="))
         // use reduce to assign key-value pairs to a new object
         // using Array.prototype.reduce
         .reduce((acc, [key, value]) => (acc[key] = value, acc), {});
       
       auth0Config = formattedData;
    } catch (err) {
        console.log("Error converting properties file:", err);
    }
    */

   // Retrieves the auth configuration from the server
   resp = await fetch("fluid/FluidAppServerProxy/appConstants/auth_config.nocache.json");
   auth0Config = await resp.json();
   
   authParams = { redirect_uri: auth0Config.callback_uri,
                  audience: auth0Config.audience,
                  scope: "openid email profile offline_access"
                };
   
   if (auth0Config.organization_id) {
      authParams.organization = auth0Config.organization_id;
   }
   
   const searchParams = new URLSearchParams(window.location.search);
   
   let fcid = getCookie("FCID");
   if (searchParams.has("connection")) {
      authParams.connection = searchParams.get("connection");
   } else if (auth0Config.connection_name) {
      authParams.connection = auth0Config.connection_name;
   } else if (fcid != "") {
      authParams.connection = fcid;
   } else if (auth0Config.connection_list) {
      let connlist = auth0Config.connection_list.split(",");
      authParams.connection = connlist[0]; 
   }
   
   // Allow an override on the URL for support staff
   if (searchParams.has("support") && auth0Config.support_connection_name) {
      authParams.connection = auth0Config.support_connection_name;
   }
   
   //remove params we don't want to pass to Fluid UI with the redirect
   if (searchParams.has("support")) {
      searchParams.delete("support");
   }
   if (searchParams.has("connection")) {
      searchParams.delete("connection");
   }
   if (searchParams.has("code")) {
      searchParams.delete("code");
   }
   if (searchParams.has("state")) {
      searchParams.delete("state");
   }
   
   const newUrl = new URL(auth0Config.callback_uri);
   searchParams.forEach((value, key) => {
      newUrl.searchParams.append(key,value)
   });
   authParams.redirect_uri = newUrl.toString();

   //first entry of the path i.e. the PAS webapp name
   auth0Config.swscope = newUrl.pathname.split("/", 2)[1];

   //cacheLocation: 'localstorage' - instead of memory cache.  This means isAuthenticated() returns true if refreshing page or opening a new tab
   auth0Client = await auth0.createAuth0Client({
      domain: auth0Config.domain,
      clientId: auth0Config.client_id,
      useRefreshTokens: true
   });
};

async function getTokensAndStart() {
   try {
      const options = {
         detailedResponse: true,
         authorizationParams: authParams
      };

      const tokenResponse = await auth0Client.getTokenSilently(options);
      const idTokenClaims = await auth0Client.getIdTokenClaims();
      console.log(`Inspect Access token: https://jwt.io/?access_token=${tokenResponse.access_token}`);
      console.log(`Inspect ID token: https://jwt.io/?access_token=${tokenResponse.id_token}`);
      startServiceWorker(tokenResponse.access_token, tokenResponse.id_token, idTokenClaims.exp, idTokenClaims);
   } catch (err) {
      console.log("getTokensAndStart", err);
   }
}

async function refreshTokens() {
   try {
      //cacheMode: "off",
      const options = {
         detailedResponse: true,
         authorizationParams: authParams
      };

      const tokenResponse = await auth0Client.getTokenSilently(options);
      const idTokenClaims = await auth0Client.getIdTokenClaims();
      console.log(`Inspect refreshed Access token: https://jwt.io/?access_token=${tokenResponse.access_token}`);
      console.log(`Inspect refreshed ID token: https://jwt.io/?access_token=${tokenResponse.id_token}`);
      storeRefreshTokens(tokenResponse.access_token, tokenResponse.id_token, idTokenClaims.exp);
   } catch (err) {
      console.log("refreshTokens", err);
      storeRefreshTokens(null, null, 0);
   }
}

/**
 * Invoked from GWT
 */
function bootstrapAuth() {
   configureClient().then(() => {
      auth0Client.isAuthenticated().then(authenticated => {
         if (authenticated) {
            window.history.replaceState({}, "", authParams.redirect_uri);
            getTokensAndStart();
         } else {
            const query = window.location.search;
            const searchParams = new URLSearchParams(query);
            const shouldParseResult = searchParams.has("code") && searchParams.has("state");
            const isError = searchParams.has("error");

            if (isError) {
               console.log("Error returned from redirect");
               console.log(searchParams.get("error") + ":" + searchParams.get("error_description"));
               document.getElementById("loadingErrMsg").innerHTML = searchParams.get("error") + ":" + searchParams.get("error_description");
            } else if (shouldParseResult) {
               try {
                  auth0Client.handleRedirectCallback().then(() => {
                     getTokensAndStart();
                  }).catch((e) => {
                     console.log("Error in handleRedirectCallback:", e);
                  });
               } catch (err) {
                  console.log("Error parsing redirect:", err);
               }
               window.history.replaceState({}, "", authParams.redirect_uri);
            } else {
               auth0Login();
            }
         }
      });
   });
}

function startServiceWorker(access_token, id_token, expires_at, user) {
   if ("serviceWorker" in navigator) {

      navigator.serviceWorker
         .register("sw.nocache.js")
         .then(function(registration) {
            var serviceWorker;
            if (registration.installing) {
               serviceWorker = registration.installing;
               console.log("Service Worker is Installing");
            } else if (registration.waiting) {
               serviceWorker = registration.waiting;
               console.log("Service Worker is Waiting");
            } else if (registration.active) {
               serviceWorker = registration.active;
               console.log("Service Worker is Active");
               startApp(access_token, id_token, expires_at, user);
            }

            if (serviceWorker) {
               serviceWorker.addEventListener('statechange', function(e) {
                  console.log("Service Worker State: " + e.target.state);
                  if (e.target.state == "activated") {
                     startApp(access_token, id_token, expires_at, user);
                  }
               });

               //            navigator.serviceWorker.onmessage = function (event) {
               //               //console.log("Message from the Service Worker: " + event);
               //                if (event.data && event.data.action === "TOKEN_REQUEST" && event.ports && event.ports.length >= 1) {
               //                   if (authIdToken && auth0Config.url_auth_match) {
               //                      event.ports[0].postMessage({idToken: authIdToken, urlMatchArray: auth0Config.url_auth_match.split(",")});
               //                   } else {
               //                      event.ports[0].postMessage({error: "no token yet"});
               //                   }
               //                      
               //                  }
               //            };

            } else {
               document.getElementById("loadingErrMsg").innerHTML = "No Service Worker found";
               console.log("No Service Worker found");
            }
         })
         .catch(function(error) {
            document.getElementById("loadingErrMsg").innerHTML = "Service Worker registration failed";
            console.log("Service Worker registration failed", error);
         });
   } else {
      document.getElementById("loadingErrMsg").innerHTML = "Service Worker not supported in this browser";
      console.log("Service Worker not supported in this browser");
   }
}

function startApp(access_token, id_token, expires_at, user) {
   updateSwToken(id_token, expires_at);
   // call GWT method to start the Fluid session
   startFluidSession(access_token, id_token, expires_at, user);
}

function storeRefreshTokens(access_token, id_token, expires_at) {
   updateSwToken(id_token, expires_at);
   // call GWT method to update the Fluid session tokens
   updateFluidToken(access_token, id_token, expires_at);
}

function updateSwToken(id_token, expires_at) {
   //   authIdToken = id_token;
   navigator.serviceWorker.controller.postMessage({
      action: "login",
      authCode: { token: id_token, expires: expires_at, urlMatchArray: auth0Config.url_auth_match.split(",") },
      scope: auth0Config.swscope
   });
}

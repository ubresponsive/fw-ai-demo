var skin = isc.getParams().skin;
if (skin == null) {
	skin = fluidSkin;
	if (skin == null) {
		if (localStorage.getItem("frameworksFluidSkinOld")){
			skin = localStorage.getItem("frameworksFluidSkinOld");
		} else {
			skin = "Frameworks7";
		}
	}
}

if (skin == "Frameworks") {
  document.write(
    '<script language="javascript" src="' + isomorphicDir + 'skins/Frameworks/load_skin_2404180955.js"></script>'
  );
} else if (skin == "FrameworksDMSi") {
  document.write(
    '<script language="javascript" src="' + isomorphicDir + 'skins/FrameworksDMSi/load_skin.js?fld_version=2506261143"></script>'
  );
} else if (skin == "Mobile") {
  document.write(
    '<script language="javascript" src="' + isomorphicDir + 'skins/Mobile/load_skin.js?fld_version=2310161448"></script>'
  );
} else if (skin == "Tablet") {
  document.write(
    '<script language="javascript" src="' + isomorphicDir + 'skins/Tablet/load_skin.js?fld_version=2310161448"></script>'
  );
} else if (skin == "Agility") {
  document.write(
    '<script language="javascript" src="' + isomorphicDir + 'skins/Agility/load_skin.js?fld_version=2506261143"></script>'
  );
} else {
  document.write(
    '<script language="javascript" src="' + isomorphicDir + 'skins/Frameworks7/load_skin.js?fld_version=2506261143"></script>'
  );
}

if (skin == "Mobile"  || skin == "Tablet") {
  isc.Page.leaveScrollbarGap = false;
  var d = isc.getParams().fontIncrease;
  if (d == null) {
  	if (isc.Browser.isHandset) {
        d = 1;
     } else if (isc.Browser.isTablet) {
        d = 0;
     } else {
        d = 1;                  
     }                
  }
  d = parseInt(d);
  isc.Canvas.resizeFonts(d);
  var b = isc.getParams().sizeIncrease;
  if (b == null) {
     if (isc.Browser.isHandset) {
        b = 5;
     } else if (isc.Browser.isTablet) {
        b = 4;
     } else {
        b = 3;                  
     }
  }
  b = parseInt(b);
  isc.Canvas.resizeControls(b);
}

if (skin == "Frameworks7" || skin == "FrameworksDMSi" || skin == "Agility") {
  isc.Page.leaveScrollbarGap = false;
  var d = isc.getParams().fontIncrease;
  if (d == null) {
     if (isc.Browser.isHandset) {
        d = 1;
     } else if (isc.Browser.isTablet) {
        d = 1;
     } else {
        d = 0;                  
     }                
  }
  d = parseInt(d);
  isc.Canvas.resizeFonts(d);
  var b = isc.getParams().sizeIncrease;
  if (b == null) {
     if (isc.Browser.isHandset) {
        b = 5;
     } else if (isc.Browser.isTablet) {
        b = 4;
     } else {
        b = 0;                  
     }
  }
  b = parseInt(b);
  isc.Canvas.resizeControls(b);
}

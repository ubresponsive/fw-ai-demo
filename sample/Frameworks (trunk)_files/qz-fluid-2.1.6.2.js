
/**
 * QZ Tray Fluid UI Helper
 */
var qzf = {
	qzVersion: "",
    printerList: null,
	getAuthHeaders: function () {},
	isDeployed: false,
	isReady: false,
	startingQz: false,
	connectOptions: { retries: 0, delay: 0 },
	connectedCallback: function () {},
	qzPrintObject: {},
	launchQZ: function () {
	    if (!qz.websocket.isActive()) {
	    	console.log('QZ: Prompt user to launch QZ Tray');
	        window.location.assign("qz:launch");
	        console.log('QZ: Starting with retries:5, delay:5');
	        // Retry 5 times, pausing 5 second between each attempt
	        qzf.connectOptions.retries = 5;
	        qzf.connectOptions.delay = 5;
	        qzf.startConnection();
	        // reset retries and delay
	        qzf.connectOptions.retries = 0;
	        qzf.connectOptions.delay = 0;
	    } else {
	    	console.log('QZ: Already connected');
	    	qzf.isReady = true;
	    	if (!qzf.printerList) {
	    		qzf.findPrinters();
	    	}
	    }
	},
	promptToLaunchAnswer: function (value) {
		console.log('QZ: Launch QZ Tray: ' + value);
        qzf.startingQz = false;
        if (value == true) {
        	qzf.launchQZ();        	
        }
	},
	startConnection: function () {
	    if (!qz.websocket.isActive()) {
	    	if (!qzf.startingQz) {
	    		qzf.startingQz = true;
	    		console.log('QZ: Starting connection. waiting');
	    		console.log('QZ: Connection Config:');
	    		console.log(qzf.connectOptions);
	    		qz.websocket.connect(qzf.connectOptions).then(function() {
		           console.log('QZ: Connected');
		           qzf.startingQz = false;
		           qzf.isReady = true;
		           qzf.printerList = null;
	               qzf.findPrinters();
	               qz.api.getVersion().then(function(data) {
	            	   qzf.qzVersion = data;   
	               }); 
	               if(qz.api.isVersionLess(2, 1, 6)) {
	            	   isc.say("Please upgrade your QZ Tray to version 2.1.6 by opening 'My Printer Configuration' and downloading the new version");
	               }
		        }).catch(function(err) {
		        	console.log('QZ: Could not connect.  Is QZ Tray running?');
		            console.log(err);
		            if (err.message == 'Unable to establish connection with QZ') {
  		               isc.ask("Could not connect to the Local Print Service.  It might not be running.  Do you want to start the Local Print Service?", {target: qzf, methodName: "promptToLaunchAnswer"});	
		            }
		        });	
	    	} else {
	    		console.log('QZ: Waiting for connection');
	    	}
	    } else {
	    	console.log('QZ: Already connected');
	    	qzf.isReady = true;
	    	if (!qzf.printerList) {
	    		qzf.findPrinters();
	    	}
	    }
	},
	endConnection: function () {
       if (qz.websocket.isActive()) {
           qz.websocket.disconnect().then(function() {
        	   console.log('QZ: Disconnected');
           }).catch(qzf.handleConnectionError);
       } else {
    	   console.log('QZ: Not connected');
       }
    },
    findPrinters: function () {
	   qz.printers.find().then(function(data) {
		      var list = '';
		      for(var i = 0; i < data.length; i++) {
		    	  if (i == 0) {
		    		  list = data[i];
		    	  } else {
		    		  list += "," + data[i];	    		  
		    	  }
		      }
		      qzf.printerList = list;
		      console.log("QZ: Available printers:" + data);
		      qzf.connectedCallback();
		  }).catch(function (err) {
			  qzf.handleConnectionError(err);
		  });		   
	},
	handleConnectionError: function (err) {
		console.log('QZ: Socket Error:');
	    console.log(err);
	    isc.say("There was an error connecting to the Local Print Service:\n"+ err);
	},
	printData: function (printer, options, rawData) {
	   var config = qz.configs.create(printer, options);
	   var printData = [rawData];
	   qz.print(config, printData).then(function() {
          console.log("QZ: Data sent to printer:" + printer);
	   }).catch(qzf.handleConnectionError);
	},
	printToFile: function (rawData, filename) {
	   var config = qz.configs.create({ file: filename }); 
	   var printData = [rawData];
       qz.print(config, printData).then(function() {
            console.log("QZ: Data sent to printer:" + filename);
 	   }).catch(qzf.handleConnectionError);
	},
	printFileToFile: function (serverFile, clientFileName) {
	   var config = qz.configs.create({ file: clientFileName }); 
	   var printData = [
           { type: 'raw', format: 'file', data: serverFile }
       ];
	   qz.print(config, printData).then(function() {
            console.log("QZ: File saved as:" + clientFileName);
 	   }).catch(qzf.handleConnectionError);
	},
	printAFile: function (printer, options, serverFile) {
		var printData = [
            { type: 'raw', format: 'file', data: serverFile }
        ];
		var config = qz.configs.create(printer, options);
        qz.print(config, printData).then(function() {
            console.log("QZ: File sent to printer:" + printer);
 	   }).catch(qzf.handleConnectionError);
	},
	printAPDF: function (printer, options, serverFile) {
		var printData = [
            { type: 'pixel', format:'pdf', flavor: 'file', data: serverFile }
        ];
		var config = qz.configs.create(printer, options);
        qz.print(config, printData).then(function() {
            console.log("QZ: PDF sent to printer:" + printer);
 	   }).catch(qzf.handleConnectionError);
	}
    
}

qz.websocket.setErrorCallbacks(function(err) {
    console.log('QZ: Socket Error:');
    console.log(err);
//    isc.say("Connection to QZ Tray had an error:\n"+ err);
 });
 
qz.websocket.setClosedCallbacks(function(event) {
    qzf.isDeployed = false;
    qzf.isReady = false;
    qzf.printerList = null;
    qzf.connectedCallback();
    console.log('QZ: Socket Close:');
    console.log(event);
    isc.say("The connection to the Local Print Service was closed");
 });

qz.security.setCertificatePromise(function(resolve, reject) {
   $.ajax({
       method: 'POST',
       contentType: 'text/plain',
       url: 'fluid/FluidAppServerProxy?ipApi=qzGetCert',
       headers: qzf.getAuthHeaders()
   }).then(resolve, reject);
 });

qz.security.setSignaturePromise(function(toSign) {
    return function(resolve, reject) {
    	$.ajax({
            method: 'POST',
            contentType: 'text/plain',
            url: 'fluid/FluidAppServerProxy?ipApi=qzSign',
            headers: qzf.getAuthHeaders(),
            data: toSign
        }).then(resolve, reject);
    };
});

// Copyright (c) 2016 ajayt6. All rights reserved.
// Use of this source code is governed by a BSD-style license

var url =   "https://www.quickiohome.com:443";	//"http://quickiolb-1689429780.us-west-2.elb.amazonaws.com:80";	//"http://ec2-52-42-76-33.us-west-2.compute.amazonaws.com:3000";
var token = "";
var userEmailID = "";

function loadScript(callback)
{

	[
		'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core.js',
		'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js',
		'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/aes.js',
		'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.5.0/socket.io.js'

	].forEach(function(src) {
		var script = document.createElement('script');
		script.src = src;
		script.type = 'text/javascript';
		script.async = false;
		if(script.src.toString().includes("socket"))
		{
			//console.log("inside if");
			// Then bind the event to the callback function.
			// There are several events for cross browser compatibility.
			script.onreadystatechange = callback;
			script.onload = callback;
		}
		document.head.appendChild(script);
	});

}




function doInAllTabs(tabCallback) {
	chrome.tabs.query(
		{},
		function (tabArray) {
			tabCallback(tabArray);
		}
	);

}

function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}



var myPrettyCode = function() {

	//alert('Background page loaded');
	;
	
};

myPrettyCode();

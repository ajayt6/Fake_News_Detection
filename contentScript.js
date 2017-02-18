
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		
        if(request.method == "getText"){
			
			var response = {data: document.title, method: "getText"};
			sendResponse(response); //same as innerText
        }
    }
);
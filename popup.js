
var common_words="the, it is, we all, a, an, by, to, you, me, he, she, they, we, how, it, i, are, to, for, of, with, at"; 

function getUncommon(sentence, common) {
    var wordArr = sentence.match(/\w+/g),
        commonObj = {},
        uncommonArr = [],
		uncommonStr = "",
        word, i;

    common = common.split(',');
    for ( i = 0; i < common.length; i++ ) {
        commonObj[ common[i].trim() ] = true;
    }

    for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase();
        if ( !commonObj[word] ) {
            //uncommonArr.push(word);
			uncommonStr = uncommonStr + " " + word;
        }
    }

    //return uncommonArr;
	return uncommonStr;
}

function httpGetAsync(theUrl, callback)
{
	//alert("Going to call xhr request");
	var xmlHttp = new XMLHttpRequest();
	
	if( theUrl.includes("google.com") )
	{
		
		xmlHttp.onreadystatechange = function(theUrl) {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			{
			
				//alert(xmlHttp.responseText);
				//alert("The actual response obtained. First level");
				//console.log(xmlHttp.response);
				
				//Now call this function again if theURL is a google URL
				
				
				var finalURL = "http://www.snopes.com/trump-putin-switzerland/";
				httpGetAsync( finalURL, function() {
				alert("inside async of finalURL");
				});
			
			}
		}
	}
	else
	{
		xmlHttp.onreadystatechange = function(theUrl) {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			{	//alert(xmlHttp.responseText);
				//alert("The actual response obtained. Second level");
				console.log(xmlHttp.response);
				if( xmlHttp.response.includes("http://www.snopes.com/app/themes/snopes-theme/dist/images/det-red.gif") )
				{
					//Change html body accordingly
					document.body.innerHTML = "<img src='http://www.snopes.com/app/themes/snopes-theme/dist/images/det-red.gif' >"; //"False";
				}
				else if ( xmlHttp.response.includes("http://www.snopes.com/app/themes/snopes-theme/dist/images/det-green.gif") )
				{
					document.body.innerHTML = "True";
				}
				else
				{
					document.body.innerHTML = "Sorry. Truth check does not have sufficient info. You decide!";
				}
			}
		}
	}
	
	xmlHttp.open("GET", theUrl, true); // true for asynchronous
	xmlHttp.send(null);
}

chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
		if(response.method=="getText"){
            var title = response.data;
			var modTitle = getUncommon(title,common_words);
			var gURL = "https://www.google.com/search?q=" + "inurl:snopes.com" + modTitle;
			//alert("New url: " + gURL);
			httpGetAsync( gURL, function() {
			alert("inside async");
			});
			//"http://www.snopes.com/?s=donald+trump+wealth"
        }
    });
});

var myVar;

function myFunction() {
	myVar = setTimeout(showPage, 3000);
}

function showPage() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("myDiv").style.display = "block";
}

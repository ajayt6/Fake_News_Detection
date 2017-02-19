
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
				
				var responseDiv = document.createElement("div");
				responseDiv.innerHTML = xmlHttp.response; //HttpRequest.innerText
				responseDiv.style.display = 'none';

				var results = responseDiv.querySelectorAll('.r > a');
				console.log("RAHUL CLASS START");
				console.log(String(results[0].attributes.href));
				console.log("RAHUL CLASS END");
				
				//alert("The first URL: " + String(results[0]));//(results[0].attributes.href));
				
				var finalURL = String(results[0]);//"http://www.snopes.com/2017/02/18/scientists-discover-new-continent/" //"http://www.snopes.com/obama-deported-more-people/"; //"http://www.snopes.com/trump-putin-switzerland/";
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
					document.body.innerHTML = "<img style='width:210px;height:210px' src='http://www.snopes.com/app/themes/snopes-theme/dist/images/det-red.gif' >"; //"False";
				}
				else if ( xmlHttp.response.includes("http://www.snopes.com/app/themes/snopes-theme/dist/images/det-green.gif") )
				{
					document.body.innerHTML = "<img height='210' width='210' src='http://www.snopes.com/app/themes/snopes-theme/dist/images/det-green.gif' >"; //"True";
				}
				else
				{
					document.body.innerHTML = "<img height='210' width='210' src='http://worldartsme.com/images/unsure-clipart-1.jpg' >"//"Sorry. Truth check does not have sufficient info. You decide!";
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

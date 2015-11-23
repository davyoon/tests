// var xmlHttp = createXmlHttpRequestObject();

// function createXmlHttpRequestObject(){
// 	var xmlHttp;

// 	if(window.xmlHttpRequest){
// 		xmlHttp = new xmlHttpRequest();
// 	}
// 	// }else{
// 	// 	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
// 	// }
// 	return xmlHttp;
// }

// function process(){
// 	if(xmlHttp){
// 		try{
// 			xmlHttp.open("GET", "stuff.txt", true);
// 			xmlHttp.onreadystatechange = handleServerResponse;
// 			xmlHttp.send(null); 
// 		}catch(e){
// 			alert(e.toString())
// 		}
// 	}
// }


// function handleServerResponse(){
// 	theD = document.getElementById('theD');
// 	if(xmlHttp.readyState===1){
// 		theD.innerHTML += "Status 1";
// 	}else if(xmlHttp.readyState===2){
// 		theD.innerHTML += "Status 2";
// 	}else if(xmlHttp.readyState===3){
// 		theD.innerHTML += "Status 3";
// 	}else if(xmlHttp.readyState===4){
// 		if(xmlHttp.status===200){
// 			try{
// 				text = xmlHttp.responseText;
// 				theD.innerHTML += "sttus 4: ready to go";
// 				theD.innerHtml += text;
// 			}catch(e){
// 				alert(e.toString());
// 			}
// 		}else{
// 			alert(xmlHttp.statusText)
// 		}
// 	}
// }



// $(document).ready(function(){




// alert("hello")
$(".butt").on("click", printMovies);

function printMovies(){
	$.get("http://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1")
		.done(function(data){
			var output ="";
			data.Episodes.forEach(function(item){
				output +="<h4>" + item.Title + "</h4><br>"
			});
			document.getElementById("theD").innerHTML = output;
		});
}

function blah(){
	console.log("hello")
}



































// })


























var request = new XMLHttpRequest();
request.open('GET', 'data.txt');
request.onreadystatechange = function() {
	if( request.readyState == 200) && (request.status == 200) {
		document.writeln(request.responseText);
	}
}
request.send();
	



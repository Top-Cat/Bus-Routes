function getXMLHttpRequestObject() {
	var XMLHttpRequestObject = false;
	if (window.XMLHttpRequest) {
		XMLHttpRequestObject = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (!XMLHttpRequestObject) {
		alert("Your browser does not support Ajax.");
		return false;
	}
	return XMLHttpRequestObject;
}

var reqs = Array();
var w = 0;

function do_req(url, func) {
	w++;
	reqs[w] = getXMLHttpRequestObject();
	if (reqs[w]) {
		if (reqs[w].readyState == 4 || reqs[w].readyState == 0) {
			reqs[w].open("GET", url, true);
			reqs[w].t = func;
			reqs[w].onreadystatechange = function() { if (this.readyState == 4) { if (this.status == 200) { this.t(this.responseText); } } };
			reqs[w].send(null);
		}
	}
}

function startrequest() {
	$("s").animate({opacity: 0}, 500, "easeInOutQuad");
	button.style.display = 'none';
	ajLoader.style.display = 'inline-block';
	do_req("request.php?reg=" + txtField.value, response);
}

function response(r) {
	ajLoader.style.display = 'none';
	button.style.display = 'inline-block';
	$("s").animate({opacity: 1}, 500, "easeInOutQuad");
	$("div").animate({height: 160, marginTop: -95}, 1000, "easeInOutQuad", function() {
			separator.style.display = 'block';
			if (r.length > 0) {
				rText.innerHTML = 'Currently on route <a target="_blank" href="http://www.tfl.gov.uk/tfl/gettingaround/maps/buses/?q=' + r + '">#' + r + '</a>';
			} else {
				rText.innerHTML = 'Couldn\'t find that vehicle :/';
			}
		});
}

document.addEventListener("DOMContentLoaded", function() {
	txtField = document.getElementsByTagName('input')[0];
	button = document.getElementsByTagName('button')[0];
	ajLoader = document.getElementsByTagName('strong')[0];
	separator = document.getElementsByTagName('hr')[0];
	rText = document.getElementsByTagName('s')[0];

	button.addEventListener("click", function() { startrequest(); }, false);
	txtField.addEventListener("keydown", function(e) { if(e.keyCode == 13) { startrequest(); } }, false);
}, false);
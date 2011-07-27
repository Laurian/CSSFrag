/*
 * Returns the element's DOM position amongst its children as an integer.
 */
function nthIndex(element) {

	var nodes = element.parentNode.childNodes, node;
	var i = 0;
	var count = 1;

	while((node = nodes.item(i++)) && (node != element)) {
		if (node.nodeType == 1) count++;
	}

	return count;
}

/*
 * Returns true if the ID has only one corresponding element (as *should* always be the case).
 */
function singleElementWithID(id) {

	var element = document.getElementById(id);
	var elements = [];

	while(element) {
		elements.push(element);
		//element.id = id + "_CSSFrag";
		element = document.getElementById(id);
	}

	for(var i = 0; i < elements.length; i++) {
		elements[i].id = id;
	}
	return (elements.length == 1);
}

self.on("click", function (node, data) {
	
	//window.settings = safari.self.tab.canLoad(event, 'getSettings'); // Why look! It's another hack!
			var eventTarget = node;//document.getElementsByClassName("CSSFragTarget")[0];
			eventTarget.className = eventTarget.className;//.replace(/ CSSFragTarget/g, "");

			var href = window.location.href.split("#")[0].toLowerCase();
			var url = "";
			
			var currentNode = eventTarget;
			var selector = "";
			var selectorBuilt = false;

			do {
				var nodeName = currentNode.nodeName.toLowerCase()
				if (nodeName === 'body' || nodeName === 'head' || nodeName === 'html' || nodeName === '#document') { break; }

				if (!selectorBuilt) {
					var newSelector = nodeName;
					if (currentNode.getAttribute('id') !== null && currentNode.getAttribute('id') !== '' && singleElementWithID(currentNode.getAttribute('id'))) { newSelector += "#" + currentNode.getAttribute('id'); }
					if (currentNode.getAttribute('class') !== null && currentNode.getAttribute('class') !== '') { newSelector += "." + currentNode.getAttribute('class'); }

					var index = nthIndex(currentNode);
					if (index > 1) { newSelector += ":nth-child(" + index + ")"; }

					selector = newSelector + ">" + selector;
					if (document.querySelectorAll(selector.substring(0, selector.length - 1)).length == 1) { selectorBuilt = true; }
				}
			} while (currentNode = currentNode.parentNode);
			
			//if (singleElementWithID(eventTarget.id)) {
				//if (settings.preferStandardHashes) { URL = href + "#" + eventTarget.id + ""; }
				//else { 
			//		url = href + "#css(%23" + eventTarget.id + ")"; 
				//}
			//} else { 
				url = href + "#css(" + encodeURIComponent(selector.substring(0, selector.length - 1)) + ")";
			//}

			//showURLinWindow(URL);
			
	self.postMessage(url);
});

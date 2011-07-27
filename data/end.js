/*
 * HELPER FUNCTIONS
 * from https://github.com/karanlyons/CSSFrag/blob/master/CSSFrag.safariextension/end.js
 */

/*
 * Returns the x and y coordinates of the closest positioned element as integers.
 */
function offsetXY(elem) {
    var x = y = 0;
	if (elem.offsetParent)
	{
		do {
			x += elem.offsetLeft;
			y += elem.offsetTop;
		} while (elem = elem.offsetParent);
	};
	return {'x':x,'y':y};
};




/*
 * Returns a Hexadecimal, RGB, or RGBA color as an RGBA dictionary. If the color cannot be parsed, returns false.
 */
function colorToRGBADictionary(color) {

	if (color.substring(0, 1) === '#') {
		color = color.replace('#', '');
		if (color.length === 3) {
			var rgb = color.replace('#', '').match(/(.{1})/g);
			rgb[0] += rgb[0];
			rgb[1] += rgb[1];
			rgb[2] += rgb[2];
		}
		else if (color.length === 6) { var rgb = color.replace('#', '').match(/(.{2})/g); }
		else { return false; }
		var i = 3;
		while (i--) { rgb[i] = parseInt(rgb[i], 16); }
		return {'r': rgb[0], 'g': rgb[1], 'b': rgb[2], 'a': 1};
	}
	else if (color.substring(0, 3) === 'rgb') {
		var rgba = color.match(/([^a-z\(\), ]+)/g);
		if (rgba.length <= 3) { return false; } // This check isn't perfect (it should freak out over stuff like rgba(0,a,1,1)), but it's good enough.
		return {'r': rgba[0], 'g': rgba[1], 'b': rgba[2], 'a': (rgba[3] || 1)};
	}
	else { return false; }

}

/*
 * Fades the background color of an element from yellow to the endColor, finally replacing it with the endAttribute. Basically, it's the YFT.
 */
function highlightBackground(element, startColor, duration) {
	var steps = duration / 50;
	var currentFloatColor = JSON.parse(JSON.stringify(startColor)); // More hacks. This time we're serializing and deserializing an object to get a copy instead of a reference.
	var endColor = colorToRGBADictionary(element.style.backgroundColor);
	if (!endColor) {
		endColor = JSON.parse(JSON.stringify(startColor));
		endColor.a = 0;
	}
	var endAttribute = element.style.backgroundColor; // We reset to the original attirbute at the end of the fade just in case we became a little off from parseInt.
	var stepCount = 0;

			element.style.backgroundColor = "rgba(" + parseInt(currentFloatColor.r) + "," + parseInt(currentFloatColor.g) + "," + parseInt(currentFloatColor.b) + "," + currentFloatColor.a + ")";

	var timer = setInterval(function() {
		currentFloatColor.r = currentFloatColor.r - ((currentFloatColor.r - endColor.r) / (steps - stepCount));
		currentFloatColor.g = currentFloatColor.g - ((currentFloatColor.g - endColor.g) / (steps - stepCount));
		currentFloatColor.b = currentFloatColor.b - ((currentFloatColor.b - endColor.b) / (steps - stepCount));
		currentFloatColor.a = currentFloatColor.a - ((currentFloatColor.a - endColor.a) / (steps - stepCount));

		element.style.backgroundColor = "rgba(" + parseInt(currentFloatColor.r) + "," + parseInt(currentFloatColor.g) + "," + parseInt(currentFloatColor.b) + "," + currentFloatColor.a + ")";

		stepCount++;

		if (stepCount >= steps) {
			element.style.backgroundColor = endAttribute; 
			clearInterval(timer);
		}
	}, 50);
}


/*
 * Given a selector and whether it is a frag hash, finds the element in the document and scrolls and focuses on it. If the user wants it, we also highlight the element.
 */
function scrollFocusAndHighlight(selector, isFragHash) {
	var element = document.querySelector(selector);
	if (element === null) { return false; }
	var offset = offsetXY(element);

	window.scrollTo(offset.x, offset.y);
	element.focus();
	//if (settings.highlightTarget !== 'none' && (settings.highlightTarget === 'all' || (isFragHash && settings.highlightTarget === 'frag'))) {
	//	highlightBackground(element, (colorToRGBADictionary(settings.highlightColor) || {'r': 255, 'g': 255, 'b': 156, 'a': 1}), 2000);
		highlightBackground(element, {'r': 255, 'g': 255, 'b': 156, 'a': 1}, 2000);
	//}
}


// TODO context menu

function handleLoadAndHashChange() {
	// TODO
	//window.settings = safari.self.tab.canLoad(event, 'getSettings'); // Why look! It's another hack!
	var CSSFragHash = decodeURIComponent(window.location.hash).match(/css\((.+)\)/);
	if (CSSFragHash) { 
		scrollFocusAndHighlight(CSSFragHash[1], true); 
	} /*else if (settings.highlightTarget === 'all' && window.location.hash !== '') { 
		scrollFocusAndHighlight(window.location.hash, false); 
	}*/
}

// DOM Ready
//window.addEventListener('load', handleLoadAndHashChange, false); 
window.addEventListener('hashchange', handleLoadAndHashChange, false);

handleLoadAndHashChange();



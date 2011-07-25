function offsetXY(elem)
{
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

// this page-mod runs at DOM ready
//window.addEventListener('load', function()
//{
//}, false);

function hashCss() {
	var m;
	if (m = decodeURIComponent(window.location.hash).match(/css\((.+)\)/))
	{
		var selector = m[1];
		var elem = document.querySelector(selector);
		var offset = offsetXY(elem);
		window.scrollTo(offset.x, offset.y);
		elem.focus();
	};
}

// run now (DOM Ready)
hashCss();

window.addEventListener("hashchange", hashCss, false);


window.onhashchange 

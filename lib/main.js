const data = require("self").data;

var pageMod = require("page-mod").PageMod({
  include: ['*'],
  contentScriptWhen: 'ready',
  contentScriptFile: data.url('end.js')
});

//const tabBrowser = require("tab-browser");

var item = require("context-menu").Item({
  label: "Generate Fragment Link (TODO)",
  contentScriptFile: data.url('menu.js'),
  onMessage: function (message) {
    console.log(message);
	//tabBrowser.activeTab.linkedBrowser.contentWindow.wrappedJSObject.console.log(message);
  }
});
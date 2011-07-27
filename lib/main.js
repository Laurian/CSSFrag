const data = require("self").data;
const tabs = require("tabs");

var workers = new Array();

function detachWorker(worker, workerArray) {
  var index = workerArray.indexOf(worker);
  if(index != -1) {
    workerArray.splice(index, 1);
  }
}

var pageMod = require("page-mod").PageMod({
  include: ['*'],
  contentScriptWhen: 'ready',
  contentScriptFile: data.url('end.js'),
  onAttach: function onAttach(worker) {
    workers.push(worker);
	worker.on('detach', function () {
	      detachWorker(this, workers);
	});
  }
});

//const tabBrowser = require("tab-browser");

var item = require("context-menu").Item({
  label: "Generate Fragment Link",
  contentScriptFile: data.url('menu.js'),
  onMessage: function (url) {
    // console.log(message);
    // 	tabBrowser.activeTab.linkedBrowser.contentWindow.wrappedJSObject.console.log(message);
	for (worker in workers) {
		if (workers[worker].tab == tabs.activeTab) {
			workers[worker].postMessage(url);
		}
	}
	
  }
});
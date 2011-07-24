const data = require("self").data;

var pageMod = require("page-mod").PageMod({
  include: ['*'],
  contentScriptWhen: 'ready',
  contentScriptFile: data.url('end.js')
});

var swfobject = require('swfobject');
var flashDetect = require('flash-detect');

require('jquery-cookie');


var page = EXAPP.namespace('EXAPP.pages.page2.head.fun');

EXAPP.pages.page2.init = function() {
    console.log('page2');
    console.log(swfobject);
    console.log(flashDetect.installed);
    $.cookie('user2323','kingarthas');
};

 
module.exports = page;
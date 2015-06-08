
var swfobject = require('swfobject');
var flashDetect = require('flash-detect');

require('jquery-cookie');


module.exports = function() {
    console.log('page21223');
    console.log(swfobject);
    console.log(flashDetect.installed);
    $.cookie('user2323','kingarthas');
};
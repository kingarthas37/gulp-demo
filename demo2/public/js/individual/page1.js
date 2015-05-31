var swfobject = require('swfobject');
var flashDetect = require('flash-detect');

require('jcarousel');
require('jquery-cookie');
require('jquery-validate');

console.log('page123456');

module.exports = {
    
    init:function() {

        console.log(swfobject);

        console.log('page1234');
        console.log(swfobject);
        console.log(flashDetect.installed);
        
        $.cookie('user2323','kingarthas');

        $("#commentForm").validate();

        $('.jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
        
    }
    
    
};
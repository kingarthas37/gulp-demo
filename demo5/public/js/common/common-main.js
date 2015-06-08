(function($,window) {


    window.EXAPP = window.EXAPP || {};
    window.EXAPP.namespace = function(ns_string) {
        var parts = ns_string.split('.'),
            parent = window.EXAPP,i;
        if(parts[0]==='EXAPP') {
            parts = parts.slice(1);
        }
        for(i=0;i<parts.length;i++) {
            if(typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    }
    
    
})(jQuery,window);
$.when(
    include("progressive/config.js"),
    include("progressive/fullscreen.js"),
    include("progressive/notify.js"),
    include("progressive/init.js"),

    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
);
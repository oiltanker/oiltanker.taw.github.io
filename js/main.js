function getJsPath() {
    const scripts = document.getElementsByTagName("script");
    for(let i = 0; i < scripts.length; i++) {
        let pos = scripts[i].src.indexOf("main.js");
        if (pos != -1) {
            return scripts[i].src.substring(0, pos);
        }
    }
}
const jsPath = getJsPath();

function include(scriptFile) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: jsPath + scriptFile,
            success: () => resolve(),
            fail: () => reject(),
            dataType: "script",
            cache: true
        });
    });
}

var compoundLoad = null;
$.when(
    include("base.js"),
    include("progressive.js"),

    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(() => {
    compoundLoad = () => {
        base_onLoad();
        progressive_onLoad();
    };
});

function onLoad() {
    var scriptWait = setInterval(() => {
        if(compoundLoad) {
            clearInterval(scriptWait);
            compoundLoad();
        }
    }, 100);
}
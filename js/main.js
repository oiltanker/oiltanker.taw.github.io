function include(scriptFile) {
    var script = document.createElement('script');
    script.setAttribute("type","text/javascript");
    script.setAttribute("src", "js/" + scriptFile);
    document.getElementsByTagName("head")[0].appendChild(script);
}

include("base.js");
include("progressive.js")

function onLoad() {
    base_onLoad();
    progressive_onLoad();
}
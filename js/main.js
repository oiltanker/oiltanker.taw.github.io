function getJsPath() {
    const scripts = document.getElementsByTagName("script");
    for(let i = 0; i < scripts.length; i++) {
        let pos = scripts[i].src.indexOf("main.js");
        if (pos != -1) {
            return scripts[i].src.substring(0, pos);
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const jsPath = getJsPath();

function include(scriptFile) {
    $.getScript(jsPath + scriptFile).done((script, textStatus) => {
    }).fail((jqxhr, settings, exception) => {
        console.log("Failed loading '" + scriptFile + "' script.");
    });
}

include("main/types.js")
include("main/globals.js")
include("main/favorite.js")
include("main/parse.js")
include("main/display.js")
include("main/init.js")

include("progressive.js")
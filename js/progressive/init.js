var fsButtonState = false;
function progressive_onLoad() {
    let prFunc = {"fullscreen":null, "notify":null, "vibrate":null};
    if (prConfig.useFullscreen) prFunc.fullscreen = new Fullscreen();
    if (prConfig.useNotifications) prFunc.notify = new Notify();
    
    if(prFunc.fullscreen) {
        fsBtn = document.createElement("button");
        fsBtn.setAttribute("id", "fullscrren_button");
        $(fsBtn).append("<img id='fs_img' height='0' width='0' src='img/fullscreen.png'/>");
        document.body.appendChild(fsBtn);
    
        prFunc.fullscreen.addOnFullscreenHandler(started => {
            fsButtonState = started;

            document.getElementById("fs_img")
                .setAttribute(  "src", started ? "img/exit_fullscreen.png" : "img/fullscreen.png");
        });
        fsBtn.addEventListener("click", () => {
            if (!fsButtonState) prFunc.fullscreen.goFullscreen();
            else prFunc.fullscreen.exitFullScreen();
        });
    } 
    
    if(prFunc.notify) {
        FavoriteEvent.addHandler((type, action, entry) => {
            navigator.vibrate(200);
            prFunc.notify.notify(
                "Entry '" + entry.name + "' is now "
                + (action == FavAction.add ? "added to" : "removed from")
                + " your favorites."
            );
        });
    }
}
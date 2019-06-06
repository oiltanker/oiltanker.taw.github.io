class Fullscreen {
    constructor() {
        this.fullscreenHandlers = [];
        if ('requestFullscreen' in document.documentElement) {
            this.prefix = 'fullscreen';
            this.goFsFunc = 'requestFullscreen';
            this.exitFsFunc = 'exitFullscreen';
        } else if ('mozRequestFullScreen' in document.documentElement) {
            this.prefix = 'mozFullScreen';
            this.goFsFunc = 'mozRequestFullScreen';
            this.exitFsFunc = 'mozCancelFullScreen';
        } else if ('webkitRequestFullscreen' in document.documentElement) {
            this.prefix = 'webkitFullscreen';
            this.goFsFunc = 'webkitRequestFullscreen';
            this.exitFsFunc = 'webkitExitFullscreen';
        } else if ('msRequestFullscreen') {
            this.prefix = 'msFullscreen';
            this.goFsFunc = 'msRequestFullscreen';
            this.exitFsFunc = 'msExitFullscreen';
        }

        if (document[this.prefix + 'Enabled']) {
            this.fsEnabled = true;
            console.log("Fullscreen is supported.");

            this.onFullscreenChange = () => {
                var fsElem;
                if (document[this.prefix + 'Element']) fsElem = document[this.prefix + 'Element'];
                else fsElem = null;

                for(let i = 0; i < this.fullscreenHandlers.length; i++) {
                    this.fullscreenHandlers[i](fsElem != null);
                }
            }

            document.addEventListener(this.prefix.toLowerCase() + 'change', this.onFullscreenChange);
        } else {
            this.fsEnabled = false;
            console.log("Fullscreen is NOT supported.");
        }
    }

    addOnFullscreenHandler(handler) {
        this.fullscreenHandlers.push(handler);
    }
    removeOnFullscreenHandler(handler) {
        let pos = this.fullscreenHandlers.indexOf(handler);
        if (pos != -1) this.fullscreenHandlers.splice(pos, 1);
    }

    goFullscreen(element) {
        if (!this.fsEnabled) return;
        if(!element) element = document.documentElement;

        var maybePromise = element[this.goFsFunc]();
        if (maybePromise && maybePromise.catch) {
            maybePromise.catch(function (err) {
                console.log('Cannot acquire fullscreen mode: ' + err);
            });
        }
    }
    exitFullScreen() {
        if (!this.fsEnabled) return;

        document[this.exitFsFunc]();
    }
}
class Notify {
    constructor() {
        if(!('Notification' in window)) {
            console.log("Notifications are NOT supported.");
            this.enabled = false;
            return;
        } else  {
            this.enabled = true;
        }

        Notification.requestPermission(result => {
            if (result == "granted") {
                this.enabled = true;
            }
            else {
                this.enabled = false;
                console.log("Notifications are NOT enabled.");
            }
        });
    }

    notify(msg) {
        if (!this.enabled) return false;

        try {
            var notification = new Notification(msg);
            return !!notification;
        } catch (err) {
            console.log('Notification API error: ' + err);
        }
    }

    notifyPersist(msg, callback) {
        if (!this.enabled || !('ServiceWorkerRegistration' in window)) callback(false);

        try {
            navigator.serviceWorker.getRegistration()
                .then(reg => {
                    reg.showNotification(msg);
                    callback(true);
                })
                .catch(err => {
                    alert('Service Worker registration error: ' + err);
                    callback(false);
                });
        } catch (err) {
            alert('Notification API error: ' + err);
            callback(false);
        }
    }
}
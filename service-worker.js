const CACHE_NAME = "AOE2GameQuerry_cache";

const FILES_TO_CACHE = [
    "css/main.css",
    "css/normalize.css",

	"img/aoe2-logo.png",
    "img/aoe2-long_notitle.png",
    "img/exit_fullscreen.png",
    "img/fullscreen.png",

	"favicon/icon_194.png",
	"favicon/icon_96.png",
	"favicon/icon_32.png",
	"favicon/icon_16.png",
    "icon.png",

    "manifest.json",

    "js/vendor/jquery-3.3.1.min.js",
	"js/vendor/modernizr-3.7.1.min.js",
    "js/register.js",
    "js/plugins.js",
    "js/main.js",
    "js/base.js",
    "js/progressive.js",

    "js/base/display.js",
    "js/base/favorite.js",
    "js/base/globals.js",
    "js/base/init.js",
    "js/base/parse.js",
    "js/base/types.js",

    "js/progressive/config.js",
    "js/progressive/fullscreen.js",
    "js/progressive/init.js",
    "js/progressive/notify.js"
];

const PAGES_TO_CACHE = [
    "index.html",
    "civilizations.html",
	"structures.html",
	"technologies.html",
	"units.html"
];

self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (!cacheWhitelist.includes(key)) {
                    return caches.delete(key);
                }
            }))
        })
    );
});

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                fetch("manifest.json")
                    .then((response) => {
                        response.json()
                    })
                    .then((assets) => {
                        cache.addAll(FILES_TO_CACHE);
                        cache.addAll(PAGES_TO_CACHE);
                    });
            })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

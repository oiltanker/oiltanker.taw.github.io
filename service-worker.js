const CACHE_NAME = "AOE2GameQuerry_cache";

const FILES_TO_CACHE = [
    "css/main.css",
    "css/normalize.css",
    "js/vendor/jquery-3.3.1.min.js",
	"js/vendor/modernizr-3.7.1.min.js",
	//"js/main.js",
	"js/plugins.js",
	"img/aoe2-logo.png",
	"img/aoe2-long_notitle.png",
	"favicon/icon_194.png",
	"favicon/icon_96.png",
	"favicon/icon_32.png",
	"favicon/icon_16.png",
	"404.html",
	"icon.png",
	"service-worker.js",
	"site.webmanifest",
	"browserconfig.xml"
];

const PAGES_TO_CACHE = [
    "index.html",
    "pages/civilizations.html",
	"pages/structures.html",
	"pages/technologies.html",
	"pages/units.html"
];

self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(caches.keys()
        .then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (!cacheWhitelist.includes(key)) {
                    return caches.delete(key);
                }
            }))
        })
    );
});

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                fetch("manifest.json")
                    .then(function (response) {
                        response.json()
                    })
                    .then(function (assets) {
                        cache.addAll(FILES_TO_CACHE);
                        cache.addAll(PAGES_TO_CACHE);
                    });
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

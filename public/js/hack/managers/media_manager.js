/*global define */
define([
    'hack/views/map',
    'hack/views/image',
], function (Map) {

    var MediaManager = function(config) {
        this.config = config;
        this.view = null;
    };

    MediaManager.prototype.setPage = function(chapter, page) {
        this.chapter = chapter;
        this.page = page;

        if (this.page.map) {
            this.setMap(this.page.map);
        }
    };

    MediaManager.prototype.setMap = function(options) {
        if (!this.map) {
            this.map = new Map('map', options);
        } else {
            this.map.setCenter(options.center, options.zoom);
        }
    };

    return MediaManager;
});

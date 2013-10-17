/*global define */
define([
    'hack/views/map',
    'hack/views/image',
    'hack/views/article',
    'hack/views/timeline',
],
    function (MapView, ImageView, ArticleView, TimelineView) {
        "use strict";
        return {
            MapView: MapView,
            ImageView: ImageView,
            ArticleView: ArticleView,
            TimelineView: TimelineView
        };
    }
);
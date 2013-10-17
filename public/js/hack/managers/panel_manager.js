/*global define */
define(['backbone', 'underscore'], function (Backbone, _) {

    var PanelManager = function() {

        var panels = [];

        /**
         * Add panel to manager
         */
        var add = function(panel) {
            panels.push(panel);
        };

        /**
         * Show the content
         *
         */
        var showContent = function(chapter) {
            var panel = _.last(panels);
            panel.setCurrentChapter(chapter);
            panel.render();
        };

        /**
         * Hide the content
         *
         */
        var hideContent = function() {
            var panel = _.last(panels);
            panel.setCurrentChapter(null);
            panel.render();
        };

        var start = function() {
            _.first(panels).render();
        };

        Backbone.on('panel:chapter-selected', showContent);
        Backbone.on('panel:chapter-unselected', hideContent);

        return {
            add: add,
            start: start
        };
    };
    return PanelManager;
});
/*global require */
require.config({
    paths: {
        jquery: '/lib/jquery/jquery',
        app: 'hack/app',
        underscore: '/lib/underscore/underscore',
        backbone: '/lib/backbone/backbone'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: 'jQuery'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'hack/app': {
            exports: 'Hack'
        }
    }
});

require([
    'jquery',
    'backbone',
    'hack/app',
], function($, Backbone, Hack) {

    $(function() {

        var mediaManager;

        $.ajax({
            url: 'data/stories/arab_spring.json',
            success: function(config) {
                init(config);
            },
            error: function() {
                console.log('Error loading config.');
            }
        });

        function init(config) {

            mediaManager = new Hack.MediaManager(config);
            mediaManager.setPage(config.storyline.chapters[0], config.storyline.chapters[0].pages[0]);

            var chapterPanel = new Hack.ChapterPanel({
                el: '#chapter-panel',
                title: 'Arab Spring',
                chapters: [{
                    title: 'Title A'
                }, {
                    title: 'Title B'
                }]
            });
            var contentPanel = new Hack.ContentPanel({
                el: '#content-panel'
            });
            var panelMgr = new Hack.PanelManager();
            panelMgr.add(chapterPanel);
            panelMgr.add(contentPanel);
            panelMgr.start();

        };

    });

});

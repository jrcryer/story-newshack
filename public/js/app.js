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
        })

        function init(config) {

            mediaManager = new Hack.MediaManager(config);
            mediaManager.setPage(config.storyline.chapters[0], config.storyline.chapters[0].pages[0]);

            new Hack.ChapterPanel({
                el: '#panels',
                title: 'Arab Spring',
                chapters: [{
                    title: 'Title A'
                }, {
                    title: 'Title B'
                }]
            }).render();

        };
    });
    // var panelMgr = new Hack.PanelManager();
    // panelMgr.add();
    //panelMgr.add(new Hack.ContentPanel());

});

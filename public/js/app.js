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

    var chapterPanel = new Hack.ChapterPanel({
        el: '#chapter-panel',
        title: 'Key Events',
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

});

/*global require */
require.config({
  paths: {
    jquery: '/lib/jquery/jquery',
    app: 'hack/app',
    underscore: '/lib/underscore/underscore',
    backbone: '/lib/backbone/backbone',
    moment: '/lib/moment/moment'
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
      url: 'data/stories/' +storyId +'.json',
      success: function(config) {
        init(config);
      },
      error: function() {
        console.log('Error loading config.');
      }
    });

    function init(config) {

      mediaManager = new Hack.MediaManager(config);

      var chapterPanel = new Hack.ChapterPanel({
        el: '#chapter-panel',
        storyline: config.storyline
      });
      var contentPanel = new Hack.ContentPanel({
        el: '#content-panel'
      });
      var panelMgr = new Hack.PanelManager();
      panelMgr.add(chapterPanel);
      panelMgr.add(contentPanel);
      panelMgr.start();

      window.mm = mediaManager;
    }
  });

});

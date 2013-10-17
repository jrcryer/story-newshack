/*global define */
define([
  'backbone',
  'hack/views/map',
  'hack/views/intro',
  'hack/views/profile'
], function(Backbone, Map, Intro, Profile) {

  var MediaManager = function(config) {
    this.config = config;
    this.view = null;

    Backbone.on('story:page-change', $.proxy(this.setPage, this));

    if (this.config.storyline.map) {
      this.config.storyline.map.offsetForIntro = true;
      this.setMap(this.config.storyline.map);
    }

    if (this.config.storyline.map && this.config.storyline.map.kml) {
      this.map.setKmlUrl(this.config.storyline.map.kml);
    }
    if (this.config.storyline.showIntro) {
        this.setIntro(this.config.storyline);
    }
  };


  MediaManager.prototype.setPage = function(chapter, page) {

    this.chapter = chapter;
    this.page = page;

    if (this.page.map) {
      if (this.page.showIntro) {
        this.page.map.offsetForIntro = true;
      }
      this.setMap(this.page.map);
    }

    if (this.chapter.map && this.chapter.map.kml) {
      this.map.setKmlUrl(this.chapter.map.kml);
    } else {
      this.map.clearKml();
    }

    if (this.map && this.page.map && this.page.map.features) {
      this.map.addFeatures(this.page.map.features);
    }

    if (page.person) {
      if (this._profilePanel) {
        this._profilePanel.remove();
      }
      this._profilePanel = new Profile(page.person);
    } else if (this.hasOwnProperty('_profilePanel')) {
      this._profilePanel.remove();
    }
    if (page.showIntro) {
      this.setIntro(page);
    } else if (this.intro) {
      this.intro.remove();
    }
  };


  MediaManager.prototype.setMap = function(options) {
    if (!this.map) {
      this.map = new Map('map', options);
    } else {
      this.map.moveTo(options.center, options.zoom, options.offsetForIntro);
    }
  };

  MediaManager.prototype.setIntro = function(page) {
    this.intro = new Intro({
      el: '#intro-container',
      page: page
    }).render();
  };

  return MediaManager;
});

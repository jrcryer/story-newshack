/*global define */
define([
  'backbone',
  'hack/views/map',
  'hack/views/intro',
  'hack/views/timeline',
  'hack/views/profile',
  'hack/views/quote'
], function(Backbone, Map, Intro, Timeline, Profile, Quote) {

  var MediaManager = function(config) {
    this.config = config;
    this.view = null;

    Backbone.on('story:page-change', $.proxy(this.setPage, this));
    //Backbone.on('map:ready', $.proxy(this.mapReady, this));

    if (this.config.storyline.map) {
      this.config.storyline.map.offsetForIntro = true;
      this.setMap(this.config.storyline.map);
    }

    if (this.config.storyline.map && this.config.storyline.map.kml) {
      this.map.setKmlUrl(this.config.storyline.map.kml);
    }
    if (this.config.storyline.showIntro) {
        this.setIntro(this.config.storyline);
        this.setTimeline(this.config.storyline);
    }
  };


  MediaManager.prototype.setPage = function(chapter, page) {
    var that = this;
    this.chapter = chapter;
    this.page = page;

    if (this.page.image) {
      this.displayImage();
    } else if (this._imageLayer) {
      this._imageLayer.remove();
    }

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

    if (true === page.showIntro) {
      this.setIntro(page);
      this.setTimeline(page);
    } else if (this.intro) {
      this.intro.$el.find('#intro').fadeOut();
      $('#timeline-container').fadeOut();
      this.intro = undefined;
      this.timeline = undefined;
    }

    if (page.quote) {
      this.setQuote(page.quote, page.showIntro);
    } else if (this.quote) {
      this.quote.remove();
      this.quote = undefined;
    }
  };

  /**
   * Display image background in place of a map
   */
  MediaManager.prototype.displayImage = function() {

    var html;

    this.removeImage(); // remove any other images

    html = '<div class="image-bg"></div>';
    this._imageLayer = $(html);
    this._imageLayer.css({
      'background-image': 'url(' + this.page.image + ')'
    });
    this._imageLayer.hide();
    $('#map').before(this._imageLayer);
    this._imageLayer.fadeIn(400);
  };

  /**
   * Remove the image background
   */
  MediaManager.prototype.removeImage = function() {
    if (this._imageLayer) {
      this._imageLayer.fadeOut(400, function(){
        $(this).remove();
      });
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
    });
    this.intro.render();
  };

  MediaManager.prototype.setQuote = function(quote, withTimeline) {
    this.quote = new Quote(quote, withTimeline);
  };

  MediaManager.prototype.setTimeline = function(page) {
    $('#timeline-container').show();
    this.timeline = new Timeline({
      el: '#timeline-container',
      page: page
    });
    this.timeline.render();
  };

  return MediaManager;
});

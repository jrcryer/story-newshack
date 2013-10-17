/*global define, ol */
define(['jquery-1'], function($) {

  /**
   * Create a mew instance of a map
   *
   * @param {String} elementId the dom element id
   * @param {Object} options
   * @constructor
   */
  function Map(elementId, options) {

    // the map options
    this._options = $.extend(true, {
      center: [-0.12755, 51.507222], // Longitude, Latitude
      zoom: 6
    }, options);

    this._view = new ol.View2D({
      center: ol.proj.transform(this._options.center, 'EPSG:4326', 'EPSG:3857'),
      zoom: this._options.zoom
    });

    this._baseLayer = new ol.Layer.Tile({
      preload: 4,
      source: new ol.source.OSM()
    });

    this._olMap = new ol.Map({
      view: this._view,
      target: elementId,
      layers: [this._baseLayer]
    });
  }

  /**
   * Move to a destination on the map.
   *
   * @param {Array<lng,lat>} position
   * @param {Number} zoom
   * @param {String} transition
   */
  Map.prototype.moveTo = function(position, zoom, transition) {

    var pan;

    pan = ol.animation.pan({
      duration: 2000,
      source: this._view.getCenter()
    });

    this._olMap.beforeRender(pan);
    this._view.setCenter(ol.proj.transform(position, 'EPSG:4326', 'EPSG:3857'));
  };

  return Map;

});

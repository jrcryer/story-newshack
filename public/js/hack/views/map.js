/*global define, ol */
define(['jquery', 'backbone'], function($, Backbone) {

  /**
   * Create a mew instance of a map
   *
   * @param {String} elementId the dom element id
   * @param {Object} options
   * @constructor
   */
  function Map(elementId, options) {

    var that = this;

    // the map options
    this._options = $.extend(true, {
      center: [-0.12755, 51.507222], // Longitude, Latitude
      zoom: 6
    }, options);

    this._options.center = this.modifyPositionForPanels(this._options.center, this._options.zoom);
    if (this._options.offsetForIntro) {
      this._options.center = this.modifyPositionForIntro(this._options.center, this._options.zoom);
    }

    this._view = new ol.View2D({
      center: ol.proj.transform(this._options.center, 'EPSG:4326', 'EPSG:3857'),
      zoom: this._options.zoom
    });

    this._baseLayer = new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.BingMaps({
        key: 'AgEuoaDhjUTNeWIh9upgBkRXD6rVHJiPO-E3sFvNbkR79qNwtftafmpqNfjV-o-8',
        style: 'AerialWithLabels'
      })
    });

    this._olMap = new ol.Map({
      view: this._view,
      target: elementId,
      layers: [this._baseLayer],
      renderer: ol.RendererHint.CANVAS,
      controls: []
    });

    this.isWaitingForMoveEnd = true;
    this._olMap.on('moveend', function() {
      if (that.isWaitingForMoveEnd) {
        that.isWaitingForMoveEnd = false;
        Backbone.trigger('map:ready');
      }
    });
  }

  /**
   * Remove all the feature from the map
   */
  Map.prototype.removeFeatures = function() {
    if (this.hasOwnProperty('_featureLayer')) {
      this._olMap.removeLayer(this._featureLayer);
    }
  };

  /**
   * Add a new feature to the map.
   *
   * @param {Array} features
   */
  Map.prototype.addFeatures = function(features) {

    var style, data;

    this.removeFeatures(); // clear all features before adding any

    style = new ol.style.Style({
      symbolizers: [
        new ol.style.Icon({
          url: '/images/map_marker.png',
          offset: -22
        })
      ]
    });

    data = {
      type: 'FeatureCollection',
      features: []
    };

    $(features).each(function(i, feature) {
      data.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: feature.position
        }
      });
    });

    this._featureLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        parser: new ol.parser.GeoJSON(),
        data: data
      }),
      style: style
    });

    this._olMap.addLayer(this._featureLayer);
  };

  Map.prototype.modifyPositionForIntro = function(position, zoom) {
    var offset = 0;
    if (zoom > 10) {
      offset = 0;
    } else if (zoom > 8) {
      offset = 0.1;
    } else if (zoom > 6) {
      offset = 0.5;
    } else {
      offset = 2;
    }
    return [position[0], position[1] + offset];
  };

  Map.prototype.modifyPositionForPanels = function(position, zoom) {
    var offset = 0;
    if (zoom > 10) {
      offset = 0.00085;
    } else if (zoom > 8) {
      offset = 0.6;
    } else if (zoom > 6) {
      offset = 3;
    } else {
      offset = 4;
    }
    return [position[0] + offset, position[1]];
  };


  /**
   * Clear kml layer
   *
   * @param {String} url
   */
  Map.prototype.clearKml = function() {
    if (this._vectorLayer) {
      this._olMap.removeLayer(this._vectorLayer);
      this._vectorLayerUrl = undefined;
    }
  };

  /**
   * Add kml layer
   *
   * @param {String} url
   */
  Map.prototype.setKmlUrl = function(url) {

    if (this._vectorLayer) {
      if (this._vectorLayerUrl === url) {
        return;
      } else {
        this.clearKml();
      }
    }

    this._vectorLayerUrl = url;
    this._vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        parser: new ol.parser.KML(),
        url: url
      }),
      style: new ol.style.Style({rules: [
        new ol.style.Rule({
          symbolizers: [
            new ol.style.Fill({
              color: 'white',
              opacity: 0
            }),
            new ol.style.Stroke({
              color: '#29ABE2',
              opacity: 1,
              width: 4
            })
          ]
        })
      ]})
    });

    this._olMap.addLayer(this._vectorLayer);
  };

  /**
   * Move to a destination on the map.
   *
   * @param {Array<lng,lat>} position
   * @param {Number} zoom
   * @param {String} transition
   */
  Map.prototype.moveTo = function(position, zoom, offsetForIntro) {

    var duration, start, viewZoom, panAnimation, zoomAnimation, bounceMultiplier;

    this.isWaitingForMoveEnd = true;

    position = this.modifyPositionForPanels(position, zoom);
    if (offsetForIntro) {
      position = this.modifyPositionForIntro(position, zoom);
    }

    viewZoom = this._view.getResolution();
    duration = 2000;
    start = +new Date();
    bounceMultiplier = 2;

    panAnimation = ol.animation.pan({
      duration: duration,
      start: start,
      source: this._view.getCenter()
    });

    if (zoom === viewZoom) {
      this._olMap.beforeRender(panAnimation);
    } else {
      zoomAnimation = ol.animation.zoom({
        duration: duration,
        start: start,
        resolution: viewZoom
      });
      this._olMap.beforeRender(panAnimation, zoomAnimation);
      this._view.setZoom(zoom);
    }

    this._view.setCenter(ol.proj.transform(position, 'EPSG:4326', 'EPSG:3857'));
  };

  return Map;

});

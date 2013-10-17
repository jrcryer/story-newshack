/*global define, ol */
define(['jquery'], function($) {

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

    this._options.center = this.modifyPositionForScreen(this._options.center, this._options.zoom);

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
      renderer: ol.RendererHint.CANVAS
    });

  };

  Map.prototype.modifyPositionForScreen = function(position, zoom) {
    offset = 1 * (12 - zoom);
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
        }),
        new ol.style.Rule({
          maxResolution: 5000,
          symbolizers: [
            new ol.style.Text({
              color: 'black',
              text: ol.expr.parse('name'),
              fontFamily: 'Calibri,sans-serif',
              fontSize: 12,
              stroke: new ol.style.Stroke({
                color: 'white',
                width: 3
              })
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
  Map.prototype.moveTo = function(position, zoom, transition) {

    var duration, start, viewZoom, panAnimation, zoomAnimation, bounceMultiplier;

    position = this.modifyPositionForScreen(position, zoom);

    viewZoom = this._view.getResolution();
    duration = 2000;
    start = +new Date();
    bounceMultiplier = 2;

    panAnimation = ol.animation.pan({
      duration: duration,
      start: start,
      source: this._view.getCenter(),
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

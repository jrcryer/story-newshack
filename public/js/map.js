/*global ol */
(function(){

  // THIS FILE IS JUST FOR /map ROUTE TO PLAY/DEBUG OL3 STUFF
  var map = new ol.Map({
    target: 'test_map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        preload: 4
      })
    ],
    view: new ol.View2D({
      center: ol.proj.transform([-0.12755, 51.507222], 'EPSG:4326', 'EPSG:3857'),
      zoom: 6
    }),
    renderers: ol.RendererHints.createFromQueryData()
  });

}());

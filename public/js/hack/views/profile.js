define(['jquery'], function($){

  /**
   * Creates a new widget in the top left of the page to show additional,
   * complimentary content in relation to the page.
   *
   * @param {Object} meta
   * @constructor
   */
  function MetaView(meta) {

    var html;

    html = '<div class="page-meta">';
    html += '<h4>Key Figures</h4>';
    html += '<img src="' + meta.url + '" width="' + meta.width + '" />';
    html += '</div>';

    console.log(html);
  }

  return MetaView;
});

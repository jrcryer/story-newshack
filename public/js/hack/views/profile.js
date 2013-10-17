define(['jquery'], function($){

  /**
   * Creates a new widget in the top left of the page to show additional,
   * complimentary content in relation to the page.
   *
   * @param {Object} person
   * @constructor
   */
  function ProfileView(person) {

    var html;

    html = '<div class="page-meta">';
    html += '<h4>Key Figures</h4>';
    html += '<img src="' + person.image.url + '" width="' + person.image.width + '" />';
    html += '<h5>' + person.name + '</h5>';
    html += '<p>' + person.summary + '</p>';
    html += '</div>';

    this.$html = $(html);
    this.$html.css('width', person.image.width);

    $('body').append(this.$html);
  }

  /**
   * Remove the panel
   */
  ProfileView.prototype.remove = function() {
    this.$html.remove();
  };

  return ProfileView;
});

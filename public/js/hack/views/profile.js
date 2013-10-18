define(['jquery', 'moment'], function($, moment){

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
    if (undefined !== person.born) {
      html += '<p class="date">Born: ' + moment(person.born).format('Do MMM YYYY') + '</p>';
    }
    if (undefined !== person.died) {
      html += '<p class="date">Died: ' + moment(person.died).format('Do MMM YYYY') + '</p>';
    }
    html += '<p>' + person.summary + '</p>';
    html += '</div>';

    this.$html = $(html);
    this.$html.css('width', person.image.width);
    var self = this;

    $('body').append(this.$html);
    setTimeout(function() {
        self.$html.addClass('visible');
    }, 500);
  }

  /**
   * Remove the panel
   */
  ProfileView.prototype.remove = function() {
    var self = this;
    this.$html.removeClass('visible');

    setTimeout(function() {
        self.$html.remove();
    }, 500);
  };

  return ProfileView;
});

define(['jquery'], function($){

  function Quote(quote, offsetForTimeline) {

    var html;

    var cssClass = 'quote';
    if (true === offsetForTimeline) {
      cssClass += ' quote-with-timeline';
    }

    html  = '<div class="' +cssClass +'">';
    html += '<p class="quote-marks">&#8220;</p>';
    html += '<p class="text">' + quote.quote + '</p>';
    html += '<p class="attribution">' + quote.attribution + '</p>';
    html += '</div>';

    this.$html = $(html);
    //this.$html.hide();

    $('.quote').remove();
    $('body').append(this.$html);

    $('.quote').css('opacity', 1);
  }

  Quote.prototype.remove = function() {
    $('.quote').css('opacity', 0);
  };

  return Quote;
});

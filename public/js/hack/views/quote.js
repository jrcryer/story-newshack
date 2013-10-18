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

    $('body').append(this.$html);
  }

  Quote.prototype.remove = function() {
    $('.quote').css('opacity', 0);
    //this.$html.fadeOut(400, function(){
    //  $(this).remove();
    //});
  };

  return Quote;
});

define(['jquery'], function($){

  function Quote(quote) {

    var html;

    html  = '<div class="quote">';
    html += '<p class="quote-marks">&#8220;</p>';
    html += '<p class="text">' + quote.quote + '</p>';
    html += '<p class="attribution">' + quote.attribution + '</p>';
    html += '</div>';

    this.$html = $(html);
    this.$html.hide();

    $('body').append(this.$html);
    this.$html.fadeIn(400);
  }

  Quote.prototype.remove = function() {
    this.$html.fadeOut(400, function(){
      $(this).remove();
    });
  };

  return Quote;
});

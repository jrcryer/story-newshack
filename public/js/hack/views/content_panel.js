/*global define */
define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {

    var ContentPanel = Backbone.View.extend({

        chapter: null,

        /**
         * @var string
         */
        template: _.template(
          '<ol id="pages">' +
          '<% _.each(pages, function(pages, index) { %>' +
            '<li>' +
              '<div class="index"><%= index + 1 %></div>' +
            '</li>' +
          '<% }); %>' +
          '</ol>'
        ),

        events: {
          'click li': 'onChapterClick'
        },

        /**
         * @var array
         */
        chapters: [],

        render: function() {
            this.$el.html('');

            if (this.chapter === null) {
                return;
            }
            this.$el.html(this.template({
                pages: this.pages
            }));
        },

        setCurrentChapter: function(chapter) {
            this.chapter = chapter;
            console.log(chapter);
        }
    });
    return ContentPanel;
});
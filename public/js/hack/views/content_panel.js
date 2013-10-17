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

        /**
         * Initialize and setup event listening
         *
         */
        initialize: function() {
            Backbone.on('panel:update_stories', this.updatePages, this);
        },

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
        }
    });
    return ContentPanel;
});
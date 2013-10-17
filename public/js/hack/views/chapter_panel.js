/*global define */
define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {

    var ChapterPanel = Backbone.View.extend({

        title: '',

        /**
         * @var string
         */
        template: _.template(
          '<h1><%= title %></h1>' +
          '<ol id="chapters">' +
          '<% _.each(chapters, function(chapter, index) { %>' +
            '<li>' +
              '<div class="index"><%= index + 1 %></div>' +
              '<div class="title"><%= chapter.title %></div>' +
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
        initialize: function(options) {

            this.title = options.title;
            this.chapters = options.chapters;
        },

        render: function() {
            this.$el.html('');

            this.$el.html(this.template({
                title: this.title,
                chapters: this.chapters
            }));
        },

        onChapterClick: function(e) {
          e.preventDefault();
        }
    });
    return ChapterPanel;
});
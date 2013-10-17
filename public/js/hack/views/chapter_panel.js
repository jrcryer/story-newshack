/*global define */
define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {

    var ChapterPanel = Backbone.View.extend({

        /**
         * @var string
         */
        title: '',

        /**
         * @var string
         */
        template: _.template(
          '<h1><%= title %></h1>' +
          '<ol id="chapters">' +
          '<% _.each(chapters, function(chapter, index) { %>' +
            '<li data-index="<%= index %>">' +
              '<div class="index"><%= index + 1 %></div>' +
              '<div class="title"><%= chapter.title %></div>' +
            '</li>' +
          '<% }); %>' +
          '</ol>'
        ),

        /**
         * Event handlers
         */
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
            this.title = 'Key Events';
            this.chapters = options.storyline.chapters;
        },

        /**
         * Render the chapter panel
         *
         */
        render: function() {
            this.$el.html('');

            this.$el.html(this.template({
                title: this.title,
                chapters: this.chapters
            }));
        },

        /**
         * Handles a click event on a particular chapter
         */
        onChapterClick: function(e) {
            var chapter = this.chapters[$(e.currentTarget).data().index];
            Backbone.trigger('panel:chapter-selected', chapter);
            e.preventDefault();
        }
    });
    return ChapterPanel;
});
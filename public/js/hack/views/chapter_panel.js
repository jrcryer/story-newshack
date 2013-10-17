/*global define */
define(['backbone', 'underscore'], function (Backbone, _) {

    var ChapterPanel = Backbone.View.extend({

        /**
         * @var string
         */
        title: '',

        /**
         * @var string
         */
        template: _.template(
          '<% months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]; %>' +
          '<h1><%= title %></h1>' +
          '<ol id="chapters">' +
          '<% _.each(chapters, function(chapter, index) { %>' +
            '<% index = (index + 1) > 9 ? index + 1 : "0" + (index + 1); %>'+
            '<% start = new Date(chapter.beginDate); %>'+
            '<% end = new Date(chapter.endDate); %>'+
            '<li data-index="<%= index %>">' +
              '<div class="index"><span><%= index %></span></div>' +
              '<div class="title">' +
                '<%= chapter.title %>' +
                '<span class="start-date"><%= start.getDay() + " " + months[start.getMonth()] + " " + start.getFullYear() %></span>' +
                '<span class="end-date"><%= end.getDay() + " " + months[end.getMonth()] + " " + end.getFullYear() %></span>' +
              '</div>' +
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
            var el      = this.$el.find(e.currentTarget);
            var chapter = this.chapters[el.data().index];

            this.$el.find('.current').removeClass('current');
            el.addClass('current');


            Backbone.trigger('story:page-change', chapter, chapter.pages[0]);
            e.preventDefault();
        }
    });
    return ChapterPanel;
});
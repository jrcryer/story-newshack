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
          '<% months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; %>' +
          '<div class="pi"><h1><%= title %></h1>' +
          '<ol id="chapters">' +
          '<% _.each(chapters, function(chapter, index) { %>' +
            '<li data-index="<%= index %>">' +
                '<% index = (index + 1) > 9 ? index + 1 : "0" + (index + 1); %>'+
                '<% start = new Date(chapter.beginDate); %>'+
                '<% end = new Date(chapter.endDate); %>'+
              '<div class="index">' +
                '<div class="inner"><%= index %></div>' +
              '</div>' +
              '<div class="title">' +
                '<div class="inner">' +
                  '<div class="chapter-title"><%= chapter.title %></div>' +
                  '<div class="start-date"><%= start.getDay() + " " + months[start.getMonth()] + " " + start.getFullYear() %></div>' +
                  '<div class="end-date"><%= end.getDay() + " " + months[end.getMonth()] + " " + end.getFullYear() %></div>' +
                '</div>' +
              '</div>' +
            '</li>' +
          '<% }); %>' +
          '</ol></div>'
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
         * Bar Height
         */
        barHeight: 20,

        /**
         * Initialize and setup event listening
         *
         */
        initialize: function(options) {
            this.title = 'Key Events';
            this.chapters = options.storyline.chapters;
        
            Backbone.on('story:page-change', this.updateProgressBar, this);
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

            this.$el.find('h1').addClass('defocus');

            this.renderProgressBar(chapter);

            Backbone.trigger('story:chapter-change', chapter);
            e.preventDefault();
        },


        renderProgressBar: function(chapter) {
            var progressBar,
                index,
                bar;
           
            this.$el.find('.progress-bar').remove();

            progressBar = $('<div class="progress-bar"><div class="bar"></div></div>'); 
            bar = progressBar.find('.bar');
            index = this.$el.find('.current .index');
        
            this.barHeight = index.height() / chapter.pages.length;
            bar.css({height: this.barHeight});

            index.append(progressBar);

            // bind to page change event
        },

        updateProgressBar: function(chapter, page, index) {
            var topPos;

            topPos = this.barHeight * index;

            this.$el.find('.bar').css({
                top: topPos 
            });
        }
    });
    return ChapterPanel;
});

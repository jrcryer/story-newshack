/*global define */
define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {

    var ContentPanel = Backbone.View.extend({

        chapter: null,

        currentPage: 0,

        /**
         * @var string
         */
        template: _.template(
          '<div class="pi">' +
          '<ol id="pages">' +
          '<% _.each(pages, function(page, index) { %>' +
            '<li class="page" id="i-<%= index %>">' +
              '<h2><%= page.title %></h2>' +
              '<div><%= page.summary %></div>' +
            '</li>' +
          '<% }); %>' +
          '</ol></div>'
        ),

        /**
         * @var array
         */
        chapters: [],

        initialize: function() {
            _.bindAll(this, 'onScroll');
            $(window).on("mousewheel", this.$el, this.onScroll);
        },

        onScroll: function(e) {
            var el          = this.$el.find('#pages');

            var position   = $(el).scrollTop();
            var scrollPage = position/this.pageHeight;
            var page       = Math.floor(scrollPage);
            var remainder  = scrollPage % 1;

            if (remainder > 0.7) {
                var nextPage = ++page;

                if (this.currentPage !== nextPage) {
                    this.currentPage = nextPage;
                    Backbone.trigger('story:page-change', this.chapter, this.chapter.pages[this.currentPage], this.currentPage);
                }
            }
            else if (remainder < 0.7 && page === 0 && this.currentPage > 0) {
                this.currentPage = 0;
                Backbone.trigger('story:page-change', this.chapter, this.chapter.pages[this.currentPage], this.currentPage);
            }
        },

        render: function() {
            this.$el.html('');

            if (this.chapter === null) {
                return;
            }
            this.$el.html(this.template({
                pages: this.chapter.pages
            }));
            this.$el.addClass('active');
        },

        setCurrentChapter: function(chapter) {
            this.chapter = chapter;
            this.noOfPages = this.chapter.pages.length;
            this.pageHeight = window.innerHeight;
            this.currentPage = 0;
        }
    });
    return ContentPanel;
});

/*global define */
define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {

    var ContentPanel = Backbone.View.extend({

        chapter: null,

        currentPage: 0,

        events: {
            'click .jump a': 'onIndexClicked'
        },

        /**
         * @var string
         */
        template: _.template(
          '<div class="pi">' +
          '<div id="pages">' +
          '<% _.each(pages, function(page, index) { %>' +
            '<% if (page.showIntro) { %>' +
                '<div class="page">' +
                    '<h2><%= chapter.title %></h2>' +
                    '<% _.each(pages, function(page, index) { %>' +
                        '<% if (index > 0) { %>' +
                            '<% start = moment(page.beginDate).format("Do MMMM YYYY"); %>'+
                            '<% end = moment(page.endDate).format("Do MMMM YYYY"); %>'+
                            '<div class="jump">' +
                                '<a href="#i-<%= index %>">' +
                                    '<span class="event"><%= page.title %></span>' +
                                    '<span class="times"><%= start %></span>' +
                                    '<span class="times"><%= end %></span>' +
                                '</a>' +
                            '</div>' +
                        '<% } %>' +
                    '<% }); %>' +
                '</div>'+
            '<% } else { %>' +
                '<div class="page" id="i-<%= index %>">' +
                    '<h2><%= page.title %></h2>' +
                    '<div><%= page.summary %></div>' +
                '</div>' +
            '<% } %>'+
          '<% }); %>' +
          '</div></div>'
        ),

        /**
         * @var array
         */
        chapters: [],

        initialize: function() {
            _.bindAll(this, 'onScroll');
            _.bindAll(this, 'onAnimationComplete');
            $(window).on("mousewheel", this.$el, this.onScroll);
            $(window).on("mousewheel, DOMMouseScroll", this.$el, this.onScroll);
            this.$el.on("touchmove", '#pages', this.onScroll);
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
                chapter: this.chapter,
                pages: this.chapter.pages
            }));
            this.$el.addClass('active');
        },

        setCurrentChapter: function(chapter) {
            this.chapter = chapter;
            this.noOfPages = this.chapter.pages.length;
            this.pageHeight = window.innerHeight;
            this.currentPage = 0;
        },

        onIndexClicked: function(e) {
            var list  = this.$el.find('#pages');
            var el    = this.$el.find(e.currentTarget);
            var dest  = $(el.attr('href'));
            this.currentPage = _.last(el.attr('href').split('-'));

            list.animate({
                scrollTop: list.scrollTop() + dest.position().top
            }, (this.noOfPages * 300), this.onAnimationComplete);
            e.preventDefault();
        },

        onAnimationComplete: function() {
            Backbone.trigger('story:page-change', this.chapter, this.chapter.pages[this.currentPage], this.currentPage);
        }

    });
    return ContentPanel;
});

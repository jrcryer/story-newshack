/*global define */
define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {

    var ContentPanel = Backbone.View.extend({

        chapter: null,

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
        }
    });
    return ContentPanel;
});

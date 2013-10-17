/*global define */
define(['backbone', 'underscore'], function (Backbone, _) {

    var Intro = Backbone.View.extend({

        /**
         * @var string
         */
        title: '',

        /**
         * @var string
         */
        template: _.template(
          '<div id="intro">' +
          '<h1><%= title %></h1>' +
          '<p><%= summary %></p>' +
          '</div>'
        ),

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
            this.page = options.page;
        },

        /**
         * Render the chapter panel
         *
         */
        render: function() {
            this.$el.html('');

            this.$el.html(this.template({
                title: this.page.title,
                summary: this.page.summary
            }));
        }
    });
    return Intro;
});

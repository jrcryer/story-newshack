/*global define */
define(['backbone', 'underscore'], function (Backbone, _) {

    var Timeline = Backbone.View.extend({

        /**
         * @var string
         */
        title: '',

        /**
         * @var string
         */
        template: _.template(
          '<div id="timeline">' +
          '<p class="begin"><%= begin %></p>' +
          '<p class="end"><%= end %></p>' +
          '</div>'
        ),

        /**
         * Initialize and setup event listening
         *
         */
        initialize: function(options) {
            this.page = options.page;
        },

        /**
         * Render the chapter panel
         *
         */
        render: function() {
            this.$el.html('');

            this.$el.html(this.template({
                begin: new Date(this.page.beginDate).toString('dddd, MMMM ,yyyy'),
                end: new Date(this.page.endDate).toString('dddd, MMMM ,yyyy')
            }));
        }
    });
    return Timeline;
});

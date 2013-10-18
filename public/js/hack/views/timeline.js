/*global define */
define(['backbone', 'underscore', 'moment'], function (Backbone, _, moment) {

    var Timeline = Backbone.View.extend({

        /**
         * @var string
         */
        title: '',

        /**
         * @var string
         */
        template: _.template(
          '<div id="timeline-wrapper">' +
          '<div id="timeline" class="<%= timelineClass %>">' +
          '<p class="begin"><span><%= beginDay %></span> <%= begin %></p>' +
          '<p class="end"><span><%= endDay %></span> <%= end %></p>' +
          '</div>' +
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
            var begin = moment(this.page.beginDate),
                end = moment(this.page.endDate);

            this.$el.html('');
            this.$el.html(this.template({
                begin: begin.format("MMMM YYYY"),
                beginDay: begin.format("Do"),
                end: end.format('MMMM YYYY'),
                endDay: end.format('Do'),
                timelineClass: this.page.beginDate === this.page.endDate ? 'no-date' : ''
            }));

            var availableWidth = window.innerWidth - 500;
            this.$el.find('#timeline').css('width', availableWidth);
        }
    });
    return Timeline;
});

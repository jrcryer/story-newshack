/*global define */
define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {

    var ChapterPanel = Backbone.View.extend({

        title: '',

        /**
         * @var string
         */
        template: _.template($('#chapter_panel').html()),

        /**
         * Initialize and setup event listening
         *
         */
        initialize: function(options) {

            this.title = options.title;

        },

        render: function() {
            this.$el.html('');

            this.$el.html(this.template({
                title: this.title,
                chapters: this.collection
            }));
        }
    });
    return ChapterPanel;
});
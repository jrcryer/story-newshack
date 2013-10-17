/*global require */
require.config({
    paths: {
        jquery: '/lib/jquery/jquery',
        app: 'hack/app',
        underscore: '/lib/underscore/underscore',
        backbone: '/lib/backbone/backbone'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: 'jQuery'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'hack/app': {
            exports: 'Hack'
        }
    }
});

require([
    'jquery',
    'backbone',
    'hack/app',
], function($, Backbone, Hack) {


    console.log(Hack);

});
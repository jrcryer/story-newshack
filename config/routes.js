var async = require('async');

module.exports = function(app) {

    var storyId = 'arab_spring';

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
    app.get('/:storyId', function(req, res) {
        index.render(req, res);
    }); 
    app.get('/map', index.map);
};

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  _ = require('underscore');


var storyId = 'arab_spring';

exports.render = function(req, res) {
    if (undefined !== req.params.storyId) {
        storyId = req.params.storyId;
    }
    res.render('index', {
        title: 'Storyline',
        storyId: storyId,
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};

/**
 * This is just a test function
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.map = function(req, res) {
  res.render('map');
};

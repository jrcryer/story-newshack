/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  _ = require('underscore');


var storyId = 'arab_spring';

exports.render = function(req, res) {
    res.render('index', {
        title: 'Storyline',
        storyId: req.params.storyId || 'arab_spring',
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

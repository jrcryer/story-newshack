/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  _ = require('underscore');


exports.render = function(req, res) {
  res.render('index', {
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

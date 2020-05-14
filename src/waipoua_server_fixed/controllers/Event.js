'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventSpecificGET = function eventSpecificGET (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.eventSpecificGET(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsByCateogoryGET = function eventsByCateogoryGET (req, res, next) {
  var categoryId = req.swagger.params['categoryId'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Event.eventsByCateogoryGET(categoryId,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsByMonthGET = function eventsByMonthGET (req, res, next) {
  var month = req.swagger.params['month'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Event.eventsByMonthGET(month,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsGET = function eventsGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Event.eventsGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

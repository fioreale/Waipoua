'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.serviceSpecificGET = function serviceSpecificGET (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  Service.serviceSpecificGET(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesByCategoryGET = function servicesByCategoryGET (req, res, next) {
  var categoryId = req.swagger.params['categoryId'].value;
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  if(!limit) limit = 12;
  if(!offset) offset = 0;
  Service.servicesByCategoryGET(categoryId,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesGET = function servicesGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  if(!limit) limit = 12;
  if(!offset) offset = 0;
  Service.servicesGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

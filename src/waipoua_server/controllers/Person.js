'use strict';

var utils = require('../utils/writer.js');
var Person = require('../service/PersonService');

module.exports.peopleByRoleGET = function peopleByRoleGET (req, res, next) {
  var category_id = req.swagger.params['category_id'].value;
  Person.peopleByRoleGET(category_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peopleGET = function peopleGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  if(!limit) limit = 12;
  if(!offset) offset = 0;
  Person.peopleGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peopleSpecificGET = function peopleSpecificGET (req, res, next) {
  var personId = req.swagger.params['personId'].value;
  Person.peopleSpecificGET(personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

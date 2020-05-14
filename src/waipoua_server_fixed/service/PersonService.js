'use strict';


/**
 * Find list of person by role
 *
 * category_id Long The id of the role
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.peopleByRoleGET = function(category_id,limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "image" : {
    "url" : "url"
  },
  "role" : {
    "category_id" : 9,
    "name" : "name"
  },
  "surname" : "surname",
  "name" : "name",
  "description" : "description",
  "phone_number" : "phone_number",
  "email" : "email",
  "person_id" : 3
}, {
  "image" : {
    "url" : "url"
  },
  "role" : {
    "category_id" : 9,
    "name" : "name"
  },
  "surname" : "surname",
  "name" : "name",
  "description" : "description",
  "phone_number" : "phone_number",
  "email" : "email",
  "person_id" : 3
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * List of the people that joined the association
 *
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.peopleGET = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "image" : {
    "url" : "url"
  },
  "role" : {
    "category_id" : 9,
    "name" : "name"
  },
  "surname" : "surname",
  "name" : "name",
  "description" : "description",
  "phone_number" : "phone_number",
  "email" : "email",
  "person_id" : 3
}, {
  "image" : {
    "url" : "url"
  },
  "role" : {
    "category_id" : 9,
    "name" : "name"
  },
  "surname" : "surname",
  "name" : "name",
  "description" : "description",
  "phone_number" : "phone_number",
  "email" : "email",
  "person_id" : 3
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find person by Id
 *
 * personId Long The id of a person
 * returns Person
 **/
exports.peopleSpecificGET = function(personId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "image" : {
    "url" : "url"
  },
  "role" : {
    "category_id" : 9,
    "name" : "name"
  },
  "surname" : "surname",
  "name" : "name",
  "description" : "description",
  "phone_number" : "phone_number",
  "email" : "email",
  "person_id" : 3
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


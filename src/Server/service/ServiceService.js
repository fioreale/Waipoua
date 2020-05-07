'use strict';


/**
 * A specific service
 *
 * serviceId Long The id of the service
 * returns Service
 **/
exports.serviceSpecificGET = function(serviceId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "presentation" : "presentation",
  "image" : [ {
    "url" : "url"
  }, {
    "url" : "url"
  } ],
  "name" : "Presentazione di Waipoua",
  "id" : 7,
  "category" : {
    "name" : "name",
    "id" : 9
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * A specific service category
 *
 * categoryId Long The id of the cateogory
 * returns List
 **/
exports.servicesByCategoryGET = function(categoryId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "presentation" : "presentation",
  "image" : [ {
    "url" : "url"
  }, {
    "url" : "url"
  } ],
  "name" : "Presentazione di Waipoua",
  "id" : 7,
  "category" : {
    "name" : "name",
    "id" : 9
  }
}, {
  "presentation" : "presentation",
  "image" : [ {
    "url" : "url"
  }, {
    "url" : "url"
  } ],
  "name" : "Presentazione di Waipoua",
  "id" : 7,
  "category" : {
    "name" : "name",
    "id" : 9
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * List of services provided by the association 
 *
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.servicesGET = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "presentation" : "presentation",
  "image" : [ {
    "url" : "url"
  }, {
    "url" : "url"
  } ],
  "name" : "Presentazione di Waipoua",
  "id" : 7,
  "category" : {
    "name" : "name",
    "id" : 9
  }
}, {
  "presentation" : "presentation",
  "image" : [ {
    "url" : "url"
  }, {
    "url" : "url"
  } ],
  "name" : "Presentazione di Waipoua",
  "id" : 7,
  "category" : {
    "name" : "name",
    "id" : 9
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


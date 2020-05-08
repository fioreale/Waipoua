'use strict';


/**
 * List of events provided by the association 
 *
 * eventId Long Id of the month
 * returns List
 **/
exports.eventSpecificGET = function(eventId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "presentation" : "presentation",
  "date" : {
    "month" : 1,
    "hour" : 5,
    "year" : 5,
    "minutes" : 2,
    "day" : 6
  },
  "image" : {
    "url" : "url"
  },
  "event_id" : 0,
  "relativeTo" : {
    "presentation" : "presentation",
    "image" : [ {
      "url" : "url"
    }, {
      "url" : "url"
    } ],
    "service_id" : 7,
    "name" : "Presentazione di Waipoua",
    "category" : {
      "category_id" : 9,
      "name" : "name"
    }
  },
  "contact" : {
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
  },
  "name" : "name",
  "location" : "location",
  "category" : {
    "category_id" : 9,
    "name" : "name"
  }
}, {
  "presentation" : "presentation",
  "date" : {
    "month" : 1,
    "hour" : 5,
    "year" : 5,
    "minutes" : 2,
    "day" : 6
  },
  "image" : {
    "url" : "url"
  },
  "event_id" : 0,
  "relativeTo" : {
    "presentation" : "presentation",
    "image" : [ {
      "url" : "url"
    }, {
      "url" : "url"
    } ],
    "service_id" : 7,
    "name" : "Presentazione di Waipoua",
    "category" : {
      "category_id" : 9,
      "name" : "name"
    }
  },
  "contact" : {
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
  },
  "name" : "name",
  "location" : "location",
  "category" : {
    "category_id" : 9,
    "name" : "name"
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
 * List of events provided by the association 
 *
 * categoryId Long Month in which the event takes place
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.eventsByCateogoryGET = function(categoryId,limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "presentation" : "presentation",
  "date" : {
    "month" : 1,
    "hour" : 5,
    "year" : 5,
    "minutes" : 2,
    "day" : 6
  },
  "image" : {
    "url" : "url"
  },
  "event_id" : 0,
  "relativeTo" : {
    "presentation" : "presentation",
    "image" : [ {
      "url" : "url"
    }, {
      "url" : "url"
    } ],
    "service_id" : 7,
    "name" : "Presentazione di Waipoua",
    "category" : {
      "category_id" : 9,
      "name" : "name"
    }
  },
  "contact" : {
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
  },
  "name" : "name",
  "location" : "location",
  "category" : {
    "category_id" : 9,
    "name" : "name"
  }
}, {
  "presentation" : "presentation",
  "date" : {
    "month" : 1,
    "hour" : 5,
    "year" : 5,
    "minutes" : 2,
    "day" : 6
  },
  "image" : {
    "url" : "url"
  },
  "event_id" : 0,
  "relativeTo" : {
    "presentation" : "presentation",
    "image" : [ {
      "url" : "url"
    }, {
      "url" : "url"
    } ],
    "service_id" : 7,
    "name" : "Presentazione di Waipoua",
    "category" : {
      "category_id" : 9,
      "name" : "name"
    }
  },
  "contact" : {
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
  },
  "name" : "name",
  "location" : "location",
  "category" : {
    "category_id" : 9,
    "name" : "name"
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
 * List of events provided by the association in a certain month 
 *
 * month String Month in which the event takes place
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.eventsByMonthGET = function(month,limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "presentation" : "presentation",
  "date" : {
    "month" : 1,
    "hour" : 5,
    "year" : 5,
    "minutes" : 2,
    "day" : 6
  },
  "image" : {
    "url" : "url"
  },
  "event_id" : 0,
  "relativeTo" : {
    "presentation" : "presentation",
    "image" : [ {
      "url" : "url"
    }, {
      "url" : "url"
    } ],
    "service_id" : 7,
    "name" : "Presentazione di Waipoua",
    "category" : {
      "category_id" : 9,
      "name" : "name"
    }
  },
  "contact" : {
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
  },
  "name" : "name",
  "location" : "location",
  "category" : {
    "category_id" : 9,
    "name" : "name"
  }
}, {
  "presentation" : "presentation",
  "date" : {
    "month" : 1,
    "hour" : 5,
    "year" : 5,
    "minutes" : 2,
    "day" : 6
  },
  "image" : {
    "url" : "url"
  },
  "event_id" : 0,
  "relativeTo" : {
    "presentation" : "presentation",
    "image" : [ {
      "url" : "url"
    }, {
      "url" : "url"
    } ],
    "service_id" : 7,
    "name" : "Presentazione di Waipoua",
    "category" : {
      "category_id" : 9,
      "name" : "name"
    }
  },
  "contact" : {
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
  },
  "name" : "name",
  "location" : "location",
  "category" : {
    "category_id" : 9,
    "name" : "name"
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
 * List of events provided by the association 
 *
 * limit Integer The maximum number of items per page (optional)
 * offset Integer Pagination offset. Default is 0. (optional)
 * returns List
 **/
exports.eventsGET = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "presentation" : "presentation",
  "date" : {
    "month" : 1,
    "hour" : 5,
    "year" : 5,
    "minutes" : 2,
    "day" : 6
  },
  "image" : {
    "url" : "url"
  },
  "event_id" : 0,
  "relativeTo" : {
    "presentation" : "presentation",
    "image" : [ {
      "url" : "url"
    }, {
      "url" : "url"
    } ],
    "service_id" : 7,
    "name" : "Presentazione di Waipoua",
    "category" : {
      "category_id" : 9,
      "name" : "name"
    }
  },
  "contact" : {
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
  },
  "name" : "name",
  "location" : "location",
  "category" : {
    "category_id" : 9,
    "name" : "name"
  }
}, {
  "presentation" : "presentation",
  "date" : {
    "month" : 1,
    "hour" : 5,
    "year" : 5,
    "minutes" : 2,
    "day" : 6
  },
  "image" : {
    "url" : "url"
  },
  "event_id" : 0,
  "relativeTo" : {
    "presentation" : "presentation",
    "image" : [ {
      "url" : "url"
    }, {
      "url" : "url"
    } ],
    "service_id" : 7,
    "name" : "Presentazione di Waipoua",
    "category" : {
      "category_id" : 9,
      "name" : "name"
    }
  },
  "contact" : {
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
  },
  "name" : "name",
  "location" : "location",
  "category" : {
    "category_id" : 9,
    "name" : "name"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


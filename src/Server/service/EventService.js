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
  "relativeTo" : {
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
  },
  "contact" : {
    "image" : {
      "url" : "url"
    },
    "role" : {
      "name" : "name",
      "id" : 9
    },
    "surname" : "surname",
    "name" : "name",
    "description" : "description",
    "phone_number" : "phone_number",
    "id" : 3,
    "email" : "email"
  },
  "name" : "name",
  "location" : "location",
  "id" : 0,
  "category" : {
    "name" : "name",
    "id" : 9
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
  "relativeTo" : {
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
  },
  "contact" : {
    "image" : {
      "url" : "url"
    },
    "role" : {
      "name" : "name",
      "id" : 9
    },
    "surname" : "surname",
    "name" : "name",
    "description" : "description",
    "phone_number" : "phone_number",
    "id" : 3,
    "email" : "email"
  },
  "name" : "name",
  "location" : "location",
  "id" : 0,
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
  "relativeTo" : {
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
  },
  "contact" : {
    "image" : {
      "url" : "url"
    },
    "role" : {
      "name" : "name",
      "id" : 9
    },
    "surname" : "surname",
    "name" : "name",
    "description" : "description",
    "phone_number" : "phone_number",
    "id" : 3,
    "email" : "email"
  },
  "name" : "name",
  "location" : "location",
  "id" : 0,
  "category" : {
    "name" : "name",
    "id" : 9
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
  "relativeTo" : {
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
  },
  "contact" : {
    "image" : {
      "url" : "url"
    },
    "role" : {
      "name" : "name",
      "id" : 9
    },
    "surname" : "surname",
    "name" : "name",
    "description" : "description",
    "phone_number" : "phone_number",
    "id" : 3,
    "email" : "email"
  },
  "name" : "name",
  "location" : "location",
  "id" : 0,
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
  "relativeTo" : {
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
  },
  "contact" : {
    "image" : {
      "url" : "url"
    },
    "role" : {
      "name" : "name",
      "id" : 9
    },
    "surname" : "surname",
    "name" : "name",
    "description" : "description",
    "phone_number" : "phone_number",
    "id" : 3,
    "email" : "email"
  },
  "name" : "name",
  "location" : "location",
  "id" : 0,
  "category" : {
    "name" : "name",
    "id" : 9
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
  "relativeTo" : {
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
  },
  "contact" : {
    "image" : {
      "url" : "url"
    },
    "role" : {
      "name" : "name",
      "id" : 9
    },
    "surname" : "surname",
    "name" : "name",
    "description" : "description",
    "phone_number" : "phone_number",
    "id" : 3,
    "email" : "email"
  },
  "name" : "name",
  "location" : "location",
  "id" : 0,
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
  "relativeTo" : {
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
  },
  "contact" : {
    "image" : {
      "url" : "url"
    },
    "role" : {
      "name" : "name",
      "id" : 9
    },
    "surname" : "surname",
    "name" : "name",
    "description" : "description",
    "phone_number" : "phone_number",
    "id" : 3,
    "email" : "email"
  },
  "name" : "name",
  "location" : "location",
  "id" : 0,
  "category" : {
    "name" : "name",
    "id" : 9
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
  "relativeTo" : {
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
  },
  "contact" : {
    "image" : {
      "url" : "url"
    },
    "role" : {
      "name" : "name",
      "id" : 9
    },
    "surname" : "surname",
    "name" : "name",
    "description" : "description",
    "phone_number" : "phone_number",
    "id" : 3,
    "email" : "email"
  },
  "name" : "name",
  "location" : "location",
  "id" : 0,
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


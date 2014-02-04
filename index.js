'use strict';


var pkg = require('./package.json'),
_ = require('underscore');

module.exports = function(){

  function failback(){

    var message = arguments[0];
    var callback = arguments[arguments.length-1];

    var error = new Error(message + ' failed: Your cachy does not have a storage engine configured');

    if(typeof callback === 'function') return callback(error);
    else throw error;
  }

  var exprt = {version : pkg.version};
  _.each(['put', 'has', 'get', 'remove', 'clear' ,'info'], function(fxn){ exprt[fxn] = _.partial(failback, 'cachy ' + fxn); } );
  return exprt;
};



module.exports = function(sails) {
    
    var exec = require('./lib/exec.js');
    var setup = require('./lib/setup.js');
    
    return {
        exec: exec
    };
};



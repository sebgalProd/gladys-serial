var ports = [];
var Promise = require('bluebird');
var connect = require('./connect.js');

module.exports = {

  addPort: function(newPort)  {
    ports.push(newPort);
    return Promise.resolve();
  },

  getPorts: function() {
    return Promise.resolve(ports);
  }
};
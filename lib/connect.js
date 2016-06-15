var SerialPort = require('serialport');
var shared = require('./shared.js');

module.exports = function() {

  // we get all devices from this service
  return gladys.device.getByService({
      service: 'serial'
    })
    .then(function(devices) {

      // foreach device
      return Promise.map(devices, function(device) {

        // we connect to the device
        var port = new SerialPort(device.identifier, {
          parser: SerialPort.parsers.readline('\n')
        });

        port.on('error', function(err) {
          sails.log.warn('Gladys serial error : ', err.message);
        });

        // we add the port object to the shared list
        shared.addPort(port);

        return port;
      });
    });
};
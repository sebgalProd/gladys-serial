var SerialPort = require('serialport');
var Promise = require('bluebird');
var connect = require('./connect.js');

module.exports = function() {
  console.log('1- Find all connected USB devices ');
  return listUsbDevices()
    .then(function(ports) {
    console.log('2 -- Search only the arduinos  ');
      return filterArduino(ports);
    })
    .then(function(arduinos) {
    console.log('3 --- create a device foreach arduino found'); 
      return createDevices(arduinos);
    })
    .then(function() {

      console.log('4 ---- connection');
      return connect();
    })
};

function createDevices(arduinos) {

  return Promise.map(arduinos, function(arduino) {

    var arduinoObj = {
      device: {
        name: 'Arduino',
        protocol: 'usb',
        service: 'serial',
        identifier: arduino.comName
      },
      types: []
    };

    return gladys.device.create(arduinoObj);
  });
}

function filterArduino(ports) {
  var arduinos = [];

  // foreach port we test if it is an arduino
  ports.forEach(function(port) {
    if (port.manufacturer && port.manufacturer.toLowerCase().search("arduino") != -1) {
      console.log('Arduino device found.');
      arduinos.push(port);
    } else {console.log('No device found');}
  });
  return Promise.resolve(arduinos);
}

function listUsbDevices() {
  return new Promise(function(resolve, reject) {
    SerialPort.list(function(err, ports) {
      if (err) return reject(new Error(err));

      return resolve(ports);
    });
  });
}

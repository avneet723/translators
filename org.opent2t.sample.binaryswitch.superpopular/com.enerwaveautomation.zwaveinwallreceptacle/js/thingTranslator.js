/* jshint esversion: 6 */
/* jshint node: true */
'use strict';

var ZWave = require('openzwave-shared');
var os = require('os');

// This code uses ES2015 syntax that requires at least Node.js v4.
// For Node.js ES2015 support details, reference http://node.green/

function validateArgumentType(arg, argName, expectedType) {
    if (typeof arg === 'undefined') {
        throw new Error('Missing argument: ' + argName + '. ' +
            'Expected type: ' + expectedType + '.');
    } else if (typeof arg !== expectedType) {
        throw new Error('Invalid argument: ' + argName + '. ' +
            'Expected type: ' + expectedType + ', got: ' + (typeof arg));
    }
}

var zwave = new ZWave({
    ConsoleOutput: false
});

zwave.on('driver failed', function () {
    console.log('failed to start driver');
    zwave.disconnect();
    process.exit();
});

//var device = null;
var nodeId = null;
var homeId = null;

var deviceType = 'binary_switches';

class Translator {

    constructor(device) {
        console.log('Initializing device.');

        validateArgumentType(device, 'device', 'object');
        validateArgumentType(device.props, 'device.props', 'object');

        nodeId = device.props.id.nodeId;
        homeId = device.props.id.homeId;
        
        var zwavedriverroot = {
            "darwin": '/dev/',
            "linux": '/dev/',
            "win32": '\\\\.\\'
        }
        var deviceAddress = zwavedriverroot[os.platform()] + props.serialPort;
        console.log("connecting to " + deviceAddress);
        zwave.connect(zwavedriverroot[os.platform()] + deviceAddress);
    }


    // exports for individual properties

    disconnect () {
        zwave.disconnect(function () {
            console.log('device disconnected');
        });
    }

    turnOn() {
        console.log('turnOn called');
        validateArgumentType(nodeId, 'nodeId', 'string');
        zwave.setValue(nodeId, 37, 1, 0, true);
    }

    turnOff() {
        console.log('turnOff called');
        validateArgumentType(nodeId, 'nodeId', 'string');
        zwave.setValue(nodeId, 37, 1, 0, false);
    }

}

//Export the translator from the module
module.exports = Translator;
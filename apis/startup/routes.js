/*
Module developed by:
  ______    _     _                     ______          _
 |  ____|  | |   (_)                   |  ____|        | |
 | |__ __ _| |__  _  __ _ _ __   ___   | |__ _   _ _ __| | __ _ _ __
 |  __/ _` | '_ \| |/ _` | '_ \ / _ \  |  __| | | | '__| |/ _` | '_ \
 | | | (_| | |_) | | (_| | | | | (_) | | |  | |_| | |  | | (_| | | | |
 |_|  \__,_|_.__/|_|\__,_|_| |_|\___/  |_|   \__,_|_|  |_|\__,_|_| |_|

 * RESTfull API's for Digital Welcome Project
*/

/* jshint esversion: 6 */

//##########  Ext Modules  ##########

const express = require('express');

const home = require('../routes/home');
const contacts = require('../routes/contacts');
const rooms = require('../routes/rooms');
const meetings = require('../routes/meetings');
const networkAccess = require('../routes/networkAccess');
const checkins = require('../routes/checkins');
const digitalSignage = require('../routes/digitalSignage');
const webexDevices = require('../routes/webexDevices');
const notify = require('../routes/notify');

module.exports = function (welcomeWebApp) {
   welcomeWebApp.use(express.json());
   welcomeWebApp.use(express.static(__dirname + '/public'));
   welcomeWebApp.use(express.static(__dirname + '/public/html'));
   welcomeWebApp.use(express.static(__dirname + '/public/css'));
   welcomeWebApp.use(express.static(__dirname + '/public/js'));
   welcomeWebApp.use('/', home);
   welcomeWebApp.use('/api/v1/contacts', contacts);
   welcomeWebApp.use('/api/v1/rooms', rooms);
   welcomeWebApp.use('/api/v1/meetings', meetings);
   welcomeWebApp.use('/api/v1/networkAccess', networkAccess);
   welcomeWebApp.use('/api/v1/checkins', checkins);
   welcomeWebApp.use('/api/v1/digitalSignage', digitalSignage);
   welcomeWebApp.use('/api/v1/webexDevices', webexDevices);
   welcomeWebApp.use('/api/v1/notify', notify);
}

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

process.env.NODE_CONFIG_DIR = (__dirname + '/config');
const config = require('config');
const express = require('express');

//##########  Server Init  #########

const welcomeWebApp = express();
require('./startup/routes')(welcomeWebApp);

//########## Server Start  ##########

const port = process.env.API_PORT || config.get('api.PORT') || 5000; // Linha de comando - export PORT = #####
welcomeWebApp.listen (port, () => console.log(`Listening on port: ${port}`));
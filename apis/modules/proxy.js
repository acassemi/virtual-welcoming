/*
Module developed by:
  ______    _     _                     ______          _
 |  ____|  | |   (_)                   |  ____|        | |
 | |__ __ _| |__  _  __ _ _ __   ___   | |__ _   _ _ __| | __ _ _ __
 |  __/ _` | '_ \| |/ _` | '_ \ / _ \  |  __| | | | '__| |/ _` | '_ \
 | | | (_| | |_) | | (_| | | | | (_) | | |  | |_| | |  | | (_| | | | |
 |_|  \__,_|_.__/|_|\__,_|_| |_|\___/  |_|   \__,_|_|  |_|\__,_|_| |_|

 * Proxy functions for DigitalWelcome project
*/

/* jshint esversion: 6 */

//##########   Lab Proxy   ##########

const config = require('config');
const globalTunnel = require('global-tunnel-ng');

module.exports = function () {
   globalTunnel.initialize({
      host: config.get('proxy.HOST'),
      port: config.get('proxy.PORT')
   });
};
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

const message = require('./messages');
const webexTeams = require('../modules/webexTeams');
const email = require('../modules/email');
const sms = require('../modules/sms');
const express = require('express');

//########## Teams, Email, ##########
//########## SMS Messaging ##########

async function notifyAllTypes(params) {
   
   try {

      emailSubject = "Digital Welcome - Confirmação de visita";
      hostTeamsMessage = message.teamsCheckinMessageHost(params.visitor);
      visitorTeamsMessage = message.teamsCheckinMessageVisitor(params.host);
      if (params.networkAccess) visitorTeamsMessage += message.teamsNetworkAccess(params.networkAccess);
      hostEmailMessage = message.emailCheckinMessageHost(params.visitor);
      visitorEmailMessage = message.emailCheckinMessageVisitor(params.host);
      if (params.networkAccess) visitorEmailMessage += message.teamsNetworkAccess(params.networkAccess);
      hostSmsMessage = message.smsCheckinMessageHost(params.visitor);
      visitorSmsMessage = message.smsCheckinMessageVisitor(params.host);
      if (params.networkAccess) visitorSmsMessage += message.teamsNetworkAccess(params.networkAccess);

      let webexTeams1 = await webexTeams.sendMessage({ "email": params.host.email, "message": hostTeamsMessage });
      let webexTeams2 = await webexTeams.sendMessage({ "email": params.visitor.email, "message": visitorTeamsMessage });
      let email1 = await email.sendMessage({ "email": params.host.email, "subject": emailSubject, "message": hostEmailMessage });
      let email2 = await email.sendMessage({ "email": params.visitor.email, "subject": emailSubject, "message": visitorEmailMessage });
      if (params.host.phone) { let sms1 = await sms.sendMessage({ "phone": params.host.phone, "message": hostSmsMessage }) }
      if (params.visitor.phone) { let sms2 = await sms.sendMessage({ "phone": params.visitor.phone, "message": visitorSmsMessage }) }
      return ("Success - Notitications were sent correctly");
   }
   catch (error) {
      throw (new Error(error));
   }
};

module.exports.notifyAllTypes = notifyAllTypes;
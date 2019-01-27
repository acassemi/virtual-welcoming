/*
Module developed by:
  ______    _     _                     ______          _
 |  ____|  | |   (_)                   |  ____|        | |
 | |__ __ _| |__  _  __ _ _ __   ___   | |__ _   _ _ __| | __ _ _ __
 |  __/ _` | '_ \| |/ _` | '_ \ / _ \  |  __| | | | '__| |/ _` | '_ \
 | | | (_| | |_) | | (_| | | | | (_) | | |  | |_| | |  | | (_| | | | |
 |_|  \__,_|_.__/|_|\__,_|_| |_|\___/  |_|   \__,_|_|  |_|\__,_|_| |_|

 * Guest Access request module for DigitalWelcome project
*/

/* jshint esversion: 6 */

//##########  Ext Modules  ##########

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const config = require('config');
const request = require('request');

let iseHostName = config.get('ise.HOSTNAME');
let isePort = config.get('ise.PORT');
let ersUserName = config.get('ise.ERS_USERNAME');
let ersPassword = config.get('ise.ERS_PASSWORD');
let sponsorUserName = config.get('ise.SPONSOR_USERNAME');
let sponsorPassword = config.get('ise.SPONSOR_PASSWORD');
let sponsorUserId = config.get('ise.SPONSOR_USERID');
let guestPortalId = config.get('ise.GUEST_PORTALID');

function createGuestAccount(params) {

   console.log("***** CREATEGUESTACCOUNT PARAMS *****\n", params);

   return new Promise((resolve, reject) => {

      var options = {
         method: 'POST',
         url: `https://${iseHostName}:${isePort}/ers/config/guestuser`,
         headers:
         {
            'cache-control': 'no-cache',
            Authorization: "Basic " + new Buffer.from(sponsorUserName + ":" + sponsorPassword).toString("base64"),
            'Content-Type': 'application/json'
         },
         body:
         {
            GuestUser:
            {
               //id: '123456789',
               //name: 'digitalwelcoming',
               //guestType: 'Daily (default)',
               status: 'ACTIVE',
               sponsorUserName: sponsorUserName,
               sponsorUserId: sponsorUserId,
               personBeingVisited: params.host.email,
               reasonForVisit: "Meeting",
               guestInfo:
               {
                  userName: params.visitor.email,
                  firstName: params.visitor.name.firstName,
                  lastName: params.visitor.name.lastName,
                  emailAddress: params.visitor.email,
                  phoneNumber: params.visitor.phone,
                  //password: '123456',
                  creationTime: today(),
                  //company: 'Cisco Systems',
                  //notificationLanguage: 'English',
                  //smsServiceProvider: 'Global Default',
                  enabled: true
               },
               guestAccessInfo:
               {
                  validDays: 1,
                  fromDate: today(),
                  toDate: tomorrow(),
                  //location: 'San Jose',
                  //ssid: 'ssid',
                  //groupTag: 'DigitalWelcomingAPIUser'
               },
               portalId: guestPortalId,
               customFields: {},
               link:
               {
                  rel: 'self',
                  href: `https://${iseHostName}:${isePort}/ers/config/guestuser/name/${params.visitor.email}`,
                  type: 'application/xml'
               }
            }
         },
         json: true
      };

      request(options,
         function (error, response, body) {
            if (error) {
               console.log("ERROR.....:\n", error);
               reject(new Error(error));
            } else {
               //console.log("RESPONSE.....:\n", response);
               console.log("BODY.....:\n", body);
               resolve(body); 
            } 
         });
      
   });
}

//########## Aux Functions ##########

//Returns current date in the format DD-MM-YYYY 00:00

function today() {

   let date = new Date();

   dd = date.getDate();
   mo = date.getMonth();
   yyyy = date.getFullYear();
   hh = date.getHours();
   mi = date.getMinutes() + 1;

   return (`${dd}/${mo}/${yyyy} ${hh}:${mi}`);
}

//Returns tomorrow date in the format DD-MM-YYYY 00:00
function tomorrow() {

   let date = new Date();
   date.setTime(new Date().getTime() + 86400000);

   dd = date.getDate();
   mo = date.getMonth();
   yyyy = date.getFullYear();
   hh = date.getHours();
   mi = date.getMinutes() + 1;

   return (`${dd}/${mo}/${yyyy} ${hh}:${mi}`);
   
}

module.exports.createGuestAccount = createGuestAccount;
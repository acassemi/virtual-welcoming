/*
Module developed by:
  ______    _     _                     ______          _
 |  ____|  | |   (_)                   |  ____|        | |
 | |__ __ _| |__  _  __ _ _ __   ___   | |__ _   _ _ __| | __ _ _ __
 |  __/ _` | '_ \| |/ _` | '_ \ / _ \  |  __| | | | '__| |/ _` | '_ \
 | | | (_| | |_) | | (_| | | | | (_) | | |  | |_| | |  | | (_| | | | |
 |_|  \__,_|_.__/|_|\__,_|_| |_|\___/  |_|   \__,_|_|  |_|\__,_|_| |_|
 
 * Validation module for the multiple functions of Digital Welcome
*/

/* jshint esversion: 6 */

const Joi = require('joi');

//##########  Joi Schemas  ##########

const contactCreateUpdateSchema = {
   firstName: Joi.string().min(3).required(),
   lastName: Joi.string().min(3).required(),
   email: Joi.string().regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).required(),
   phone: Joi.string().min(10),
   type: Joi.number().min(1).max(5).required(), // 1 - Cisco Employee, 2 - Customer, 3 - Partner
   photo: Joi.binary(),
   isActive: Joi.boolean()
};

const contactReadSchema = {
   _id: Joi.string().max(24),
   firstName: Joi.string().min(3),
   lastName: Joi.string().min(3),
   email: Joi.string().regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
   type: Joi.number().min(1).max(5) // 1 - Cisco Employee, 2 - Customer, 3 - Partner
};

const roomCreateUpdateSchema = {
   name: Joi.string().required(),
   seats: Joi.number().required(),
   table: Joi.boolean().required(),
   whiteboard: Joi.boolean().required(),
   video: Joi.boolean().required(),
   videoType: Joi.string(),
   location: Joi.string(),
   photo: Joi.binary(),
   tags: Joi.array().items(Joi.string())
};

const roomReadSchema = {
   _id: Joi.string().max(24),
   name: Joi.string().min(7),
   size: Joi.number()
};

const meetingCreateUpdateSchema = {
   subject: Joi.string().min(5).required(),
   hostId: Joi.string().max(24).required(),
   visitorId: Joi.string().max(24).required(),
   roomId: Joi.string().max(24).required(),
   participants: Joi.array().items(Joi.string().min(11)),
   tags: Joi.array().items(Joi.string())
};

const meetingReadSchema = {
   _id: Joi.string().max(24),
   roomId: Joi.string().max(24),
   visitorId: Joi.string().max(24),
   hostId: Joi.string().max(24),
   date: Joi.date()
};

const networkAccessCreateUpdateSchema = {
   hostId: Joi.string().max(24).required(),
   //checkinId: Joi.string().max(24).requirzed(),
   visitorId: Joi.string().max(24).required(),
   username: Joi.string().required()
};

const networkAccessReadSchema = {
   _id: Joi.string().max(24),
   hostId: Joi.string().max(24),
   //checkinId: Joi.string().max(24),
   visitorId: Joi.string().max(24),
   username: Joi.string().max(24),
   date: Joi.date()
};

const checkinCreateUpdateSchema = {
   visitorId: Joi.string().max(24).required(),
   hostId: Joi.string().max(24).required(),
   meetingId: Joi.string().max(24),
   networkAccessId: Joi.string().max(24),
   tags: Joi.array().items(Joi.string())
};

const checkinReadSchema = {
   _id: Joi.string().max(24),
   visitorId: Joi.string().max(24),
   hostId: Joi.string().max(24),
   meetingId: Joi.string().max(24),
   networkAccessId: Joi.string().max(24),
   tags: Joi.array().items(Joi.string()),
   date: Joi.date()
};

const webexDeviceCreateUpdateSchema = {
   _id: Joi.string().max(24),
   name: Joi.string().regex(/^SPL1-26-/).required(),
   ip: Joi.string().regex(/^((0|1\\d?\\d?|2[0-4]?\\d?|25[0-5]?|[3-9]\\d?)\\.){3}(0|1\\d?\\d?|2[0-4]?\\d?|25[0-5]?|[3-9]\\d?)$/).required(),
   username: Joi.string().required(),
   password: Joi.string().required(),
   defaultContact: Joi.string().regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
};

const webexDeviceReadSchema = {
   _id: Joi.string().max(24),
   name: Joi.string().regex(/^SPL1-26-/)
};

const webexTeamsMessageSchema = Joi.object().keys({
   email: Joi.array().items(Joi.string().regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).required()).single(),
   message: Joi.string().min(4).required(),
   file: Joi.binary(),
   fileName: Joi.string().regex(/\.(jpg|jpeg|bmp|gif|png|doc|docx|ppt|pptx|pdf)$/i),
   token: Joi.string().min(64).max(64)
}).with('file', 'fileName');

const emailMessageSchema = {
   email: Joi.array().items(Joi.string().regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).required()).single(),
   subject: Joi.string().min(10).required(),
   message: Joi.string().min(10).required()
};

const smsMessageSchema = {
   phone: Joi.string().min(10).required(),
   message: Joi.string().min(10).required()
};

const digitalSignageCreateUpdateSchema = {
   _id: Joi.string().max(24),
   name: Joi.string().regex(/^SPL1-26-/).required(),
   model: Joi.string().required(),
   ip: Joi.string().regex(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/).required(),  //(/^((0|1\\d?\\d?|2[0-4]?\\d?|25[0-5]?|[3-9]\\d?)\\.){3}(0|1\\d?\\d?|2[0-4]?\\d?|25[0-5]?|[3-9]\\d?)$/).required(),
   username: Joi.string().required(),
   password: Joi.string().required(),
   defaultContent: Joi.string()
};

const digitalSignageReadSchema = {
   _id: Joi.string().max(24),
   name: Joi.string().regex(/^SPL1-26-/),
   content: Joi.string()
};

//##########   Functions   ##########

//##########   Contacts    ##########

function contactParams(params, command) {

   return new Promise ((resolve, reject) => {

      switch (command) {
   
         case "CREATE":
            Joi.validate(params, contactCreateUpdateSchema, { abortEarly: false }, (err, data) => { 
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            } );
   
         case "UPDATE":
            Joi.validate(params, contactCreateUpdateSchema, { abortEarly: false }, (err, data) => { 
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            } );
   
         case "READ":
            Joi.validate(params, contactReadSchema, { abortEarly: false }, (err, data) => { 
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
      }
   });
}

//##########   Rooms   ##########

function roomParams(params, command) {

   return new Promise((resolve, reject) => {

      switch (command) {

         case "CREATE":
            Joi.validate(params, roomCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "UPDATE":
            Joi.validate(params, roomCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "READ":
            Joi.validate(params, roomReadSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
      }
   });
}

//########## Meetings  ##########

function meetingParams(params, command) {

   return new Promise((resolve, reject) => {

      switch (command) {

         case "CREATE":
            Joi.validate(params, meetingCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "UPDATE":
            Joi.validate(params, meetingCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "READ":
            Joi.validate(params, meetingReadSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
      }
   });
}

//##########  Network  ##########
//##########  Access   ##########

function networkAccessParams(params, command) {

   return new Promise((resolve, reject) => {

      switch (command) {

         case "CREATE":
            Joi.validate(params, networkAccessCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "UPDATE":
            Joi.validate(params, networkAccessCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "READ":
            Joi.validate(params, networkAccessReadSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
      }
   });
}

//########## Checkins  ##########

function checkinParams(params, command) {

   return new Promise ((resolve, reject) => {
   
      switch (command) {
   
         case "CREATE":
            Joi.validate(params, checkinCreateUpdateSchema, { abortEarly: false }, (err, data) => { 
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
   
         case "UPDATE":
            Joi.validate(params, checkinCreateUpdateSchema, { abortEarly: false }, (err, data) => { 
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
   
         case "READ":
            Joi.validate(params, checkinReadSchema, { abortEarly: false }, (err, data) => { 
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
      }
   });
}

//##########Notify Checkin ##########

function notifyCheckinParams(params) {

   return new Promise((resolve, reject) => {

      Joi.validate(params, checkinReadSchema, { abortEarly: false }, (err, data) => {
         if (err) reject(simplifyErrorMessage(err));
         else resolve(data);
      });
   });
}

//##########  Webex Teams  ##########

function webexTeamsParams(params) {

   return new Promise((resolve, reject) => {

      Joi.validate(params, webexTeamsMessageSchema, { abortEarly: false }, (err, data) => {
         if (err) reject(simplifyErrorMessage(err));
         else resolve(data);
      });
   });
}

//##########     Email     ##########

function emailParams(params) {

   return new Promise((resolve, reject) => {

      Joi.validate(params, emailMessageSchema, { abortEarly: false }, (err, data) => {
         if (err) reject(simplifyErrorMessage(err));
         else resolve(data);
      });
   });
}

//##########      SMS      ##########

function smsParams(params) {

   return new Promise((resolve, reject) => {

      Joi.validate(params, smsMessageSchema, { abortEarly: false }, (err, data) => {
         if (err) reject(simplifyErrorMessage(err));
         else resolve(data);
      });
   });
}

//########## Webex Devices ##########

function webexDeviceParams(params, command) {

   return new Promise((resolve, reject) => {

      switch (command) {

         case "CREATE":
            Joi.validate(params, webexDeviceCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "UPDATE":
            Joi.validate(params, webexDeviceCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "READ":
            Joi.validate(params, webexDeviceReadSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "CALL":
            Joi.validate(params, webexDeviceReadSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
      }
   });
}

//##########  Dig Signage  ##########

function digitalSignageParams(params, command) {
   
   return new Promise((resolve, reject) => {
      
      switch (command) {
         
         case "CREATE":
            Joi.validate(params, digitalSignageCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
         
         case "UPDATE":
            Joi.validate(params, digitalSignageCreateUpdateSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
         
         case "READ":
            Joi.validate(params, digitalSignageReadSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });

         case "CONTENT":
            Joi.validate(params, digitalSignageReadSchema, { abortEarly: false }, (err, data) => {
               if (err) reject(simplifyErrorMessage(err));
               else resolve(data);
            });
      }
   });
}

//########## Aux Functions ##########

// Returns only the text messages included in Joi's responses

function simplifyErrorMessage(message) {
   let vErrorMessage = "";
   for (let index = 0; index < message.details.length; index++) vErrorMessage += `${index + 1}: ${message.details[index].message}  \n`;
   return (vErrorMessage);
}

//##########    Exports    ##########

module.exports.contactParams = contactParams;
module.exports.roomParams = roomParams;
module.exports.meetingParams = meetingParams;
module.exports.networkAccessParams = networkAccessParams;
module.exports.checkinParams = checkinParams;
module.exports.notifyCheckinParams = notifyCheckinParams;
module.exports.webexTeamsParams = webexTeamsParams;
module.exports.emailParams = emailParams;
module.exports.smsParams = smsParams;
module.exports.webexDeviceParams = webexDeviceParams;
module.exports.digitalSignageParams = digitalSignageParams;

/*
########## Params Model  ##########

##########  Webex Teams  ##########

params = {
   email: ['email1', 'email2, 'email4', .... ], //Required: Type: String - Single or Array of Strings
   message: '**Mensagem** _teste_ 2', //Required: Type: String - Contains the message to be displayed with or without markdown
   file: file, //Optional: Type: Buffer
   fileName: 'file.jpg', //Required: Type: String - mandatory if file parameter is used
   token: 'NGIyNTIzMWYtYzMxZi00Y2JkLTlkMjMtZDQxNzYxOTZjZDdkOTkwOGZmMGItODc1' //Optional: Type: String - Use your account or your BOT to send message
}

##########   Contacts    ##########

params = {
      firstName: 'Name' //Required: Type: String
      lastName: 'lastName' //Required: Type: String
      email: 'email1', //Required: Type: String - requires full e-mail,
      phone: //Required: Type: String - Minimum: 10 - Requires DDD and number,
      contactType: //Required: Type: Number - 1 = Cisco Employee, 2 = Customer, 3 = Partner,
      isActive: Joi.boolean()
   };

*/

//##########  Test Module  ##########

/*
const fs = require('fs');
const file = fs.readFileSync(__dirname + '/file.jpg');

let params = {
   email: ['ffurlan@cisco.com', 'fabiano.furlan@gmail.com', 'slimasil@cisco.com'],
   message: '**Mensagem** _teste_ 2',
   file: "teste",
   fileName: 'file.jpg',
   token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
}

validateTeamsMessageParams(params, (err, data) => {
   if (err) {
      console.log(err);
   } else {
      console.log(data);
   }
});  
*/
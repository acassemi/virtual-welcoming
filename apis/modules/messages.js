/*
Module developed by:
  ______    _     _                     ______          _
 |  ____|  | |   (_)                   |  ____|        | |
 | |__ __ _| |__  _  __ _ _ __   ___   | |__ _   _ _ __| | __ _ _ __
 |  __/ _` | '_ \| |/ _` | '_ \ / _ \  |  __| | | | '__| |/ _` | '_ \
 | | | (_| | |_) | | (_| | | | | (_) | | |  | |_| | |  | | (_| | | | |
 |_|  \__,_|_.__/|_|\__,_|_| |_|\___/  |_|   \__,_|_|  |_|\__,_|_| |_|
 
 * Messaging format functions for DigitalWelcome project
*/

/* jshint esversion: 6 */

//##########  Decoration   ##########

//##########   Markdown    ##########

const mMARKS = '> ✅ ';
const mStrong = '**';
const mItalic = '_';
const mUList = '- ';
const mLE = '  \n';

//##########    E-mail     ##########

const hHTMLS = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Check-in efetuado com sucesso</title></head>';
const hHTMLE = '</body></html>';

const hBColor = '<body style="background-color:#EEEEEE">';

const hFGreen = '<font color="MEDIUMSEAGREEN">';
const hFBlue = '<font color="STEELBLUE">';
const hFontE = '</font>';

const hItalicS = '<i>';
const hItalicE = '</i>';

const hStrongS = '<strong>';
const hStrongE = '</strong>';

const hParagS = '<p>';
const hParagE = '</p>';

const hLE = '<br>';

const hHeadS = '<h1>';
const hHeadE = '</h1>';

//##########      SMS      ##########

const sMARKS = '✅ ';
const sLE = '\n';

//##########   Functions   ##########

//##########     Host      ##########

function teamsCheckinMessageHost(params) {

   let vMessage = `${mMARKS}Digital Welcome Check-in${mLE}${mLE}`;
   vMessage += `Olá, gostaria de informar que seu contato acabou de chegar no escritório:${mLE}${mLE}`;
   vMessage += `Nome: ${mStrong}${params.name.firstName} ${params.name.lastName}${mStrong}${mLE}`;
   vMessage += `Email: ${mStrong}${params.email}${mStrong}${mLE}`;
   if (params.phone !=="") vMessage += `Telefone: ${mStrong}${params.phone}${mStrong}${mLE}`;
   
   return (vMessage);
}

function emailCheckinMessageHost(params) {

   let vMessage = `${hHTMLS}${hBColor}${hHeadS}${hFGreen}Digital Welcome${hFontE}${hHeadE}`;
   vMessage += `${hParagS}Olá, gostaria de informar que seu contato acabou de chegar no escritório:${hParagE}`;
   vMessage += `${hParagS}Nome: ${hStrongS}${params.name.firstName} ${params.name.lastName}${hStrongE}${hParagE}`;
   vMessage += `${hParagS}Email: ${hStrongS}${params.email}${hStrongE}${hParagE}`;
   if (params.phone !== "") vMessage += `${hParagS}Telefone: ${hStrongS}+55${params.phone}${hStrongE}${hParagE}`;

   return(vMessage);
}

function smsCheckinMessageHost(params) {

   let vMessage = `${sMARKS}Digital Welcome${sLE}${sLE}`;
   vMessage += `Olá, gostaria de informar que seu contato acabou de chegar no escritório:${sLE}`;
   vMessage += `Nome: ${params.name.firstName} ${params.name.lastName}${sLE}`;
   vMessage += `Email: ${params.email}${sLE}`;
   if (params.phone !== "") vMessage += `Telefone: ${params.phone}${sLE}`;

   return(vMessage);
}

//##########    Visitor    ##########

function teamsCheckinMessageVisitor(params) {

   let vMessage = `${mMARKS}Digital Welcome Check-in${mLE}${mLE}`;
   vMessage += `Olá, seu checkin foi confirmado com sucesso e seu contato já foi notificado de sua chegada.${mLE}${mLE}`;
   vMessage += `Nome: ${mStrong}${params.name.firstName} ${params.name.lastName}${mStrong}${mLE}`;
   vMessage += `Email: ${mStrong}${params.email}${mStrong}${mLE}${mLE}`;
   vMessage += `Muito obrigado por utilizar os serviços de Checkin do Digital Welcome.${mLE}${mLE}`;

   return (vMessage);
}

function emailCheckinMessageVisitor(params) {

   let vMessage = `${hHTMLS}${hBColor}${hHeadS}${hFGreen}Digital Welcome${hFontE}${hHeadE}`;
   vMessage += `${hParagS}Olá, seu checkin foi confirmado com sucesso e seu contato já foi notificado de sua chegada.${hParagE}`;
   vMessage += `${hParagS}Nome: ${hStrongS}${params.name.firstName} ${params.name.lastName}${hStrongE}${hParagE}`;
   vMessage += `${hParagS}Email: ${hStrongS}${params.email}${hStrongE}${hParagE}${hLE}`;
   vMessage += `${hParagS}Muito obrigado por utilizar os serviços de Checkin do Digital Welcome.${hParagE}${hLE}`;

   return (vMessage);
}

function smsCheckinMessageVisitor(params) {

   let vMessage = `${sMARKS}Digital Welcome${sLE}${sLE}`;
   vMessage += `Olá, seu checkin foi confirmado com sucesso e seu contato já foi notificado de sua chegada.${sLE}`;
   vMessage += `Nome: ${params.name.firstName} ${params.name.lastName}${sLE}`;
   vMessage += `Email: ${params.email}${sLE}`;
   vMessage += `Muito obrigado por utilizar os serviços de Checkin do Digital Welcome${sLE}${sLE}`;

   return (vMessage);
}

//##########    Visitor    ##########

function teamsNetworkAccess(params) {

   let vMessage = `${mStrong}Suas informações de acesso à rede Wi-Fi:${mStrong}${mLE}${mLE}`;
   vMessage += `SSID: ${mStrong}internet${mStrong}${mLE}`;
   vMessage += `Username: ${mStrong}${params.username}${mStrong}${mLE}`;
   vMessage += `Password: ${mStrong}${params.password}${mStrong}${mLE}${mLE}`;

   return (vMessage);
}

function emailNetworkAccess(params) {

   let vMessage = `${hParagS}${hStrongS}Suas informações de acesso à rede Wi-Fi:${hStrongE}${hParagE}`;
   vMessage += `${hParagS}SSID: ${hStrongS}internet${hStrongE}${hParagE}`;
   vMessage += `${hParagS}Username: ${hStrongS}${params.username}${hStrongE}${hParagE}`;
   vMessage += `${hParagS}Password: ${hStrongS}${params.password}${hStrongE}${hParagE}${hLE}`;

   return (vMessage);
}

function smsNetworkAccess(params) {

   let vMessage = `Suas informações de acesso à rede Wi-Fi:${sLE}${sLE}`;
   vMessage += `SSID: internet${sLE}`;
   vMessage += `Username: ${params.username}${sLE}`;
   vMessage += `Password: ${params.password}${sLE}`;

   return (vMessage);
}


//##########    Exports    ##########

module.exports.teamsCheckinMessageHost = teamsCheckinMessageHost;
module.exports.emailCheckinMessageHost = emailCheckinMessageHost;
module.exports.smsCheckinMessageHost = smsCheckinMessageHost;
module.exports.teamsCheckinMessageVisitor = teamsCheckinMessageVisitor;
module.exports.emailCheckinMessageVisitor = emailCheckinMessageVisitor;
module.exports.smsCheckinMessageVisitor = smsCheckinMessageVisitor;
module.exports.teamsNetworkAccess = teamsNetworkAccess;
module.exports.emailNetworkAccess = emailNetworkAccess;
module.exports.smsNetworkAccess = smsNetworkAccess;
# virtual-welcoming

ASIC - Digitization of the office reception process


## Business/Technical Challenge

Business Challenges:
Think about your last external meeting experience as a visitor. Sometimes you have to wait in a line to talk to a receptionist to identify yourself, usually it's not easy to find the person you are going to meet, after you are registered you don't know the facility, where are the restrooms, how to get to your meeting room. And finally, when everything is done and you are in the meeting room, the visited person is there with you and suddenly you need to do a dCloud demo using their Wi-Fi internet access. For that you will start another process to get the Guest Internet credentials, filling adicional forms. It's simply a mess, very inefficient for you as a visitor and for the host company, that isn't giving a good experience for his customers and guests.

Technical Challenges:
The main challenge today is that the multiple systems that are used during the visitor journey are independent, not integrated or automated. Leaving all the complexity to the receptionist.

## Proposed Solution

Our solution will easy your experience as a visitor when on site, covering all the steps since when you walk in to the company lobby, until when you leave. Find who you will meet with, contact this person, display and guide you to where this meeting is going to be and automatically provide you the guest internet access.

### Cisco Products Technologies/ Services

Our solution will levegerage the following Cisco technologies

* [Webex Teams](http://cisco.com/go/webexteams)
* [Identity Services Engine](http://cisco.com/go/ise)
* [Cisco Vision](https://www.cisco.com/c/en/us/products/video/stadiumvision/index.html)

## Team Members

* Andrey Cassemiro <acassemi@cisco.com> - Enterprise
* Fabiano Furlan <ffurlan@cisco.com> - Commercial
* Leonardo Estrela <lestrela@cisco.com> - GVE
* Flavio Correa <flcorrea@cisco.com> - Brazil

## Solution Components

<!-- This does not need to be completed during the initial submission phase

Provide a brief overview of the components involved with this project. e.g Python -->

The solution developed encompass a javascript based backend, flask/python web frontend and a MongoDB database.

The backend has Database APIs and Commands APIs. These APIs were written to provide a more structured way to other components interact with the database and the services responsible to interact with the visitor and the host.

The Database APIs are Contacts, Rooms, Meetings, Checkings, WebexDevices and DigitalSignage.
The Commands APIs are Checkin, Teams, Email, SMS, SignageContent, CallConnect and NetworkAccess.
The ./docs/DW-API Guide.md and ./docs/DW-DataSchema.pdf files contain detailed information about these APIs.

The interaction of the web frontend with the backend uses the APIs, as well as the backend interaction with Cisco Webex Teams, Cisco Identity Services Engine and Cisco Vision / Digital Media Player (DMP) uses the respective APIs of these products.

## Experience

<!-- Brief explain of the experience. -->

The interaction with the visitor is first done via the web frontend using a device in the front-desk, where it's basic information is provided: name, email and phone number. This data is sent to the database using the backend APIs to get information about the meeting that this person is there for, the host of the meeting and the room reserved for the meeting.

At this point the host is notified of the checkin of the visitor using Webex Teams, Email and SMS. The idea is to get the host notified, tell him where the visitor is and provide ways from him to easily interact with the visitor if needed. For instance we provided a formatted email with the user phone so the host can just click in the phone number and get connected with the user.

At the same time, we provide to the visitor, using the Digital Signage, the information about the room where the meeting will happen and how to get there via an animated map. If no rooms are assigned to this meeting, the user is pointed to a waiting room or cafeteria, to wait for the host in a more comfortable place.

As part of the experience an automated user and password to access the Guest WiFi network is generated and the visitor is notified about them and how to use it. The user don't need to provide any other information, since we are using the information from it's checkin.



## Usage

<!-- This does not need to be completed during the initial submission phase

Provide a brief overview of how to use the solution  -->

To use the solution we will have to setup the following components:

1) run on your server httpd, flask and node.js with all the modules required
2) setup an account on Webex Teams
3) setup a Cisco Identity Services Engine for guest access and enable API services
4) setup a Cisco DMP 4310
5) setup an email account and SMS account (we've used the Twillio free tier account for tests) o if you want to receive email and SMS notifications.


## Installation

How to install or setup the project for use.

* Server setup

Clone the repository
Install httpd
Install node.js
Install flask
Install MongoDB
Install the required modules for node and MongoDB
Start the backend (start.sh)
Start the frontend (run.sh)

* ISE Installation
First setup your ISE to allow the creation of guest users via API.

Follow the Getting Started provided by the link below to enable the REST APIs and create the ers-admin user to get the portal id and the sponsor-api user that will be used to create your guest users.
https://community.cisco.com/t5/security-documents/ise-guest-sponsor-api-tips-amp-tricks/ta-p/3636773#toc-hId-1174198255

Also your ISE will be interacting with a WiFi infrastructure that can be from Cisco or other vendors.
Here you have some guides to help you setup the ISE for what is called Sponsored Guest Access. This is very important since this is the flow that allows the guest account to be created for the user using the checkin data collected
Config Guide if using Aironet WiFi infrastructure:
https://community.cisco.com/kxiwq67737/attachments/kxiwq67737/4561-docs-security/5203/1/How-To_93_ISE_20_Wireless_Guest_Setup_Guide.pdf

<!--
Config Guide if you are using Meraki WiFi infrastructure:
https://documentation.meraki.com/MR/Encryption_and_Authentication/Central_Web_Authentication_(CWA)_with_Cisco_ISE  
-->

* DMP setup

In this setup we are using a DMP4310. You can interact directly with the player.
Take a note of the ip address of the DMP. It will appear during initialization in the output monitor.
Place the videos make to show the path from the checkin location to each of the rooms inside the DMP.

## Documentation

Pointer to reference documentation for this project.

./docs/DW-API Guide.md
./docs/DW-DataSchema.pdf

## License

Provided under Cisco Sample Code License, for details see [LICENSE](./LICENSE.md)

## Code of Conduct

Our code of conduct is available [here](./CODE_OF_CONDUCT.md)

## Contributing

See our contributing guidelines [here](./CONTRIBUTING.md)


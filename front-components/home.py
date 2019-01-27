from flask import Flask, render_template, url_for, flash, redirect, session, request, jsonify
from forms import RegistrationForm, CallHost
from twilio.rest import Client
import requests, json, smtplib

account_sid = {YOUR-SID-PASSWORD}
auth_token = {YOUR-AUTH-TOKEN}
client = Client(account_sid, auth_token)
apiaddr={API-ADDRESS:PORT}


app = Flask(__name__)
app.config['SECRET_KEY'] = {APP-CONFIG-SECRET-KEY}
app.secret_key = {APP-SECRET-KEY}

@app.route("/", methods=['GET', 'POST'])
def home():
    form = RegistrationForm()
    if form.validate_on_submit():
        headers = {'content-type': 'application/json'}
        url = apiaddr + "/api/v1/contacts"
        jsonbody = {
             "firstName":form.firstname.data,
             "lastName":form.lastname.data,
             "email":form.email.data,
             "phone":form.phone.data,
             "type": 2}
        response = requests.request("POST", url, headers=headers, json=jsonbody)
        session['firstname'] = form.firstname.data
        session['lastname'] = form.lastname.data
        parseuser = response.json()
        session['_guestid'] = parseuser['_id']
        return redirect(url_for('host'))
    return render_template('home.html', title='Welcome', form=form)

@app.route('/host',  methods=['GET', 'POST'])
def host():
    form = CallHost()
    if form.validate_on_submit():
        session['namehost'] = form.host.data
        return redirect(url_for('notify'))
    return render_template('host.html', title='Host', form=form)

@app.route('/notify')
def notify():
        headers = {'content-type': 'application/json'}
        urlhost = apiaddr + "/api/v1/contacts"
        jsonbodyhost = {
                        "email":session['namehost'],
                        "type":1
                    }
        responsehost = requests.request("GET", urlhost, headers=headers, json=jsonbodyhost)
        parsehost = responsehost.json()
        session['_hostid'] = parsehost[0]['_id']
        url = apiaddr + "/api/v1/checkins"
        jsonbody = {
                "visitorId": session['_guestid'],
                "hostId": session['_hostid']
                }
        responsecheckin = requests.request("POST", url, headers=headers, json=jsonbody)
        parsecheckin = responsecheckin.json()
        session['_checkinid'] = parsecheckin['_id']
        urlnofitycheckin = apiaddr + "/api/v1/notify/checkin/" + session['_checkinid']
        notifycheckin = requests.request("POST", urlnofitycheckin, headers=headers)
        return render_template('notify.html', namehost=session['namehost'], firstname=session['firstname'], lastname=session['lastname'])
@app.route('/about')
def about():
    return render_template('about.html')


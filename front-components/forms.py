from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo


class RegistrationForm(FlaskForm):
    firstname = StringField('Firs Name',
                           validators=[DataRequired(), Length(min=2, max=20)], render_kw={"placeholder": "Your first name"})
    lastname = StringField('Last Name',
                           validators=[DataRequired(), Length(min=2, max=20)], render_kw={"placeholder": "Your last name"})
    email = StringField('Email',
                        validators=[DataRequired(), Email()], render_kw={"placeholder": "example@example.com"})
    phone = StringField('Phone',
    					validators=[DataRequired(), Length(min=10, max=11)], render_kw={"placeholder": "DDD + Number"})
    submit = SubmitField('Next')

class CallHost(FlaskForm):
	host = StringField('Email',
                        validators=[DataRequired(), Length(min=2)], render_kw={"placeholder": "Host email"})
	submit = SubmitField('CallHost')

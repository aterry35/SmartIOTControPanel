from sense_hat import SenseHat
import paho.mqtt.client as mqtt
import logging
from random import randint
from flask import Flask, render_template
from flask_ask import Ask, statement, question, session

sense = SenseHat()

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
	print("Connected with result code "+str(rc))

app = Flask(__name__)

ask = Ask(app, "/")

logging.getLogger("flask_ask").setLevel(logging.DEBUG)


@ask.launch

def smartcontroller_launch():

    welcome_msg = render_template('welcome')

    return question(welcome_msg)

@ask.intent("lightintent",mapping={'status': 'status'})

def smartcontroller_light(status):

    if status=='on':
        sense.show_message("ON")
	response_msg = render_template('yesvalue')
	return statement(response_msg)
    elif status=='off':
	sense.show_message("OFF")
	response_msg = render_template('novalue')
	return statement(response_msg)
    else:
	sense.show_message("ELSE")
	response_msg = render_template('wrongvalue')
	return statement(response_msg)

@ask.intent("sensorintent",mapping={'status': 'status'})

def smartcontroller_sensors(status):

    if status=='get':
        client = mqtt.Client(transport="websockets")
	client.on_connect = on_connect
	client.connect("iot.agnelterry.me", 9001, 60)
	client.publish("sensorpage","sensors",qos=0,retain=False)
	client.disconnect()
	Sensor_response_msg = render_template('openvalue')
	return statement(Sensor_response_msg)
    else:
	Sensor_response_msg = render_template('wrongvalue')
	return statement(Sensor_response_msg)

@ask.intent("cameraintent",mapping={'status': 'status'})

def smartcontroller_camera(status):

    if status=='show':
        client = mqtt.Client(transport="websockets")
	client.on_connect = on_connect
	client.connect("iot.agnelterry.me", 9001, 60)
	client.publish("camerapage","camera",qos=0,retain=False)
	client.disconnect()
	Sensor_response_msg = render_template('showvalue')
	return statement(Sensor_response_msg)
    else:
	Sensor_response_msg = render_template('wrongvalue')
	return statement(Sensor_response_msg)



if __name__ == '__main__':

    app.run(debug=True)

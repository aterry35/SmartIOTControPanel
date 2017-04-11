from sense_hat import SenseHat
import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import json, time
import thread
import threading

sense = SenseHat()
sense.clear()
# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.

def readdata():
	threading.Timer(0.5, readdata).start()
    	client = mqtt.Client(transport="websockets")
	client.on_connect = on_connect
	client.connect("Enter the Broker Address", 9001, 60)
	time.sleep(0.5)
	humidity = sense.get_humidity()
	humidity = round(humidity, 1)
	client.publish("5282humid",humidity,qos=0,retain=False)
	time.sleep(0.5)
  	temp = sense.get_temperature()
	temp = round(temp, 1)
	client.publish("5282temp",temp,qos=0,retain=False) 
	time.sleep(0.5)
	p = sense.get_temperature_from_pressure()
	p = round(p, 1)
	client.publish("pressure",p,qos=0,retain=False)
        time.sleep(0.5)
	sense.clear()
	client.disconnect()
		



readdata()

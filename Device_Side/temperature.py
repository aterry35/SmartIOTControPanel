import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import json, time
import thread
import threading
import Adafruit_DHT



# Example using a Raspberry Pi with DHT sensor
# connected to GPIO23.
pin = 23


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.

def readtemp():
	threading.Timer(0.5, readtemp).start()
    	client = mqtt.Client(transport="websockets")
	client.on_connect = on_connect
	client.connect("ENTER YOUR IOT BROKER ADDRESS", 9001, 60)
	time.sleep(0.5)
  	sensor = Adafruit_DHT.DHT22
	humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

	Temp='{0:0.1f}'.format(temperature)
			
    	if humidity is not None and temperature is not None:
		client.publish("5282temp",Temp,qos=0,retain=False)
	else:
		client.publish("5282temp","none",qos=0,retain=False)
		   
       
	client.disconnect()
		



readtemp()







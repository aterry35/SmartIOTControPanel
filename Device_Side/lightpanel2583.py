import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import json, time
import thread

# -------------- #
# Board settings #
# -------------- #
RedPin = 31
GreenPin =29
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)  # use P1 header pin numbering convention
GPIO.cleanup()            # clean up resources
GPIO.setup(GreenPin, GPIO.OUT)   # led pin setup
GPIO.setup(RedPin, GPIO.OUT)   # button pin setup
# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    GPIO.output(RedPin,GPIO.HIGH)	
    client.subscribe("light2583")
    
        

def on_message(client, userdata, msg):
    payload = str(msg.payload)
    topic = str(msg.topic)
    print(msg.topic + " Payload is " + payload)
    if payload == 'off':
     GPIO.output(RedPin,GPIO.HIGH)
    elif payload == "on":
     GPIO.output(RedPin, GPIO.LOW)
    else:
     print("WRONG MESSAGE")
    
      

client = mqtt.Client(transport="websockets")
client.on_connect = on_connect
client.on_message = on_message

client.connect("ENTER YOUR IOT BROKER ADDRESS", 9001, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()

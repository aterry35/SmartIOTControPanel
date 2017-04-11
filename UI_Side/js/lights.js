    //Using the HiveMQ public Broker, with a random client Id
         var client = new Messaging.Client("Enter your IOT Broker address", 9001, "myclientid_" + parseInt(Math.random() * 100, 10));


           //Gets  called if the websocket/mqtt connection gets disconnected for any reason
         client.onConnectionLost = function (responseObject) {
         //Depending on your scenario you could implement a reconnect logic here
         alert("connection lost: " + responseObject.errorMessage);
         };
         
    //Gets called whenever you receive a message for your subscriptions
 client.onMessageArrived = function (message) {
      //Do something with the push message you received
    // $('#messages').append( message.destinationName + '  | ' + message.payloadString + '</span><br/>');
            //var s = document.getElementById('livingroomtemp');
            //s.value = "100 C";
           // alert("message recived: " + message.payloadString); 
            if(message.destinationName=="light2582")
            {
             if (message.payloadString=="off")
              {
                document.getElementById('myImage').src='images/pic_bulboff.gif'
                document.getElementById('switch').src='images/off.png'
              }
              else if(message.payloadString=="on"){
                  
                   document.getElementById('myImage').src='images/pic_bulbon.gif'
                 document.getElementById('switch').src='images/on.png'
              }
             
            }
            else
            {
              // alert("message recived: " + message.payloadString); 
            }
        
            
            
            
      };
      
  
 //Connect Options
 var options = {
     timeout: 3,
     //Gets Called if the connection has sucessfully been established
     onSuccess: function () {
         document.getElementById("status").style.backgroundColor = "green";
         //alert("Connected");
          client.subscribe('light2582');
    client.subscribe('light2583');
     },
     //Gets Called if the connection could not be established
     onFailure: function (message) {
         alert("Connection failed: " + message.errorMessage);
          document.getElementById("status").style.backgroundColor = "red";
     }
 };
 //Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
 var publish_on = function () {
        var img = document.getElementById('switch').src
     
      if (img == "http://agnelterry.me/sicpanel/images/off.png") 
        {
         // document.getElementById('myImage').src='images/pic_bulbon.gif'
         // document.getElementById('switch').src='images/on.png'
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
     var message = new Messaging.Message("on");
     message.destinationName = "light2582";
      client.send(message);
            
        }
        else
        {
     // document.getElementById('myImage').src='images/pic_bulboff.gif'
     // document.getElementById('switch').src='images/off.png'
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
     var message = new Messaging.Message("off");
     message.destinationName = "light2582";
     client.send(message); 
        }
      
    
 }
 
   //Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
 var publish2_on = function () {
  var img = document.getElementById('switch2').src
     
      if (img == "http://agnelterry.me/sicpanel/images/off.png") 
        {
          document.getElementById('myImage2').src='images/pic_bulbon.gif'
          document.getElementById('switch2').src='images/on.png'
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
     var message = new Messaging.Message("on");
     message.destinationName = "light2583";
      client.send(message);
            
        }
        else
        {
      document.getElementById('myImage2').src='images/pic_bulboff.gif'
      document.getElementById('switch2').src='images/off.png'
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
     var message = new Messaging.Message("off");
     message.destinationName = "light2583";
     client.send(message); 
        }
      
     
 }
    var  ConnectServer = function()
 {
    
     client.connect(options);
     
 }
 
    var  disConnectServer = function()
 {
    
    client.disconnect();
     
 }  
   

    
    

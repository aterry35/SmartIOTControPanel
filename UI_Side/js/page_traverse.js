    //Using the HiveMQ public Broker, with a random client Id
       var temp_data;
       var humid_data;
       var pressure_data;
       
         var client = new Messaging.Client("iot.agnelterry.me", 9001, "myclientid_" + parseInt(Math.random() * 100, 10));


           //Gets  called if the websocket/mqtt connection gets disconnected for any reason
         client.onConnectionLost = function (responseObject) {
         //Depending on your scenario you could implement a reconnect logic here
         alert("connection lost: " + responseObject.errorMessage);
         };
         
    //Gets called whenever you receive a message for your subscriptions
 client.onMessageArrived = function (message) {
      //Do something with the push message you received
    // $('#messages').append( message.destinationName + '  | ' + message.payloadString + '</span><br/>');
    
          if(message.destinationName=="sensorpage")
            {
               location.href = 'Sensors.html';
            }
            else if(message.destinationName=="camerapage")
            {
             location.href = 'camera.html';
            }
            else
            {
                location.href = 'index.html';
               //alert("message recived: " + message.payloadString); 
            }
    
            //var s = document.getElementById('livingroomtemp');
            //s.value = "100 C";
      };
      
  
 //Connect Options
 var options = {
     timeout: 3,
     //Gets Called if the connection has sucessfully been established
     onSuccess: function () {
             // alert("Connected");
          client.subscribe('sensorpage');
    client.subscribe('camerapage');
       },
     //Gets Called if the connection could not be established
     onFailure: function (message) {
         alert("Connection failed: " + message.errorMessage);
     }
 };

var  Page_ConnectServer = function()
 {
    
     client.connect(options);
     
    
 }
 
var  Page_disConnectServer = function()
 {
    
    client.disconnect();
     
 } 
 
 


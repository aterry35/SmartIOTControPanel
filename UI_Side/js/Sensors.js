    //Using the HiveMQ public Broker, with a random client Id
       var temp_data;
       var humid_data;
       var pressure_data;
       
         var client = new Messaging.Client("Enter you IOT broker Address", 9001, "myclientid_" + parseInt(Math.random() * 100, 10));


           //Gets  called if the websocket/mqtt connection gets disconnected for any reason
         client.onConnectionLost = function (responseObject) {
         //Depending on your scenario you could implement a reconnect logic here
         alert("connection lost: " + responseObject.errorMessage);
         };
         
    //Gets called whenever you receive a message for your subscriptions
 client.onMessageArrived = function (message) {
      //Do something with the push message you received
    // $('#messages').append( message.destinationName + '  | ' + message.payloadString + '</span><br/>');
    
          if(message.destinationName=="5282temp")
            {
            document.getElementById('livingroomtemp').innerHTML=message.payloadString
            temp_data=Number(message.payloadString)
            
             
            }
            else if(message.destinationName=="5282humid")
            {
             document.getElementById('livingroomhumidity').innerHTML=message.payloadString   
             humid_data=Number(message.payloadString)
           
             }
            else if(message.destinationName=="pressure")
            {
             document.getElementById('pressuredata').innerHTML=message.payloadString   
             pressure_data=Number(message.payloadString)
             }
          /*  else if(message.destinationName=="Tankstatus")
            {
             document.getElementById('tankstatus').innerHTML=message.payloadString 
             if(message.payloadString=="Not Empty")
             {
                document.getElementById('tank').src='images/halftank.png' 
                
             }
             
            }*/
            
            else
            {
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
         document.getElementById("tempstatus").style.backgroundColor = "green";
         document.getElementById("humidstatus").style.backgroundColor = "green";
      //  document.getElementById("tnkstatus").style.backgroundColor = "green";
         document.getElementById("pressurestatus").style.backgroundColor = "green";
         // alert("Connected");
          client.subscribe('5282temp');
    client.subscribe('5282humid');
   // client.subscribe('Tankstatus');
    client.subscribe('pressure');

     },
     //Gets Called if the connection could not be established
     onFailure: function (message) {
         document.getElementById("tempstatus").style.backgroundColor = "red";
         document.getElementById("humidstatus").style.backgroundColor = "red";
       // document.getElementById("tnkstatus").style.backgroundColor = "red";
         document.getElementById("pressurestatus").style.backgroundColor = "red";
     alert("Connection failed: " + message.errorMessage);
     }
 };

var  ConnectServer = function()
 {
    
     client.connect(options);
     
    
 }
 
var  disConnectServer = function()
 {
    
    client.disconnect();
     
 } 
 
 
var tempChart_update = function()
 {
         $("#gauge1").gauge(temp_data, {color: "#DC7633", unit: "C", font: "100px"});   
 
 }
 
 var humidChart_update = function()
 {
       
 $("#gauge2").gauge(humid_data, {color: "#DC7633", unit: "%", font: "100px"});    

 }
 
 var preasureChart_update = function()
 {
    
  $("#gauge3").gauge(pressure_data, {color: "#DC7633"}); 
 }
 


    

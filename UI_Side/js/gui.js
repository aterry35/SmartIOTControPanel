           //Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
  function ondashboard_click () {
   
  
    location.href = 'index.html';
       }
       
       
  function onhome_click () {
     
    var div_home = document.getElementById('home');
    div_home.style.visibility='visible'; 
    location.href = 'index.html';
      }
      
      
      function Login(){
          
        data = '{ "username":"admin", "password":"7142005156"}';
        var obj = JSON.parse(data);  
        var div_home = document.getElementById('home');
        var done=0;
        var username=document.login.userid.value;
        username=username.toLowerCase();
        var password=document.login.passwordinput.value;
        password=password.toLowerCase();
        if (username==obj.username && password==obj.password) {
      document.getElementById("navhome").children[0].style.display = "none";
      document.getElementById("navhome").children[1].style.display = "";
       location.href = 'mydashboard.html';
            done=1;
            }
            
        if (done==0) { alert("Invalid login!");}
        }
        

         function onhome_load () {
    
    document.getElementById("navhome").children[1].style.display = "none";
      }
//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyAt63uYEauxC1z9o6WhA7NFR3fUrtDFxZM",
      authDomain: "kwitter-22db4.firebaseapp.com",
      databaseURL: "https://kwitter-22db4-default-rtdb.firebaseio.com",
      projectId: "kwitter-22db4",
      storageBucket: "kwitter-22db4.appspot.com",
      messagingSenderId: "275188046333",
      appId: "1:275188046333:web:1a2ce8f80f90875a60e194"
    };
    
    // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
recipe_name = localStorage.getItem("recipe_name");

function send() 
{
   msg = document.getElementById("msg").value;
   
   firebase.database().ref(recipe_name).push({
      name:user_name,
      message:msg,
      like:0
   });

   document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+recipe_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

//Start code
name = message_data['name'];
like = message_data['like'];
message = message_data['message'];

name_tag = "<h4>"+name+"<img src='tick.png' class='user_tick'></h4>";
message_tag = "<h4 class='message_h4'>"+message+"</h4>";
like_tag = "<button class='btn btn-warning' id="+firebase_message_id+" value = "+like+" onclick='updateLike(this.id)'>";
span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+like+"</span></button><hr>";
row = name_tag + message_tag + like_tag + span_tag;

document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id) 
{
      button_id = message_id;
      like = document.getElementById(button_id).value;
      updatedLikes = Number(like) + 1;
      firebase.database().ref(recipe_name).child(message_id).update({
            like : updatedLikes
      });
}

function logOut() 
{
   localStorage.removeItem("user_name");
   localStorage.removeItem("recipe_name");
   window.location = "index.html";  
}
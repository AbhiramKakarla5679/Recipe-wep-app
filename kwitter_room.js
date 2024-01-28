
//ADD YOUR FIREBASE LINKS HERE
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
document.getElementById("user_name").innerHTML = "Welcome " +user_name+"!"

function addRecipe() 
{
      recipe_name_name = document.getElementById("recipe_name").value;
      ingredient_name = document.getElementById("ingredient_name").value;
      method_name = document.getElementById("method_name").value;
      firebase.database().ref("/").child(recipe_name).update({
            purpose:"adding recipe"
      });
      firebase.database().ref("/").child(ingredient_name).update({
            purpose:"adding ingredients"
      });
      firebase.database().ref("/").child(method_name).update({
            purpose:"adding method"
      });
      localStorage.setItem("recipe_name", recipe_name);
      localStorage.setItem("ingredient_name", ingredient_name);
      localStorage.setItem("method_name", method_name);

      window.location = "kwitter_page.html";

}



function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Recipe_names = childKey;
      //Start code
      row = "<div class='recipe_name' id="+Recipe_names+" onclick = 'redirectToRecipeName(this.id)'>"+Recipe_names+"</div> <hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRecipeName(name) 
{
  localStorage.setItem("recipe_name", name);
  window.location = "kwitter_page.html";
}

function logOut() 
{
   localStorage.removeItem("user_name");
   localStorage.removeItem("recipe_name");
   window.location = "index.html";  
}
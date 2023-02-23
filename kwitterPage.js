const firebaseConfig = {
      apiKey: "AIzaSyDjTQJ7sA0NJfM922AUTXrTv531I2AXM3I",
      authDomain: "bate-papo-91025.firebaseapp.com",
      databaseURL: "https://bate-papo-91025-default-rtdb.firebaseio.com",
      projectId: "bate-papo-91025",
      storageBucket: "bate-papo-91025.appspot.com",
      messagingSenderId: "363915791621",
      appId: "1:363915791621:web:248279b645cc39c99bbb6c"
    };
    
  firebase.initializeApp(firebaseConfig);

 var userName = localStorage.getItem("userName")

 var roomName = localStorage.getItem("roomName")

 function send()
{
 msg = document.getElementById("msg").value;

 firebase.database().ref(roomName).push({
      name:userName,
      message:msg,
      like4:0
 });

document.getElementById("msg").value="";
}
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;

       console.log(messageData);

       name = messageData ['name']
       message = messageData ['message']
       like = messageData ['like4']

       nameWithTag = "<h4> "+name +"<img class='user_tick' src='tick.png'></h4>";

       messageWithTag = "<h4 class='message_h4'>" + message + "</h4>"

       like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";

       spanWithTag ="<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

      row = nameWithTag + messageWithTag + like_button + spanWithTag;

      document.getElementById("output").innerHTML += row;

      } });  }); }
getData();



function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}


function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(roomName).child(message_id).update({
		like4 : updated_likes  
	 });

}

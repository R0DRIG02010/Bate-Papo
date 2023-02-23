
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

userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = "Bem-vindo(a)" + userName + "!";


function addRoom ()

{
  roomName= document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome de sala"
  })

    localStorage.setItem("roomName", roomName);

    window.location ="KwitterPage.html";

}


function getData() {  firebase.database().ref("/").on('value', function(snapshot) 
                { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
                    { childKey  = childSnapshot.key;
       roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}
       


getData();

function redirectToRoomName(name)
{
    console.log(name); localStorage.setItem("roomName", name); window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}

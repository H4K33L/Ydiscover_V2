import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

var purpleWords = 0;
var yelowWords = 0;

let role = document.cookie
  .split("; ")
  .find((row) => row.startsWith("role="))
  ?.split("=")[1];

window.socket = io();
const roomID = document.cookie
  .split("; ")
  .find((row) => row.startsWith("roomID="))
  ?.split("=")[1];
socket.emit("room", roomID);

if (role === 'purpleMaster') {
  document.body.style.backgroundColor = '#3B3486';
  socket.emit('requestWords', "")
} else if (role === 'yelowMaster') {
  document.body.style.backgroundColor = '#F8E559';
  socket.emit('requestWords', "")
} else {
  socket.disconnect();
  document.location.href="/";
};
document.getElementById("role").textContent = role;

socket.on('deco', () => {
  socket.disconnect();
  document.location.href="/";
});

socket.on('requestRole', () => {
  socket.emit("role", role);
  purpleWords = 0;
  yelowWords = 0;
});

socket.on("updateWord", (word)=> {
  // update word information on game page
  document.getElementById(word.ID).textContent = word.word;
  document.getElementById(word.ID).style.backgroundColor = word.color;
  if (word.reaveled === true) {
    //document.getElementById(word.ID).style.backgroundImage = '/images/'+word.color+'.png'
    document.getElementById(word.ID).textContent = 'X';
    if (word.color === '#3B3486') {
      purpleWords--;
      document.getElementById('purpleScore').textContent = purpleWords;
    } else if (word.color === '#F8E559') {
      yelowWords--;
      document.getElementById('yelowScore').textContent = yelowWords;
    }
  } else {
    if (word.color === '#3B3486') {
      purpleWords++;
      document.getElementById('purpleScore').textContent = purpleWords;
    } else if (word.color === '#F8E559') {
      yelowWords++;
      document.getElementById('yelowScore').textContent = yelowWords;
    }
  };
  if (word.color !== 'white') {
    document.getElementById(word.ID).style.color = 'white';
    document.getElementById(word.ID).style.borderColor = 'white';
  } else {
    document.getElementById(word.ID).style.color = 'black';
    document.getElementById(word.ID).style.borderColor = 'black';
  };
});

socket.on("turnTo", (rolePlaying) => {
  if (rolePlaying === role) {
    document.getElementById('play').textContent = "You'r playing !";
    document.getElementById("next").style.display = 'block';
    document.getElementById("disapear").style.display = 'block';
    document.getElementById('clue').style.display = 'none';
  } else {
    document.getElementById('play').textContent = rolePlaying+" is playing, please wait your turn.";
    document.getElementById("next").style.display = 'none';
    document.getElementById("disapear").style.display = 'none';
  };
});

socket.on("newClue", (clues)=> {
  document.getElementById('clue').textContent = clues.clue+' '+clues.number;
  document.getElementById('clue').style.display = 'block';
});

document.getElementById("next").onclick = function() {
  let clue = document.forms["form"]["clue"].value;
  let number = document.forms["form"]["number"].value;
  if (number !== '' && clue !== 0) {
    if (role === 'purpleMaster') {
      socket.emit("turnEnd", "purpleSPY");
      socket.emit("clue", {clue, number});
    } else if (role === 'yelowMaster') {
      socket.emit("turnEnd", "yelowSPY");
      socket.emit("clue", {clue, number});
    } else {
      socket.disconnect();
      document.location.href="/";
    };
  } else {
    alert("complete all clue element's !");
  };
};

socket.emit("role", role);
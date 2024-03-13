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

if (role === 'purpleSPY') {
  document.body.style.backgroundColor = '#3B3486';
  socket.emit('requestWords', "")
} else if (role === 'yelowSPY') {
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
  if (word.reaveled === true) {
    //document.getElementById(word.ID).style.backgroundImage = '/images/'+word.color+'.png'
    document.getElementById(word.ID).textContent = 'X';
    document.getElementById(word.ID).style.backgroundColor = word.color;
    if (word.color === '#3B3486') {
      purpleWords--;
      document.getElementById('purpleScore').textContent = purpleWords;
    } else if (word.color === '#F8E559') {
      yelowWords--;
      document.getElementById('yelowScore').textContent = yelowWords;
    }
    if (word.color !== 'white') {
      document.getElementById(word.ID).style.color = 'white';
      document.getElementById(word.ID).style.borderColor = 'white';
    }
    document.getElementById(word.ID).onclick = function() {};
  } else {
    if (word.color === '#3B3486') {
      purpleWords++;
      document.getElementById('purpleScore').textContent = purpleWords;
      if (role === 'purpleSPY') {
        document.getElementById(word.ID).onclick = function() {
          word.reaveled = true;
          socket.emit("modifiateWord", word);
        };
      } else {
        document.getElementById(word.ID).onclick = function() {
          word.reaveled = true;
          socket.emit("modifiateWord", word);
          socket.emit("turnEnd", "purpleMaster");
        };
      };
    } else if (word.color === '#F8E559') {
      yelowWords++;
      document.getElementById('yelowScore').textContent = yelowWords;
      if (role === 'yelowSPY') {
        document.getElementById(word.ID).onclick = function() {
          word.reaveled = true;
          socket.emit("modifiateWord", word);
        };
      } else {
        document.getElementById(word.ID).onclick = function() {
          word.reaveled = true;
          socket.emit("modifiateWord", word);
          socket.emit("turnEnd", "yelowMaster");
        };
      };
    } else if (word.color === 'white') {
      if (role === 'yelowSPY') {
        document.getElementById(word.ID).onclick = function() {
          word.reaveled = true;
          socket.emit("modifiateWord", word);
          socket.emit("turnEnd", "purpleMaster");
        };
      } else {
        document.getElementById(word.ID).onclick = function() {
          word.reaveled = true;
          socket.emit("modifiateWord", word);
          socket.emit("turnEnd", "yelowMaster");
        };
      };
    } else {
      document.getElementById(word.ID).onclick = function() {
        word.reaveled = true;
        socket.emit("modifiateWord", word);
        socket.emit("turnEnd", "");
      };
    };
  };
});

socket.on("turnTo", (rolePlaying) => {
  if (rolePlaying === role) {
    document.getElementById('play').textContent = "You'r playing !";
    document.getElementById("next").style.display = 'block';
    for (let i = 0; i < 25;i++) {
      document.getElementById(i.toString()).disabled = false;
    };
  } else {
    document.getElementById('play').textContent = rolePlaying+" is playing, please wait your turn.";
    document.getElementById("next").style.display = 'none';
    for (let i = 0; i < 25;i++) {
      document.getElementById(i.toString()).disabled = true;
    };
  };
});

socket.on("newClue", (clues)=> {
  document.getElementById('clue').textContent = clues.clue+' '+clues.number;
});

document.getElementById("next").onclick = function() {
  if (role === 'purpleSPY') {
    socket.emit("turnEnd", "yelowMaster");
  } else if (role === 'yelowSPY') {
    socket.emit("turnEnd", "purpleMaster");
  } else {
    socket.disconnect();
    document.location.href="/";
  };
};

socket.emit("role", role);
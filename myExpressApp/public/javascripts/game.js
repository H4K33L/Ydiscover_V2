import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

window.socket = io();
let roomID = document.cookie
  .split("; ")
  .find((row) => row.startsWith("roomID="))
  ?.split("=")[1];
socket.emit("room", roomID);
document.getElementById("roomID").textContent = document.getElementById("roomID").textContent + roomID

socket.on('deco', () => {
    socket.disconnect();
    document.location.href="/";
});
socket.on('del', (role) => {
    document.getElementById(role).style.display= 'none';
});

document.getElementById("purpleSPY").onclick = function() {
  document.location.href="/spy";
  document.cookie = 'role=purpleSPY';
};
document.getElementById("purpleMaster").onclick = function() {
  document.location.href="/master";
  document.cookie = 'role=purpleMaster';
};

document.getElementById("yelowSPY").onclick = function() {
  document.location.href="/spy";
  document.cookie = 'role=yelowSPY';
};
document.getElementById("yelowMaster").onclick = function() {
  document.location.href="/master";
  document.cookie = 'role=yelowMaster';
};
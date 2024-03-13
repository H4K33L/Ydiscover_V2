let roomID = (Math.random() + 1).toString(36).substring(7);
document.cookie = 'roomID='+roomID;
document.getElementById("game").onclick = function() {document.location.href="/game";};
document.getElementById("join").onclick = function() {document.location.href="/join";};
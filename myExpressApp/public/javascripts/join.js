document.getElementById("go").onclick = function() {
    var newRommID = document.forms["form"]["roomID"].value
    if (newRommID === '') {
        alert('Empty Room ID !')
    } else {
        document.cookie = 'roomID='+newRommID;
        document.location.href="/game";
    };
};
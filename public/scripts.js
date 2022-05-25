var socket = io();

socket.on("data", function (data) {

    console.log(data);

    document.getElementById("total").innerHTML = data.total;
});
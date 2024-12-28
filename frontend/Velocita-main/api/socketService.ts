import { io } from 'socket.io-client';

const socket = io("http://54.91.227.18:8081/");
socket.on("connect", () => {
    console.log(socket.id);

});
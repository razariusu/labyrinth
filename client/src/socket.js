import io from 'socket.io-client';
const socket = io();

export default socket;

export function socket_init(){
    console.log('connected to socket')
}
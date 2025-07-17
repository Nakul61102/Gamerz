// socket.js
import { io } from "socket.io-client";


const socket = io(process.env.BACKEND_URL); // Replace with your backend URL
export default socket;

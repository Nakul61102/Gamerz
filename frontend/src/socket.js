// socket.js
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL); // Replace with your backend URL
export default socket;

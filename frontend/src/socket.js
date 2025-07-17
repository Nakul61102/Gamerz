// socket.js
import { io } from "socket.io-client";

const socket = io(process.env.BACKEND_URL || "http://localhost:3001"); // Replace with your backend URL
export default socket;

import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // use env in prod
export default socket;
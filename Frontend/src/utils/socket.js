import { io } from "socket.io-client";

const URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const socket = io(URL);

export default socket;
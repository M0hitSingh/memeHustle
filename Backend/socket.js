let io = null;

export const setSocketInstance = (socketInstance) => {
  io = socketInstance;
  console.log("✅ Socket instance set.");
};

export const getSocketInstance = () => io;

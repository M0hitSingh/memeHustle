let ioInstance = null;

export const setSocketInstance = (io) => {
  ioInstance = io;
};

export const emitLeaderboardUpdate = () => {
  if (ioInstance) {
    ioInstance.emit("leaderboard-update");
  }
};

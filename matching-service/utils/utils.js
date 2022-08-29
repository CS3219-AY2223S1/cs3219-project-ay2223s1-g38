const generateRandomRoomId = () => {
  return Math.random().toString(36).substring(3,10);
}

module.exports = {
  generateRandomRoomId,
}
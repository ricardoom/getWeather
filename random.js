//
// Random numbers
//

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandom(max, min) {
  return Math.random() * (max - min) + min;
}

export { getRandom, getRandomInt }
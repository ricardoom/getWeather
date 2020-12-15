//
// Random numbers
//

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandom(max, min) {
  return Math.random() * (max - min) + min;
}

// take an array and return one of the numbers
// const chooseRandomly = (array) => {
//   if (!Array.isArray(arr) || !arr.length) {
//     return [];
//   } else {

//   }
// }

// const rotations = [
//   0, 90, 180, 270
// ];

function getRandomArrayElement(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}


export { getRandom, getRandomInt, getRandomArrayElement }
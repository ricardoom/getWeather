//
// Word getter and doer with things...

import { wordnikAPIKey, openWeatherAPIKey } from './keys.js';
import { getRandom, getRandomInt, getRandomArrayElement } from './random.js';

function createNode(el) {
  return document.createElement(el);
}

function append(parent, el) {
  return parent.appendChild(el);
}

// http://api.wordnik.com/v4/words.json/randomWord?api_key=YOURKEYHERE

const wordnikURL = 'http://api.wordnik.com/v4/words.json/randomWords?api_key=';

const wordnikURLLimited =
  'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=-1&limit=15&api_key=';

const fullWordnikURL = `${wordnikURLLimited}${wordnikAPIKey}`;

const city_id = 5110302; // Brooklyn Ny, USA
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${openWeatherAPIKey}`;

const body = document.querySelector('body');
const svg = document.querySelector('svg');

const vw = body.clientWidth;
const vh = body.clientHeight;
console.log(vw, vh);
svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
svg.setAttribute('height', `${vh}`);
svg.setAttribute('width', `${vw}`);
// svg.setAttribute('width', vw);
// svg.setAttribute('height', vh);
// use vh & vw to check make sure values are not out of the screen

const someValue = null;
// console.log(vh, vw, newX, newY);

// convert the above to function that returns, the two values as an object

const makeCoordinate = (x, y) => {
  return { x, y };
};

// WIP: dynamic Gradient BGs!
const generateGradients = (type, positions, numbers) => {
  // returns a comma separated list of css gradients
  // we pass the type of gradient (conic, linear etc)
  // take in a number of positions
  // take a number of gradients to stack
  let { positions, numbers } = values;
  if (type === 'conic') {
    // conics
    let gradient = `conic-gradient(${{ ...values }})`;
  } else if (type === 'linear') {
    // linear
    let gradient = `linear-gradient(${{ ...values }})`;
  }
  type === radial;
  let gradient = `radial-gradient(${{ ...values }})`;

  return gradient;
};

// console.log(coords);

// First ever ping to Wordnik and this is what I get back:
// {"id":0,"word":"southwest"}
// no joke!

fetch(fullWordnikURL)
  .then((response) => response.json())
  .then((data) => {
    let words = data;

    words.forEach((word) => {
      let svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      let newY = getRandomInt(vw);
      let newX = getRandomInt(vh);
      let coords = makeCoordinate(newX, newY);
      const h = getRandomInt(360);
      const s = getRandomInt(100);
      const l = getRandomInt(100);
      const a = getRandom(1, 0.27);
      const rotations = [0, 90, 180, 270, 45, 225, 315];
      const rotated = getRandomArrayElement(rotations);
      let fs = getRandomInt(5);
      svgText.innerHTML = `${word.word}`;
      svgText.setAttribute('transform', `translate(${coords.x * 0.5} ${coords.y * 0.5}) rotate(${rotated})`);
      svgText.setAttribute('x', coords.x * 0.01);
      svgText.setAttribute('y', coords.y * 0.01); // fix the -y viewBox Viewport thing
      svgText.setAttribute('style', `fill: hsla(${h}, ${s}%, ${l}%, ${a.toFixed(2)})`);
      svgText.setAttribute('rotate', `${rotated}`);
      svgText.setAttribute('font-size', `calc(10 * var(--s${fs}))`);
      append(svg, svgText);
    });
  })
  .catch((err) => console.error(err));

// get the weather
fetch(weatherURL)
  .then((response) => response.json())
  .then((data) => {
    const styleBG = body.style;
    console.log(styleBG);
    const weather = data;
    const { deg, speed } = weather.wind;
    const { temp } = weather.main;
    const useSpeed = Math.floor(speed) * 10;
    body.setAttribute(`style`, `background-image: radial-gradient(hsl(${deg}, 72%, 45%), hsl(${temp}, ${useSpeed}%, ${useSpeed * 1.2}%));`);
  })
  .catch(console.error);

// // some attributes to pass in to the attribs arg, should be an array:

// const useWeather = (element, ...attribs) => {
//   element.setAttribute(`style`, `font-size: ${attribs[0]}`);
//   console.log(element, attribs[0]);
// };
// // const incomingWeather = [];
// // const weatherUno = useWeather(body, incomingWeather);
// // weatherUno;

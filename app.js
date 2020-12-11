//
// Word getter and doer with things...

import { wordnikAPIKey, openWeatherAPIKey } from "./keys.js";
import { getRandom, getRandomInt, getRandomArrayElement } from './random.js';


  function createNode(el) {
    return document.createElement(el);
  }
  
  function append(parent, el) {
    return parent.appendChild(el);
  }

// http://api.wordnik.com/v4/words.json/randomWord?api_key=YOURKEYHERE

const wordnikURL = 'http://api.wordnik.com/v4/words.json/randomWords?api_key=';

const fullWordnikURL = `${wordnikURL}${wordnikAPIKey}`;

const city_id = 5110302; // Brooklyn Ny, USA
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${openWeatherAPIKey}`

const body = document.querySelector('body');
const svg = document.querySelector('svg');

const vw = body.clientWidth;
const vh = body.clientHeight;

svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);

// use vh & vw to check make sure values are not out of the screen

const someValue = null;
// console.log(vh, vw, newX, newY);

// convert the above to function that returns, the two values as an object

const makeCoordinate = (x, y) => {
  return { x, y }
}


// console.log(coords);

// First ever ping to Wordnik and this is what I get back:
// {"id":0,"word":"southwest"}
// no joke!

fetch(fullWordnikURL)
  .then(response => (response.json()))
  // .then(data => (console.log(data)))
  .then(data => {
    let words = data;
    
    words.forEach(word => {
      // let svgText = createNode('text');
      let svgText = document.createElementNS('http://www.w3.org/2000/svg','text');
      let newX = getRandom(vh, 0);
      let newY = getRandom(vw, 0);
      let coords = makeCoordinate(newX, newY);
      const h = getRandom(360, 1);
      const s = getRandom(100, 0);
      const l = getRandom(100, 0);
      const a = getRandom(1, 0);
      const rotations = [
        0, 90, 180, 270
      ];
      const rotated = getRandomArrayElement(rotations);
      svgText.innerHTML = `${word.word}`;
      svgText.setAttribute('x', coords.x);
      svgText.setAttribute('y', coords.y);
      svgText.setAttribute('style', `fill: hsla(${h}, ${s}%, ${l}%, ${a});`);
      svgText.setAttribute('rotate', `${rotated}`);
      // console.log(svgText.innerHTML);
      append(svg, svgText)
    })
  })
  .catch(err => (console.error(err)));

  // get the weather
fetch(weatherURL)
.then(response => (response.json()))
.then(data => {
  const styleBG = body.style;
  const weather = data;
  const { deg, speed } = weather.wind;
  console.log(weather, deg, speed, styleBG);
  

  // const { ...styles } = body.style;
  // styleBG.setProperty('background', `radial-gradient((hsl(${windDir}, 72%, 65%), hsl(235, 62%, 73%))`)
  // document.styleSheets[0].cssRules[1].style.backgroundImage = `radial-gradient((hsl(${windDir}, 72%, 45%), hsl(235, 62%, 73%))`;
  // document.body.style.backgroundImage = "radial-gradient(#456, #678)"
  // document.body.style.backgroundImage = `radial-gradient((hsl(${deg}, 72%, 45%), hsl(235, 62%, 73%))`;

  body.setAttribute(`style`, `background-image: radial-gradient(hsl(${deg}, 72%, 45%), hsl(235, 62%, 73%))`)
})
.catch(console.error);

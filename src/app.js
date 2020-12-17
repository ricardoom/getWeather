//
// Word getter and doer with things...
import React from 'react';
import { render } from 'react-dom';
import { wordnikAPIKey, openWeatherAPIKey } from './keys.js';
import { getRandom, getRandomInt, getRandomArrayElement } from './random.js';
import SvgTextEl from './SvgTextEl';

const wordnikURLLimited =
  'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=-1&limit=15&api_key=';

const fullWordnikURL = `${wordnikURLLimited}${wordnikAPIKey}`;

const city_id = 5110302; // Brooklyn NY, USA

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


// convert the above to function that returns, the two values as an object

const makeCoordinate = (x, y) => {
  return { x, y };
};

// console.log(coords);

// First ever ping to Wordnik and this is what I get back:
// {"id":0,"word":"southwest"}
// no joke!

fetch(fullWordnikURL)
  .then((response) => response.json())
  // .then(data => (console.log(data)))
  .then((data) => {
    let words = data;

    words.forEach((word) => {
      // let svgText = createNode('text');
      let svgText = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      let newY = getRandomInt(vw);
      let newX = getRandomInt(vh);
      let coords = makeCoordinate(newX, newY);
      const h = getRandomInt(360);
      const s = getRandomInt(100);
      const l = getRandomInt(100);
      const a = getRandom(1, 0.27);
      const rotations = [0, 90, 180, 270, 45, 225, 315];
      const rotated = getRandomArrayElement(rotations);
      svgText.innerHTML = `${word.word}`;
      svgText.setAttribute(
        'transform',
        `translate(${coords.x * 0.5} ${coords.y * 0.5}) rotate(${rotated})`
      );
      svgText.setAttribute('x', coords.x * 0.01);
      svgText.setAttribute('y', coords.y * 0.01); // fix the -y viewBox Viewport thing
      svgText.setAttribute(
        'style',
        `fill: hsla(${h}, ${s}%, ${l}%, ${a.toFixed(2)})`
      );
      svgText.setAttribute('rotate', `${rotated}`);

      // console.log(svgText.innerHTML);
      append(svg, svgText);
    });
  })
  .catch((err) => console.error(err));

// get the weather
fetch(weatherURL)
  .then((response) => response.json())
  .then((data) => {
    const styleBG = body.style;
    const weather = data;
    const { deg, speed } = weather.wind;
    const { temp } = weather.main;
    const useSpeed = Math.floor(speed) * 10;
    console.log(weather, deg, speed, temp, styleBG, useSpeed);

    body.setAttribute(
      `style`,
      `background-image: radial-gradient(hsl(${deg}, 72%, 45%), hsl(${temp}, ${useSpeed}%, ${
        useSpeed * 1.2
      }%));`
    );
  })
  .catch(console.error);

const App = () => {
  return React.createElement(
    'svg',
    { 
      id: 'babasoon',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: `0 0 ${vw} ${vh}`
    },
    [
      React.createElement(SvgTextEl, {
        x: 100,
        y: 100,
        text: 'yoyo',
      }),
    ]
  );
};

// Do the React magic here:
// Render App ->
render(React.createElement(App), document.getElementById('main'));

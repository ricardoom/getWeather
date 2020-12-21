// Get our words from here...
//
import { wordnikAPIKey } from './keys.js';
import React from 'react';
import SvgTextEl from './SvgTextEl.js';

const wordnikURLLimited =
  'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10&maxLength=-1&limit=15&api_key=';

const fullWordnikURL = `${wordnikURLLimited}${wordnikAPIKey}`;

// just get words
const getNewWords = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`blargh! response failed — status: ${response.error}`);
  } else {
    const data = await response.json();
    return [...data];
  }
};

// const hardWords = 'diplodocus';

class Words extends React.Component {
  render() {
    const values = getNewWords(fullWordnikURL);
    return (
      // TODO: Need to figure out where to go from here...
      // ? Here is where we left off: 12/21/2020 @ 10:24am
      values.map((value, index) => {
        console.log(value, index);
      })
    );
  }
}

export default Words;

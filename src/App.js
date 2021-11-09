import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import emojiRegex from 'emoji-regex';
import skinTone from 'skin-tone';

function App() {

  useEffect(() => {
    async function fetchData() {
      const cache = await caches.open('files');
      const requests = await cache.keys();
      const response = await cache.match(requests[0]);
      const responseBlob = await response.blob();
      const text = await responseBlob.text();
      const regex = emojiRegex();
      const emojiCounter = {};
      for (const match of text.matchAll(regex)) {
        const emoji = skinTone(match[0], 'none');
        if (emojiCounter[emoji] === undefined) {
          emojiCounter[emoji] = 1;
        }
        else {
          emojiCounter[emoji]++
        }
        console.log(`Matched sequence ${ emoji } — code points: ${ [...emoji].length }`);
      }
      console.log(emojiCounter);

      var emojis = [];
      for (let emoji in emojiCounter) {
        emojis.push([emoji, emojiCounter[emoji]]);
      }
      emojis.sort(function(a, b) {
        return b[1] - a[1];
      });
  
      console.log(emojis);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

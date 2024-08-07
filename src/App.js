import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const RandomIndexQuote = ({ jsonData }) => {
  const [index, setIndex] = useState(0);
  const [theme, setTheme] = useState('dark-blue');

  const randomIndex = () => setIndex(Math.floor(Math.random() * jsonData.length));

  const toggleTheme = () => {
    const themes = ['dark-blue', 'dark-green', 'dark-red'];
    const currentThemeIndex = themes.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextThemeIndex]);
  };

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div id="quote-box" className="quote">
      <h1 id="text">{jsonData[index].quote}</h1>
      <h2 id="author">{jsonData[index].author}</h2>
      <button id="new-quote" onClick={() => { randomIndex(); toggleTheme(); }}>Randomize</button>
      <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text="${jsonData[index].quote}" - ${jsonData[index].author}`} target="_blank" rel="noopener noreferrer">Tweet</a>
    </div>
  );
};

function App() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const url = 'https://api.github.com/gists/c026b4d87dee807673166b62eac912e0';
    axios.get(url)
      .then(response => {
        const fileKeys = Object.keys(response.data.files);
        if (fileKeys.length > 0) {
          const fileContent = response.data.files[fileKeys[0]].content;
          const jsonData = JSON.parse(fileContent);
          setJsonData(jsonData);
        } else {
          console.error('No files found in the Gist.');
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
      });
  }, []);

  return (
    <div>
      {jsonData.length > 0 ? <RandomIndexQuote jsonData={jsonData} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
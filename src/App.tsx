/// <reference path="./types/custom.d.ts" />
import React, { useState, useEffect } from 'react';
import './App.css';
import CardGrid from './components/CardGrid';
import VideoPlayer from './components/VideoPlayer';
import Greetings from './components/Greetings';

const initialCards = [
  { id: 1, type: 'tree' },
  { id: 2, type: 'tree' },
  { id: 3, type: 'tree' },
  { id: 4, type: 'santa' },
  { id: 5, type: 'sleigh' },
  { id: 6, type: 'snowflake' },
  { id: 7, type: 'santa' },
  { id: 8, type: 'sleigh' },
  { id: 9, type: 'snowflake' },
];

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [cards, setCards] = useState(shuffleArray([...initialCards]));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [foundTrees, setFoundTrees] = useState<number>(0);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [showGreetings, setShowGreetings] = useState<boolean>(false);

  useEffect(() => {
    setCards(shuffleArray([...initialCards]));
  }, []);

  useEffect(() => {
    if (foundTrees >= 3) {
      setTimeout(() => {
        setShowVideo(true);
        requestFullscreen();
      }, 500);
    }
  }, [foundTrees]);

  const handleCardClick = (id: number, type: string) => {
    if (flippedCards.includes(id)) return;

    setFlippedCards([...flippedCards, id]);

    if (type === 'tree') {
      setFoundTrees(foundTrees + 1);
    }
  };

  const requestFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {showGreetings ? (
          <Greetings />
        ) : showVideo ? (
          <VideoPlayer onVideoEnd={() => setShowGreetings(true)} />
        ) : (
          <CardGrid cards={cards} flippedCards={flippedCards} handleCardClick={handleCardClick} />
        )}
      </header>
    </div>
  );
}

export default App;

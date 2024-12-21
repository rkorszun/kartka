import React, { useState, useEffect } from 'react';
import './App.css';

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
  const [showGreetings, setShowGreetings] = useState<boolean>(false);

  useEffect(() => {
    setCards(shuffleArray([...initialCards]));
  }, []);

  useEffect(() => {
    if (foundTrees >= 3) {
      setTimeout(() => {
        setShowGreetings(true);
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

  const getIcon = (type: string) => {
    switch (type) {
      case 'tree':
        return '🎄';
      case 'santa':
        return '🎅';
      case 'sleigh':
        return '🛷';
      case 'snowflake':
        return '❄️';
      default:
        return '🎁'; // Gift icon for default case
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {showGreetings ? (
          <div className="greetings">
            <h1>Wesołych Świąt!</h1>
            <p>Życzymy Wam wszystkiego najlepszego!</p>
          </div>
        ) : (
          <>
            <p className="hint">Znajdź 3 choinki</p>
            <div className="card-grid">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`card ${flippedCards.includes(card.id) ? 'flipped' : ''}`}
                  onClick={() => handleCardClick(card.id, card.type)}
                >
                  {flippedCards.includes(card.id) ? (
                    <span>{getIcon(card.type)}</span>
                  ) : (
                    <span>🎁</span> // Gift icon for hidden cards
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

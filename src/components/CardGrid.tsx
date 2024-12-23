import React from 'react';

interface Card {
  id: number;
  type: string;
}

interface CardGridProps {
  cards: Card[];
  flippedCards: number[];
  handleCardClick: (id: number, type: string) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, flippedCards, handleCardClick }) => {
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
  );
};

export default CardGrid;

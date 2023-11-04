import Card from './Card.jsx';
import { cardFlipSpeeds } from './CardFlipSpeeds.js';

const gridStyles = {
    12: { gridTemplateRows: 'repeat(3, 1fr)', gridTemplateColumns: 'repeat(4, 1fr)' },
    20: { gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: 'repeat(5, 1fr)' },
    30: { gridTemplateRows: 'repeat(5, 1fr)', gridTemplateColumns: 'repeat(6, 1fr)' }
};

function CardContainer({ pokemonCards, gameSpeed, isClickable, showCard }) {
    let gridStyling = gridStyles[pokemonCards.length];

    return (
        <div className='card-container' style={gridStyling}>
            {pokemonCards.map((item) => {
                return (
                    <Card
                        key={item.id}
                        isVisible={item.isVisible || item.isFound}
                        id={item.id}
                        url={item.url}
                        onClick={isClickable && !(item.isFound || item.isVisible) ? showCard : () => {}}
                        speed={cardFlipSpeeds[gameSpeed]}
                    />
                );
            })}
        </div>
    );
}

export default CardContainer;

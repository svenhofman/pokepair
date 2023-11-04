import Card from './Card.jsx';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

const cardFlipSpeeds = {
    slow: 3000,
    regular: 1000,
    fast: 500
};

const gridStyles = {
    6: { gridTemplateRows: 'repeat(3, 1fr)', gridTemplateColumns: 'repeat(4, 1fr)' },
    10: { gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: 'repeat(5, 1fr)' },
    15: { gridTemplateRows: 'repeat(5, 1fr)', gridTemplateColumns: 'repeat(6, 1fr)' }
};

function shuffle(arr) {
    // Fisher-Yates shuffle method
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function areMatchingCards(pokemonCards) {
    return pokemonCards[0].id.split('-')[0] === pokemonCards[1].id.split('-')[0];
}

function computeInitialCardsState(pokemon) {
    const cards = pokemon.reduce((acc, item, idx) => {
        const pokemonID = uniqid();
        acc[idx] = { id: `${pokemonID}-1`, url: item, isVisible: false, isFound: false };
        acc[pokemon.length + idx] = { id: `${pokemonID}-2`, url: item, isVisible: false, isFound: false };
        return acc;
    }, []);

    return shuffle(cards);
}

function isGameOver(pokemonCards) {
    return pokemonCards.reduce((acc, item) => {
        return acc && item.isFound;
    }, true);
}

function GameScreen({ refCSSTransition, pokemon, gameSpeed, numGuesses, setNumGuesses, setGameSpeed, replayGame, setGameOver }) {
    const initialCardsState = computeInitialCardsState(pokemon);
    const [pokemonCards, setPokemonCards] = useState(initialCardsState);
    const [shownCards, setShownCards] = useState([]);
    const [isClickable, setIsClickable] = useState(true);

    useEffect(() => {
        isGameOver(pokemonCards) && setGameOver();
    }, [pokemonCards, setGameOver]);

    useEffect(() => {
        if (shownCards.length < 2) return;
        setNumGuesses((prevNumGuesses) => prevNumGuesses + 1);
        setIsClickable(false);

        const isMatch = areMatchingCards(shownCards);
        const delay = !isMatch ? cardFlipSpeeds[gameSpeed] : 0;

        setTimeout(() => {
            setPokemonCards((prevPokemonCards) =>
                prevPokemonCards.map((card) => {
                    console.log('isVisible:', card.isFound);
                    console.log('isFound:', card.isFound || card.id === shownCards[0].id || card.id === shownCards[1].id);
                    return {
                        ...card,
                        isVisible: card.isFound,
                        isFound: card.isFound || (isMatch && (card.id === shownCards[0].id || card.id === shownCards[1].id))
                    };
                })
            );
            setIsClickable(true);
            setShownCards([]);
        }, delay);
    }, [shownCards, pokemonCards]);

    const showCard = (id) => {
        let shownCardItem;
        setPokemonCards((prevPokemonCards) =>
            prevPokemonCards.map((item) => {
                if (item.id === id) {
                    shownCardItem = item;
                    return { ...item, isVisible: true };
                }
                return item;
            })
        );
        setShownCards((prevShownCards) => [...prevShownCards, shownCardItem]);
    };

    let gridStyling = gridStyles[pokemon.length];

    return (
        <div ref={refCSSTransition} className='game-screen'>
            <FontAwesomeIcon className='replay fa-xl' icon={faRotateRight} onClick={replayGame} />
            <div className='game-speed'>
                <div className={`slow ${gameSpeed === 'slow' ? 'selected' : ''}`} onClick={() => setGameSpeed('slow')}>
                    slow
                </div>
                <div className={`regular ${gameSpeed === 'regular' ? 'selected' : ''}`} onClick={() => setGameSpeed('regular')}>
                    regular
                </div>
                <div className={`fast ${gameSpeed === 'fast' ? 'selected' : ''}`} onClick={() => setGameSpeed('fast')}>
                    fast
                </div>
            </div>
            <div className='num-guesses'>Number of guesses: {numGuesses}</div>
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
        </div>
    );
}

export default GameScreen;

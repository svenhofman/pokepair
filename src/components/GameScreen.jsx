import GameSpeed from './GameSpeed.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import { cardFlipSpeeds } from './CardFlipSpeeds.js';

import { useEffect, useState } from 'react';
import uniqid from 'uniqid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import CardContainer from './CardContainer.jsx';

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
    const [pokemonCards, setPokemonCards] = useState(() => computeInitialCardsState(pokemon));
    const [shownCards, setShownCards] = useState([]);
    const [isClickable, setIsClickable] = useState(true);

    useEffect(() => {
        isGameOver(pokemonCards) && setGameOver();
    }, [pokemonCards, setGameOver]);

    useEffect(() => {
        if (shownCards.length < 2) return;
        setNumGuesses((prevNumGuesses) => ({ ...prevNumGuesses, current: prevNumGuesses['current'] + 1 }));
        setIsClickable(false);

        const isMatch = areMatchingCards(shownCards);
        const delay = !isMatch ? cardFlipSpeeds[gameSpeed] : 0;

        setTimeout(() => {
            setPokemonCards((prevPokemonCards) =>
                prevPokemonCards.map((card) => {
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

    return (
        <div ref={refCSSTransition} className='game-screen'>
            <GameSpeed gameSpeed={gameSpeed} setGameSpeed={setGameSpeed} />
            <FontAwesomeIcon className='to-menu-icon fa-xl' icon={faCircleLeft} onClick={replayGame} />
            <CardContainer pokemonCards={pokemonCards} gameSpeed={gameSpeed} isClickable={isClickable} showCard={showCard} />
            <ScoreBoard numGuesses={numGuesses} />
        </div>
    );
}

export default GameScreen;

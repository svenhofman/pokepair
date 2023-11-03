import Card from './Card.jsx';
import { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

function shuffle(arr) {
    // Fisher-Yates shuffle method
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function matchingCards(pokemonCards) {
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

function GameScreen({ pokemon, numGuesses, setNumGuesses, replayGame, setGameOver }) {
    const initialCardsState = computeInitialCardsState(pokemon);
    const [pokemonCards, setPokemonCards] = useState(initialCardsState);
    const [shownCards, setShownCards] = useState([]);
    const [isClickable, setIsClickable] = useState(true);
    const gameScreenDiv = useRef(null);

    useEffect(() => {
        isGameOver(pokemonCards) && setGameOver();
    }, [pokemonCards, setGameOver]);

    useEffect(() => {
        if (shownCards.length > 1) {
            setNumGuesses((prevNumGuesses) => prevNumGuesses + 1);
            setIsClickable(false);
            if (!matchingCards(shownCards)) {
                setTimeout(() => {
                    setPokemonCards(
                        pokemonCards.map((item) => {
                            return { ...item, isVisible: false };
                        })
                    );
                    setIsClickable(true);
                }, 1000);
            } else {
                setPokemonCards((prevPokemonCards) =>
                    prevPokemonCards.map((card) => ({
                        ...card,
                        isFound: card.isFound || card.id === shownCards[0].id || card.id === shownCards[1].id
                    }))
                );
                setIsClickable(true);
            }
            setShownCards([]);
        }
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

    const clickAllowed = (item) => isClickable && !(item.isFound || item.isVisible);

    // Only runs once
    useEffect(() => {
        // Timeout so that it does not get batched together with class creation
        setTimeout(() => {
            gameScreenDiv.current.classList.add('fade');
        }, 10);
    }, []);

    const replay = () => {
        gameScreenDiv.current.classList.remove('fade');
        setTimeout(() => {
            replayGame();
        }, 1000);
    };

    let gridStyling;
    if (pokemon.length === 6) gridStyling = { gridTemplateRows: 'repeat(3, 1fr)', gridTemplateColumns: 'repeat(4, 1fr' };
    else if (pokemon.length === 10) gridStyling = { gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: 'repeat(5, 1fr' };
    else if (pokemon.length === 15) gridStyling = { gridTemplateRows: 'repeat(5, 1fr)', gridTemplateColumns: 'repeat(6, 1fr' };

    return (
        <div ref={gameScreenDiv} className='game-screen'>
            <FontAwesomeIcon className='replay fa-xl' icon={faRotateRight} onClick={replay} />
            <div className='num-guesses'>Number of guesses: {numGuesses}</div>
            <div className='card-container' style={gridStyling}>
                {pokemonCards.map((item) => {
                    return (
                        <Card
                            key={item.id}
                            isVisible={item.isVisible || item.isFound}
                            id={item.id}
                            url={item.url}
                            onClick={clickAllowed(item) ? showCard : () => {}}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default GameScreen;

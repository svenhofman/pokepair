import GameScreen from './components/GameScreen.jsx';
import MenuScreen from './components/MenuScreen.jsx';
import EndScreen from './components/EndScreen.jsx';

import Pokemon from './components/Pokemon.jsx';

import { useEffect, useState } from 'react';

const totalNumPokemon = 700;
function App() {
    const [drawnPokemonIDs, setDrawnPokemonIDs] = useState(null);
    const [pokemonImages, setPokemonImages] = useState(null);
    const [difficulty, setDifficulty] = useState('easy');
    const [numGuesses, setNumGuesses] = useState(0);
    const [gameStatus, setGameStatus] = useState('menu');

    useEffect(() => {
        let numPairs;
        if (difficulty === 'easy') numPairs = 6;
        if (difficulty === 'medium') numPairs = 10;
        if (difficulty === 'hard') numPairs = 15;

        const drawnIDs = [];
        while (drawnIDs.length < numPairs) {
            let id = Math.floor(Math.random() * totalNumPokemon + 1);
            if (!drawnIDs.includes(id)) drawnIDs.push(id);
        }
        setDrawnPokemonIDs(drawnIDs);
    }, [difficulty]);

    useEffect(() => {
        if (drawnPokemonIDs) {
            (async () => {
                let pokemonData = await Pokemon.getPokemon(drawnPokemonIDs);
                pokemonData = pokemonData.map((item) => {
                    return item.sprites.front_default;
                });
                setPokemonImages(pokemonData);
            })();
        }
    }, [drawnPokemonIDs]);

    useEffect(() => {
        if (gameStatus === 'playing') {
            setNumGuesses(0);
        }
    }, [gameStatus]);

    let currentShownPage;
    if (gameStatus === 'menu') {
        currentShownPage = <MenuScreen difficulty={difficulty} setDifficulty={setDifficulty} startGame={() => setGameStatus('playing')} />;
    } else if (gameStatus === 'playing') {
        currentShownPage = (
            <GameScreen
                pokemon={pokemonImages}
                numGuesses={numGuesses}
                setNumGuesses={setNumGuesses}
                replayGame={() => setGameStatus('menu')}
                setGameOver={() => setGameStatus('finished')}
            />
        );
    } else if (gameStatus === 'finished') {
        currentShownPage = (
            <>
                <GameScreen
                    pokemon={pokemonImages}
                    numGuesses={numGuesses}
                    setNumGuesses={setNumGuesses}
                    replayGame={() => setGameStatus('menu')}
                    setGameOver={() => setGameStatus('finished')}
                />
                <EndScreen numGuesses={numGuesses} />
            </>
        );
    }

    return currentShownPage;
}

export default App;

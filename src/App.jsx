import GameScreen from './components/GameScreen.jsx';
import MenuScreen from './components/MenuScreen.jsx';
import EndScreen from './components/EndScreen.jsx';

import Pokemon from './components/Pokemon.jsx';

import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

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

    // So CSS transitions doesn't use deprecated findDomNode()
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    return (
        <>
            <CSSTransition nodeRef={ref1} in={gameStatus === 'menu'} timeout={500} appear={true} unmountOnExit>
                <MenuScreen
                    refCSSTransition={ref1}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    startGame={() => setGameStatus('playing')}
                />
            </CSSTransition>

            <CSSTransition nodeRef={ref2} in={gameStatus === 'playing' || gameStatus === 'finished'} timeout={500} unmountOnExit>
                <GameScreen
                    refCSSTransition={ref2}
                    pokemon={pokemonImages}
                    numGuesses={numGuesses}
                    setNumGuesses={setNumGuesses}
                    replayGame={() => setGameStatus('menu')}
                    /* setGameOver is also triggered when game is already finished and replay is clicked, make sure
                     * game is not set to finished then but to menu by passing empty function */
                    setGameOver={gameStatus === 'playing' ? () => setGameStatus('finished') : () => {}}
                />
            </CSSTransition>

            <CSSTransition nodeRef={ref3} in={gameStatus === 'finished'} timeout={500} unmountOnExit>
                <EndScreen refCSSTransition={ref3} numGuesses={numGuesses} />
            </CSSTransition>
        </>
    );
}

export default App;

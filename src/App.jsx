import GameScreen from './components/GameScreen.jsx';
import MenuScreen from './components/MenuScreen.jsx';
import EndScreen from './components/EndScreen.jsx';

import Pokemon from './components/Pokemon.jsx';

import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const TOTAL_NUM_POKEMON = 700;

const determineNumPairs = (difficulty) => {
    switch (difficulty) {
        case 'medium':
            return 10;
        case 'hard':
            return 15;
        default:
            return 6;
    }
};

const fetchPokemonData = async (drawnPokemonIDs) => {
    const pokemonData = await Pokemon.getPokemon(drawnPokemonIDs);
    return pokemonData.map((item) => {
        return item.sprites.front_default;
    });
};

function App() {
    const [drawnPokemonIDs, setDrawnPokemonIDs] = useState(null);
    const [pokemonImages, setPokemonImages] = useState(null);
    const [difficulty, setDifficulty] = useState('easy');
    const [numGuesses, setNumGuesses] = useState(0);
    const [gameStatus, setGameStatus] = useState('menu');
    const [gameSpeed, setGameSpeed] = useState('regular');

    // So CSS transitions doesn't use deprecated findDomNode()
    const menuRef = useRef(null);
    const gameRef = useRef(null);
    const endRef = useRef(null);
    const loadingRef = useRef(null);

    useEffect(() => {
        const numPairs = determineNumPairs(difficulty);
        const drawnIDs = [];
        while (drawnIDs.length < numPairs) {
            let id = Math.floor(Math.random() * TOTAL_NUM_POKEMON + 1);
            if (!drawnIDs.includes(id)) drawnIDs.push(id);
        }
        setDrawnPokemonIDs(drawnIDs);
    }, [difficulty]);

    useEffect(() => {
        if (drawnPokemonIDs) {
            setTimeout(() => {
                (async () => {
                    const data = await fetchPokemonData(drawnPokemonIDs);
                    setPokemonImages(data);
                })();
            }, 3000);
        }
    }, [drawnPokemonIDs]);

    useEffect(() => {
        if (gameStatus === 'loading' && pokemonImages !== null) {
            // the game is ready to be played
            setGameStatus('playing');
        } else if (gameStatus === 'playing') {
            setNumGuesses(0);
        }
    }, [gameStatus, pokemonImages]);

    return (
        <>
            <CSSTransition nodeRef={menuRef} in={gameStatus === 'menu'} timeout={500} appear={true} unmountOnExit>
                <MenuScreen
                    refCSSTransition={menuRef}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    startGame={() => setGameStatus('loading')}
                />
            </CSSTransition>

            <CSSTransition nodeRef={loadingRef} in={gameStatus === 'loading'} timeout={500} unmountOnExit>
                <div ref={loadingRef} className='loading-screen'>
                    Loading...
                </div>
            </CSSTransition>

            <CSSTransition nodeRef={gameRef} in={gameStatus === 'playing' || gameStatus === 'finished'} timeout={500} unmountOnExit>
                <GameScreen
                    refCSSTransition={gameRef}
                    pokemon={pokemonImages}
                    numGuesses={numGuesses}
                    gameSpeed={gameSpeed}
                    setNumGuesses={setNumGuesses}
                    setGameSpeed={setGameSpeed}
                    replayGame={() => setGameStatus('menu')}
                    /* setGameOver is also triggered when game is already finished and replay is clicked, make sure
                     * game is not set to finished then but to menu by passing empty function */
                    setGameOver={gameStatus === 'playing' ? () => setGameStatus('finished') : () => {}}
                />
            </CSSTransition>

            <CSSTransition nodeRef={endRef} in={gameStatus === 'finished'} timeout={500} unmountOnExit>
                <EndScreen refCSSTransition={endRef} numGuesses={numGuesses} />
            </CSSTransition>
        </>
    );
}

export default App;

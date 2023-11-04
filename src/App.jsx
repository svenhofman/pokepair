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
    if (pokemonData) {
        return pokemonData.map((item) => {
            return item.sprites.front_default;
        });
    }
    return null;
};

function App() {
    const [drawnPokemonIDs, setDrawnPokemonIDs] = useState(null);
    const [pokemonImages, setPokemonImages] = useState(null);
    const [difficulty, setDifficulty] = useState('easy');
    const [numGuesses, setNumGuesses] = useState({ current: 0, easy: Infinity, medium: Infinity, hard: Infinity });
    const [gameStatus, setGameStatus] = useState('menu');
    const [gameSpeed, setGameSpeed] = useState('regular');
    const [timeOutID, setTimeOutID] = useState(null);

    // So CSS transitions doesn't use deprecated findDomNode()
    const menuRef = useRef(null);
    const gameRef = useRef(null);
    const endRef = useRef(null);
    const loadingRef = useRef(null);
    const errorRef = useRef(null);

    useEffect(() => {
        // Only start determining cards when difficulty is chosen and start is pressed, to make sure API is only
        // called once and not on every change of difficulty
        if (gameStatus === 'ready') {
            const numPairs = determineNumPairs(difficulty);
            const drawnIDs = [];
            while (drawnIDs.length < numPairs) {
                let id = Math.floor(Math.random() * TOTAL_NUM_POKEMON + 1);
                if (!drawnIDs.includes(id)) drawnIDs.push(id);
            }
            setDrawnPokemonIDs(drawnIDs);
        }
    }, [difficulty, gameStatus]);

    useEffect(() => {
        if (drawnPokemonIDs) {
            // make sure loading screen only gets shown when API request takes too long
            const id = setTimeout(() => setGameStatus('loading'), 1000);
            setTimeOutID(id);

            (async () => {
                const data = await fetchPokemonData(drawnPokemonIDs);
                if (data) setPokemonImages(data);
                else {
                    clearTimeout(id);
                    setGameStatus('error');
                }
            })();
        }
    }, [drawnPokemonIDs]);

    useEffect(() => {
        if ((gameStatus === 'ready' || gameStatus === 'loading') && pokemonImages !== null) {
            // the game is ready to be played
            clearTimeout(timeOutID);
            setGameStatus('playing');
        } else if (gameStatus === 'playing') {
            setNumGuesses({ ...numGuesses, current: 0 });
        } else if (gameStatus === 'menu') {
            // reset pokemon cards
            setDrawnPokemonIDs(null);
            setPokemonImages(null);
        } else if (gameStatus === 'finished') {
            // possibly update score
            setNumGuesses((prevNumGuesses) => ({
                ...prevNumGuesses,
                [difficulty]: prevNumGuesses['current'] < prevNumGuesses[difficulty] ? prevNumGuesses['current'] : prevNumGuesses[difficulty]
            }));
        }
    }, [gameStatus, pokemonImages]);

    return (
        <>
            <CSSTransition nodeRef={menuRef} in={gameStatus === 'menu'} timeout={500} appear={true} unmountOnExit>
                <MenuScreen
                    refCSSTransition={menuRef}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    startGame={() => setGameStatus('ready')}
                />
            </CSSTransition>

            <CSSTransition nodeRef={loadingRef} in={gameStatus === 'loading'} timeout={500} unmountOnExit>
                <div ref={loadingRef} className='modal loading-screen'>
                    loading...
                </div>
            </CSSTransition>

            <CSSTransition nodeRef={errorRef} in={gameStatus === 'error'} timeout={500} unmountOnExit>
                <div ref={errorRef} className='modal error-screen'>
                    an error occurred while loading the game, please refresh the page
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
                <EndScreen refCSSTransition={endRef} numGuesses={numGuesses} playAgain={() => setGameStatus('menu')} />
            </CSSTransition>
        </>
    );
}

export default App;

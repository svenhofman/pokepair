import { useEffect, useRef } from 'react';

function MenuScreen({ difficulty, setDifficulty, startGame }) {
    const menuDiv = useRef(null);
    const start = () => {
        menuDiv.current.classList.remove('fade');
        setTimeout(startGame, 1000);
    };

    // Only runs once
    useEffect(() => {
        // Timeout so that it does not get batched together with class creation
        setTimeout(() => {
            menuDiv.current.classList.add('fade');
        }, 10);
    }, []);

    return (
        <div ref={menuDiv} className='menu'>
            <div className='difficulty-options'>
                <div className={`easy ${difficulty === 'easy' ? 'selected' : ''}`} onClick={() => setDifficulty('easy')}>
                    easy
                </div>
                <div className={`medium ${difficulty === 'medium' ? 'selected' : ''}`} onClick={() => setDifficulty('medium')}>
                    medium
                </div>
                <div className={`hard ${difficulty === 'hard' ? 'selected' : ''}`} onClick={() => setDifficulty('hard')}>
                    hard
                </div>
            </div>
            <div className='start' onClick={start}>
                start
            </div>
        </div>
    );
}

export default MenuScreen;

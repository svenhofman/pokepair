function MenuScreen({ refCSSTransition, difficulty, setDifficulty, startGame }) {
    return (
        <div ref={refCSSTransition} className='menu'>
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
            <div className='start' onClick={startGame}>
                start
            </div>
        </div>
    );
}

export default MenuScreen;

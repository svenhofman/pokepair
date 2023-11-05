function EndScreen({ refCSSTransition, numGuesses, playAgain }) {
    return (
        <div ref={refCSSTransition} className='modal end-screen'>
            <div>well done!</div>
            <div>
                it took <span className='num-guesses'>{numGuesses['current']}</span> guesses
            </div>
            <hr />
            <div className='play-again' onClick={playAgain}>
                play again
            </div>
        </div>
    );
}

export default EndScreen;

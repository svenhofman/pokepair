function EndScreen({ refCSSTransition, numGuesses }) {
    return (
        <div ref={refCSSTransition} className='end-screen'>
            <div>Well done!</div>
            <div>
                It took <span className='num-guesses'>{numGuesses}</span> guesses
            </div>
        </div>
    );
}

export default EndScreen;

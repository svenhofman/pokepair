function ScoreBoard({ numGuesses }) {
    return (
        <div className='score-board'>
            <div className='num-guesses current'>guesses: {numGuesses['current']}</div>
            <div className='num-guesses best'>
                best:
                <div className='difficulty easy'>{numGuesses['easy'] < Infinity ? numGuesses['easy'] : '-'} (easy)</div>
                <div className='difficulty medium'>{numGuesses['medium'] < Infinity ? numGuesses['medium'] : '-'} (medium)</div>
                <div className='difficulty hard'>{numGuesses['hard'] < Infinity ? numGuesses['hard'] : '-'} (hard)</div>
            </div>
        </div>
    );
}

export default ScoreBoard;

function ScoreBoard({ numGuesses }) {
    return (
        <div className='score-board'>
            <div className='num-guesses current'>guesses: {numGuesses['current']}</div>
            <div className='num-guesses best'>
                best:
                <div className='difficulty easy'>{numGuesses['easy'] < Infinity ? numGuesses['easy'] : '-'} (easy)</div>
                <div className='difficulty medium'>{numGuesses['medium'] < Infinity ? numGuesses['medium'] : '-'} (medium)</div>
                <div className='difficulty hard'>{numGuesses['hard'] < Infinity ? numGuesses['hard'] : '-'} (hard)</div>
                {/*<div className='scores'>*/}
                {/*    <div className='difficulty easy'>*/}
                {/*        <div className='label'>easy</div>*/}
                {/*        <div className='score'>0</div>*/}
                {/*    </div>*/}
                {/*    <div className='difficulty medium'>*/}
                {/*        <div className='label'>medium</div>*/}
                {/*        <div className='score'>0</div>*/}
                {/*    </div>*/}
                {/*    <div className='difficulty hard'>*/}
                {/*        <div className='label'>hard</div>*/}
                {/*        <div className='score'>0</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default ScoreBoard;

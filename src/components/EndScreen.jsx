import { useEffect, useRef } from 'react';

function EndScreen({ numGuesses }) {
    const endScreenDiv = useRef(null);

    // Only runs once
    useEffect(() => {
        // Timeout so that it does not get batched together with class creation
        setTimeout(() => {
            endScreenDiv.current.classList.add('fade');
        }, 10);
    }, []);

    return (
        <div ref={endScreenDiv} className='end-screen'>
            <div>Well done!</div>
            <div>
                It took <span className='num-guesses'>{numGuesses}</span> guesses
            </div>
        </div>
    );
}

export default EndScreen;

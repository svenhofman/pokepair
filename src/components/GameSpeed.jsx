function GameSpeed({ gameSpeed, setGameSpeed }) {
    return (
        <div className='game-speed'>
            <div className={`slow ${gameSpeed === 'slow' ? 'selected' : ''}`} onClick={() => setGameSpeed('slow')}>
                slow
            </div>
            <div className={`regular ${gameSpeed === 'regular' ? 'selected' : ''}`} onClick={() => setGameSpeed('regular')}>
                regular
            </div>
            <div className={`fast ${gameSpeed === 'fast' ? 'selected' : ''}`} onClick={() => setGameSpeed('fast')}>
                fast
            </div>
        </div>
    );
}

export default GameSpeed;

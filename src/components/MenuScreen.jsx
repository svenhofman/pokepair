import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function MenuScreen({ refCSSTransition, difficulty, setDifficulty, startGame }) {
    return (
        <div className='menu-screen' ref={refCSSTransition} >
            <a  className='github-link' href='https://github.com/svenhofman/pokepair' target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faGithub} className='github-icon' />
            </a>
            <div className='modal menu'>
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
        </div>
    );
}

export default MenuScreen;

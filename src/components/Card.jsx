import pokemon_card_back from '../assets/pokemon_card_backside.png';
import pokemon_card_front from '../assets/pokemon_card_front.png';
function Card({ id, isVisible, url, onClick, speed }) {
    return (
        <div className={`card  ${isVisible ? 'flip' : ''}`} onClick={() => onClick(id)} style={{ 'transition-duration': `${speed}ms` }}>
            <img src={pokemon_card_back} alt='' className='shown-side' />
            <img src={pokemon_card_front} alt='' className='hidden-side template' />
            <img src={url} alt='' className='hidden-side pokemon' />
        </div>
    );
}

export default Card;

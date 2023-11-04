import pokemon_card_back from '../assets/pokemon_card_backside.png';
import pokemon_card_front from '../assets/pokemon_card_front.png';
function Card({ id, isVisible, url, onClick, speed }) {
    return (
        <div className={`card  ${isVisible ? 'flip' : ''}`} onClick={() => onClick(id)} style={{ transitionDuration: `${speed}ms` }}>
            <div className='modal shown-side' />
            <div className='modal hidden-side' />
            <img src={url} alt='' className='hidden-side pokemon' />
        </div>
    );
}

export default Card;

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

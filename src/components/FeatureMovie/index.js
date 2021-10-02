import React from 'react';
import './FeatureMovie.css';
import MovieRow from '../MovieRow';

export default ({item}) => {
    
    let firstDate = new Date(item.first_air_date);
    let genres = [];

    for(let i in item.genres){
        genres.push( item.genres[i].name);
    }

    let certificationImage = [];
    switch(item.certification){
        case 'L':
            certificationImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/240px-DJCTQ_-_L.svg.png';
        break;
        case '10':
            certificationImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/240px-DJCTQ_-_10.svg.png';
        break;
        case '12':
            certificationImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DJCTQ_-_12.svg/240px-DJCTQ_-_12.svg.png';
        break;
        case '14':
            certificationImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/240px-DJCTQ_-_14.svg.png';
        break;    
        case '16':
            certificationImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/240px-DJCTQ_-_16.svg.png';
        break;
        case '18':
            certificationImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/DJCTQ_-_18.svg/240px-DJCTQ_-_18.svg.png';
        break;
        default:
            certificationImage = null;
        break;        
    }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        {(certificationImage) ? <div className="featured--certification"><img src={certificationImage}></img></div> : '' }
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton" >▶ Assistir</a>
                        <a href={`/list/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
    )
}
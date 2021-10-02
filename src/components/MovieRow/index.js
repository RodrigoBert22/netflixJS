import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tmdb from '../../Tmdb';
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

export default ({title, items}) => {
    
    const [videoId, setVideoId] = useState("");
    
    const [isOpen, setOpen] = useState(false);
   
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0
        }
        
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60;
        }

        setScrollX(x);
    }

    const playMovie = async (movieId) => {
        let getMovieTrailer = await Tmdb.getMovieTrailer(movieId);
        setVideoId(getMovieTrailer);
        setOpen(true);
    }
    
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize:50}}/>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize:50}}/>
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                {items.results.length > 0 && items.results.map((item, key)=>(
                    <div key={key} className="movieRow--item">
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} onClick={() => playMovie(item.id)}/>              
                    </div>
                ))}
                <React.Fragment>
                    <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId={videoId} onClose={() => setOpen(false)} />
                </React.Fragment>  
                </div>
            </div>
        </div>
    )
}
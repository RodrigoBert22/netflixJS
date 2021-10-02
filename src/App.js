import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css'
import Header from './components/Header'
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';

export default () => {

  const [MovieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(() =>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(x => x.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      let movieCertification = await Tmdb.getMovieCertification(chosen.id, 'tv');
      let certification = movieCertification.results.find(x => x.iso_3166_1 === 'BR')

      if(certification){ 
      chosenInfo["certification"] = [];
      chosenInfo.certification = certification.rating;
      }

      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featureData &&
      <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {MovieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coracao">❤️</span> por Rodrigo Bertolini<br/>
        Direitos de Imagem para Netflix, Amazon e Paramount<br/>
        Dados obtidos de TheMovieDB.org
      </footer>

      {MovieList.length <= 0 &&    
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando"></img>
      </div>
      }
    </div>
  );
}
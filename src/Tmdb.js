const API_KEY = 'a0c07568f0868f4eae0ef6ac28585859';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
    return [
        {
            slug: 'originals',
            title: 'Originais Netflix',
            items: await basicFetch(`/discover/tv?api_key=${API_KEY}&with_networks=213&language=pt-BR`)
        },
        {
            slug: 'amazon',
            title: 'Originais Amazon Prime Video',
            items: await basicFetch(`/discover/tv?api_key=${API_KEY}&with_networks=1024&language=pt-BR`)
        },
        {
            slug: 'paramount',
            title: 'Paramount+',
            items: await basicFetch(`/discover/tv?api_key=${API_KEY}&with_networks=4330&language=pt-BR`)
        },
        {
            slug: 'trending',
            title: 'Recomendados para Você',
            items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&language=pt-BR`)
        },
        {
            slug: 'toprated',
            title: 'Em Alta',
            items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}&language=pt-BR`)
        },
        {
            slug: 'action',
            title: 'Ação',
            items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=28`)
        },
        {
            slug: 'comedy',
            title: 'Comédia',
            items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=35`)
        },
        {
            slug: 'horror',
            title: 'Terror',
            items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=27`)
        },
        {
            slug: 'documentary',
            title: 'Documentários',
            items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=99`)
        }
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
           switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?api_key=${API_KEY}&language=pt-BR`);
                break;
                default:
                    info = null;
                break;    
                }
            }

        return info;
    },
    getMovieCertification: async (movieId, type) =>{
        let certification = {};

        if(movieId){
            switch(type){
                case 'tv':
                    certification = await basicFetch(`/tv/${movieId}/content_ratings?api_key=${API_KEY}`);
                break;
                case 'movie':
                    certification = await basicFetch(`/movie/${movieId}/release_dates`);
                break;
                default:
                    certification = null;
                break;
            }
        }

        return certification;
    },
    getMovieTrailer: async (movieId) =>{     
        let trailerInfo = await basicFetch(`/tv/${movieId}/videos?api_key=${API_KEY}`);
        
        if(trailerInfo.success == false) return "";

        let trailerHost = trailerInfo.results[0].site.toString().toLowerCase();
        let trailerLink = {};

        switch(trailerHost){
        case "youtube":
            trailerLink = trailerInfo.results[0].key;
            break;
        case "vimeo":
            trailerLink = trailerInfo.results[0].key;
            break;
        default:
            trailerLink = null;
            break;
        }  
        
        return trailerLink;
    }

}    
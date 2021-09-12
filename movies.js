let axios = require('axios')
let moviesobj = {}
let Forecastmovie=require('./Forcastmovie')
// function gettingmovies(req, res) {
//     let name = req.query.name;
//     if(moviesobj[name]==undefined){
//         let urlmovies = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIE_API_KEY}`;
//     axios
//         .get(urlmovies)
//         .then(arrmovies => {
//             let newmovie = arrmovies.data.results.map(item => {
//                 return new Forecast(item);})
//             moviesobj[name]=newmovie
//             res.send(newmovie)})
//         .catch(err => console.log(err))

//     function Forecast(day) {
//         this.title = day.original_title,
//             this.overview = day.overview,
//             this.average_votes = day.vote_average,
//             this.total_votes = day.vote_count,
//             this.popularity = day.popularity,
//             this.released_on = day.release_date;}}

//     else {res.send(moviesobj[name])}}
function gettingmovies(req, res) {
    let name = req.query.name;
    if (moviesobj[name] !== undefined) {
        res.send(moviesobj[name])
    }

    else {
        let urlmovies = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIE_API_KEY}`;
        
        console.log(urlmovies)
        axios
            .get(urlmovies)
            .then(arrmovies => {
                let newmovie = arrmovies.data.results.map(item => {
                    return new Forecastmovie(item);
                })
                moviesobj[name] = newmovie
                res.send(newmovie)
            })
            .catch(err => console.log(err))

        
    }
}

module.exports = gettingmovies

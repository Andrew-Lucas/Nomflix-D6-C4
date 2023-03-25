const API_KEY = '895ee484ebb6fdb5a120ee7e91e9e718'

export type IAPIResults = {
  backdrop_path: string
  id: number
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  title: string
  name: string
  original_name: string
  first_air_date: string
  vote_average: number
  popularity: number
  original_language: string
  vote_count: number
  origin_country: string[]
}
export interface IApiMovieORTv {
  dates: { maximum: string; minimum: string }
  page: number
  results: IAPIResults[]
  total_pages: number
  total_results: number
}
//movies
export function getPopularMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getUpcomingMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getTopRatedMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

//tvShows
export function getPopularTV() {
  return fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getTopRatedTV() {
  return fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getAiringTodayTV() {
  return fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

export function getLatestTV() {
  return fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json())
}

//search
export function searchMovie(keyword: string) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=true`
  ).then((response) => response.json())
}

export function searchTv(keyword: string) {
  return fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&page=1&query=${keyword}&include_adult=true`
  ).then((response) => response.json())
}

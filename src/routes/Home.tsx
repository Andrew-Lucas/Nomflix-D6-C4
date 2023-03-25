import { useQuery } from 'react-query'
import styled from 'styled-components'
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IApiMovieORTv,
} from '../api'
import { makeImage } from '../utils'
import { useMatch } from 'react-router-dom'
import Slider from '../components/Slider'
import SkeletonLoader from '../components/SkeletonLoader'
import OverLayPopupComponent from '../components/OverLay&Popup'

const Wrapper = styled.main``

const Banner = styled.main<{ coverimage: string }>`
  height: 100vh;
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), ${({theme})=> theme.dark.normalDark}),
    url(${({ coverimage }) => coverimage});
  background-size: cover;
`
const CoverMovieTitle = styled.h1`
  font-size: 10vh;
  font-weight: 600;
  margin-bottom: 25px;
`
const CoverMovieOverview = styled.h2`
  font-size: 3vh;
  width: 50%;
`

const LatestMovies = styled.section`
  position: relative;
  margin-bottom: 25px;
`
const UpcomingMovies = styled.section`
  position: relative;
  bottom: -200px;
  margin-bottom: 25px;
`
const TopratedMovies = styled.section`
  position: relative;
  bottom: -400px;
`
const CategoryHeading = styled.h2`
  position: absolute;
  top: -80%;
  margin-left: 15px;
  font-size: 45px;
  font-weight: 700;
`

function Home() {
  const useMultipleQueries = () => {
    const popular = useQuery<IApiMovieORTv>(
      ['Popular', 'Movies'],
      getPopularMovies
    )
    const upcoming = useQuery<IApiMovieORTv>(
      ['Upcoming', 'Movies'],
      getUpcomingMovies
    )
    const toprated = useQuery<IApiMovieORTv>(
      ['TopRated', 'Movies'],
      getTopRatedMovies
    )
    return [popular, upcoming, toprated]
  }

  const [
    { isLoading: loadingPopular, data: popularMovies },
    { isLoading: loadingUpcoming, data: upcomingMovies },
    { isLoading: loadingToprated, data: topratedMovies },
  ] = useMultipleQueries()

  const isPopup = useMatch('/movie/:movieId')
  console.log(isPopup?.params.movieId)

  const clickedMovie =
    (isPopup?.params.movieId &&
      popularMovies?.results.find(
        (movie) => movie.id + '' === isPopup?.params.movieId
      )) ||
    topratedMovies?.results.find(
      (movie) => movie.id + '' === isPopup?.params.movieId
    ) ||
    popularMovies?.results.find(
      (movie) => movie.id + '' === isPopup?.params.movieId
    )

  return (
    <Wrapper>
      {loadingPopular || loadingUpcoming || loadingToprated ? (
        <SkeletonLoader />
      ) : upcomingMovies || popularMovies || topratedMovies ? (
        <>
          <Banner
            coverimage={makeImage(
              popularMovies?.results[0].backdrop_path || ''
            )}>
            <CoverMovieTitle>{popularMovies?.results[0].title}</CoverMovieTitle>
            <CoverMovieOverview>
              {popularMovies?.results[0].overview}
            </CoverMovieOverview>
          </Banner>

          <LatestMovies>
            <CategoryHeading>Latest Movies</CategoryHeading>
            <Slider component={popularMovies} idURL="movie" />
          </LatestMovies>

          <UpcomingMovies>
            <CategoryHeading>Upcoming Movies</CategoryHeading>
            <Slider component={upcomingMovies} idURL="movie" />
          </UpcomingMovies>

          <TopratedMovies>
            <CategoryHeading>Top Rated Movies</CategoryHeading>
            <Slider component={topratedMovies} idURL="movie" />
          </TopratedMovies>

          <OverLayPopupComponent
            isPopup={isPopup}
            clickedComponent={clickedMovie}
            backURL="/"
          />
        </>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

export default Home

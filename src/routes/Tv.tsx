import { useQuery } from 'react-query'
import styled from 'styled-components'
import {
  getAiringTodayTV,
  getLatestTV,
  getPopularTV,
  getTopRatedTV,
  IApiMovieORTv,
} from '../api'
import { makeImage } from '../utils'
import { useLocation } from 'react-router-dom'
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
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      ${({ theme }) => theme.dark.normalDark}
    ),
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

const TopratedTV = styled.section`
  position: relative;
  margin-bottom: 25px;
`
const AiringTodayTV = styled.section`
  position: relative;
  bottom: -200px;
  margin-bottom: 25px;
`
const LatestTV = styled.section`
  position: relative;
  bottom: -400px;
`
const PopularTv = styled.section`
  position: relative;
  bottom: -600px;
`
const CategoryHeading = styled.h2`
  position: absolute;
  top: -80%;
  margin-left: 15px;
  font-size: 45px;
  font-weight: 700;
`

function Tv() {
  const useMultipleQueries = () => {
    const toprated = useQuery<IApiMovieORTv>(['TopRated', 'TV'], getTopRatedTV)
    const popular = useQuery<IApiMovieORTv>(['Popular', 'TV'], getPopularTV)
    const airing = useQuery<IApiMovieORTv>(['Airing', 'TV'], getAiringTodayTV)
    const latest = useQuery<IApiMovieORTv>(['Latest', 'TV'], getLatestTV)

    return [toprated, popular, airing, latest]
  }

  const [
    { isLoading: loadingPopular, data: popularTV },
    { isLoading: loadingToprated, data: topratedTV },
    { isLoading: loadingAiring, data: airingTV },
    { isLoading: loadingLatest, data: latestTV },
  ] = useMultipleQueries()

  const isPopup = useMatch('/tvShow/:movieId')

  console.log(useLocation())
  console.log(isPopup?.params.movieId)

  const clickedMovie =
    (isPopup?.params.movieId &&
      popularTV?.results.find(
        (movie) => movie.id + '' === isPopup?.params.movieId
      )) ||
    topratedTV?.results.find(
      (movie) => movie.id + '' === isPopup?.params.movieId
    ) ||
    airingTV?.results.find(
      (movie) => movie.id + '' === isPopup?.params.movieId
    ) ||
    latestTV?.results.find((movie) => movie.id + '' === isPopup?.params.movieId)

  return (
    <Wrapper>
      {loadingPopular || loadingAiring || loadingToprated || loadingLatest ? (
        <SkeletonLoader />
      ) : (
        <>
          <Banner
            coverimage={makeImage(topratedTV?.results[0].backdrop_path || '')}>
            <CoverMovieTitle>{topratedTV?.results[0].name}</CoverMovieTitle>
            <CoverMovieOverview>
              {topratedTV?.results[0].overview}
            </CoverMovieOverview>
          </Banner>
          <TopratedTV>
            <CategoryHeading>Top Rated TV Shows</CategoryHeading>
            <Slider component={topratedTV} idURL="tvShow" />
          </TopratedTV>

          <AiringTodayTV>
            <CategoryHeading>Tv Shows on air today</CategoryHeading>
            <Slider component={airingTV} idURL="tvShow" />
          </AiringTodayTV>

          <LatestTV>
            <CategoryHeading>Latest TV Shows</CategoryHeading>
            <Slider component={latestTV} idURL="tvShow" />
          </LatestTV>

          <PopularTv>
            <CategoryHeading>Popular TV Shows</CategoryHeading>
            <Slider component={popularTV} idURL="tvShow" />
          </PopularTv>

          <OverLayPopupComponent
            isPopup={isPopup}
            clickedComponent={clickedMovie}
            backURL="/tv"
          />
        </>
      )}
    </Wrapper>
  )
}

export default Tv

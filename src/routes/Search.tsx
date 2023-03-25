import { useQuery } from 'react-query'
import styled from 'styled-components'
import { IApiMovieORTv, searchMovie, searchTv } from '../api'
import { SearchedKeyword } from '../utils'
import { useLocation, useParams } from 'react-router-dom'
import { useMatch } from 'react-router-dom'
import Slider from '../components/Slider'
import { useRecoilState } from 'recoil'
import OverLayPopupComponent from '../components/OverLay&Popup'
import SearchLoader from '../components/SearchLoader'

const Wrapper = styled.main`
  margin-top: 100px;
`

const Movies = styled.section`
  position: relative;
  bottom: -270px;
`
const TVShows = styled(Movies)`
  bottom: -500px;
`

const CategoryHeading = styled.h2`
  position: absolute;
  top: -80%;
  margin-left: 15px;
  font-size: 45px;
  font-weight: 700;
`

function Search() {
  const { search } = useLocation()
  const [keyword, setKeyword] = useRecoilState(SearchedKeyword)
  setKeyword(new URLSearchParams(search).get('keyword') || '')

  const useMultipleQueries = () => {
    const movies = useQuery<IApiMovieORTv>(['Searched', 'Movies'], () =>
      searchMovie(keyword!)
    )
    const tv = useQuery<IApiMovieORTv>(['Searched', 'TvShows'], () =>
      searchTv(keyword!)
    )
    return [movies, tv]
  }

  const [
    { isLoading: loadingMovies, data: movies },
    { isLoading: loadingTV, data: Tvs },
  ] = useMultipleQueries()

  const isPopup = useMatch(`search/result/:itemId`)

  console.log(useParams())
  console.log(isPopup?.params.itemId)

  const clickedItem =
    (isPopup?.params.itemId &&
      movies?.results.find(
        (movie) => movie.id + '' === isPopup?.params.itemId
      )) ||
    Tvs?.results.find((tv) => tv.id + '' === isPopup?.params.itemId)

  console.log(movies?.results, Tvs?.results)

  return (
    <Wrapper>
      {loadingMovies || loadingTV ? (
        <SearchLoader />
      ) : (
        <>
          {movies?.results.length === 0 ? (
            <h1>There are no movies that matched your search</h1>
          ) : (
            <Movies>
              <CategoryHeading>Movies</CategoryHeading>
              <Slider component={movies} idURL={`search/result`} />
            </Movies>
          )}
          {Tvs?.results.length === 0 ? (
            <h1>There are no Tv Shows that matched your search</h1>
          ) : (
            <TVShows>
              <CategoryHeading>TV Shows</CategoryHeading>
              <Slider component={Tvs} idURL={`search/result`} />
            </TVShows>
          )}

          <OverLayPopupComponent
            itemPopup={isPopup}
            clickedComponent={clickedItem}
            backURL={`/search?keyword=${keyword}`}
          />
        </>
      )}
    </Wrapper>
  )
}

export default Search

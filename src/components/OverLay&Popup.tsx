import { AnimatePresence, motion } from 'framer-motion'
import { PathMatch, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IAPIResults } from '../api'
import { makeImage } from '../utils'

const PopupOverlay = styled(motion.main)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1px;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`
const PopupMovie = styled(motion.section)`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  height: 73vh;
  min-height: 670px;
  width: 37vw;
  min-width: 450px;
  background-color: ${({ theme }) => theme.dark.lightDark};
  border-radius: 25px !important;
  overflow: hidden;
`
const PopupCoverImage = styled.div`
  height: 50%;
  background-size: cover;
`
const PopupTitle = styled.h3`
  margin-top: -7%;
  margin-bottom: 3%;
  font-size: 35px;
  font-weight: bold;
  padding: 0 3%;
`
const Language = styled.article`
  font-size: 19px;
  margin-bottom: 1.3%;
  span {
    font-weight: 600;
    margin-right: 2.5px;
  }
`
const OriginalTitle = styled(Language)``
const PopupOverview = styled.p`
  font-size: 17px;
  margin-bottom: 1.3%;
`
const ReleaseDate = styled(Language)``
const VoteAvarage = styled(Language)``
const VoteCount = styled(Language)``
const Popularity = styled(Language)``
const Countries = styled.span`
  font-weight: 600;
`

interface IOverLayPopupComponent {
  isPopup?: PathMatch<'movieId'> | null
  itemPopup?: PathMatch<'itemId'> | null
  clickedComponent: IAPIResults | undefined
  backURL: string
}
function OverLayPopupComponent({
  isPopup,
  itemPopup,
  clickedComponent,
  backURL,
}: IOverLayPopupComponent) {
  const changeUrl = useNavigate()

  return (
    <AnimatePresence>
      {isPopup || itemPopup ? (
        <>
          <PopupOverlay
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => changeUrl(backURL)}></PopupOverlay>
          <PopupMovie
            layoutId={isPopup?.params.movieId || itemPopup?.params.itemId}>
            {clickedComponent && (
              <>
                <PopupCoverImage
                  style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .25)), url(${makeImage(
                      clickedComponent.backdrop_path ||
                        clickedComponent.poster_path
                    )})`,
                  }}
                />
                <PopupTitle>
                  {clickedComponent.title || clickedComponent.name}
                </PopupTitle>
                <div
                  style={{
                    height: '45%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    padding: '0 10px',
                  }}>
                  <Language>
                    <span>Original Language: </span>
                    {clickedComponent.original_language}
                  </Language>
                  <OriginalTitle>
                    <span>Original Name:</span>

                    {clickedComponent.original_title ||
                      clickedComponent.original_name}
                  </OriginalTitle>
                  <PopupOverview>{clickedComponent.overview}</PopupOverview>
                  <ReleaseDate>
                    <span>Release Date:</span>

                    {clickedComponent.release_date ||
                      clickedComponent.first_air_date}
                  </ReleaseDate>
                  <VoteAvarage>
                    <span>Vote Avarage:</span>
                    {clickedComponent.vote_average}
                  </VoteAvarage>
                  <VoteCount>
                    <span>Vote Count:</span> {clickedComponent.vote_count}
                  </VoteCount>
                  <Popularity>
                    <span>Popularity:</span> {clickedComponent.popularity}
                  </Popularity>
                  {clickedComponent.origin_country && (
                    <>
                      <Countries>Original country(s): </Countries>
                      {clickedComponent.origin_country.map((country, index) => (
                        <span key={index}>{country},</span>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </PopupMovie>
        </>
      ) : (
        ''
      )}
    </AnimatePresence>
  )
}

export default OverLayPopupComponent

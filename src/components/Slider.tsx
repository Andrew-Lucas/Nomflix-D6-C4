import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IApiMovieORTv } from '../api'
import { makeImage } from '../utils'

const SliderHolder = styled.div`
  position: relative;
  height: 25vh;
  min-height: 300px;
`
const SliderRow = styled(motion.div)`
  position: absolute;
  top: -10vh;
  height: 100%;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  div:first-child {
    transform-origin: center left !important;
  }
  div:last-child {
    transform-origin: center right !important;
  }
`
const sliderRowVariant = (isNext: boolean) => {
  return {
    initial: { x: isNext ? window.innerWidth + 10 : -window.innerWidth + 10 },
    animate: { x: 0 },
    exit: { x: isNext ? -window.innerWidth - 10 : window.innerWidth + 10 },
  }
}

const SlideItem = styled(motion.div)<{ posterimage: string }>`
  height: 100%;
  min-height: 270px;
  /*   background-image: url(${({ posterimage }) => posterimage}); */
  background-image: ${({ posterimage }) =>
    posterimage ? `url(${posterimage})` : ''};
  background-size: cover;
  background-color: ${({ posterimage }) => (!posterimage ? `white` : '')};
  border-radius: 7px;
`
const slideItemVariant = {
  onHover: {
    scale: 1.15,
    borderRadius: '15px',
    transition: { delay: 0.2, duration: 0.25 },
  },
}

const ItemInfo = styled(motion.div)`
  position: relative;
  bottom: -97%;
  background-color: ${({ theme }) => theme.dark.lightDark};
  width: 100%;
  opacity: 0;
  display: none;
  padding: 15px;
  text-align: center !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`
const ItemInfoVariant = {
  onHover: {
    opacity: 1,
    display: 'flex',
    transition: { delay: 0.2, duration: 0.25 },
  },
}

interface iSlider {
  component: IApiMovieORTv | undefined
  idURL: string
}
function Slider({ component, idURL }: iSlider) {
  const ofset = 6
  const [slideIndex, setSlideIndex] = useState(0)

  const [leaving, setLeaving] = useState(false)
  const [isNext, setNext] = useState(true)

  const totalMovies = component?.results.length! - 1
  const maxIndex = Math.floor(totalMovies / ofset) - 1

  const changeUrl = useNavigate()
  return (
    <>
      <SliderHolder>
        <AnimatePresence
          initial={false}
          onExitComplete={() => setLeaving(false)}>
          <SliderRow
            key={slideIndex}
            variants={sliderRowVariant(isNext)}
            transition={{ duration: 1.5, type: 'tween' }}
            initial="initial"
            animate="animate"
            exit="exit">
            {component?.results
              .slice(1)
              .slice(ofset * slideIndex, ofset * slideIndex + ofset)
              .map((movie) => (
                <SlideItem
                  onClick={() => changeUrl(`/${idURL}/${movie.id}`)}
                  variants={slideItemVariant}
                  layoutId={movie.id + ''}
                  whileHover="onHover"
                  posterimage={makeImage(
                    movie.poster_path || movie.backdrop_path,
                    'w500'
                  )}
                  key={movie.id}>
                  <ItemInfo variants={ItemInfoVariant}>{movie.title}</ItemInfo>
                </SlideItem>
              ))}
          </SliderRow>
        </AnimatePresence>
      </SliderHolder>
      {slideIndex !== 0 && (
        <FontAwesomeIcon
          size="2x"
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: 25,
            top: '-57%',
          }}
          icon={faArrowLeft}
          onClick={() => {
            if (component) {
              if (leaving) return
              setNext(false)
              setLeaving(true)
              setSlideIndex((prev) => (prev === 0 ? 0 : prev - 1))
            }
          }}
        />
      )}

      {slideIndex !== maxIndex && (
        <FontAwesomeIcon
          size="2x"
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: 25,
            top: '-57%',
          }}
          icon={faArrowRight}
          onClick={() => {
            if (component) {
              if (leaving) return
              setLeaving(true)
              setNext(true)
              setLeaving(true)
              setSlideIndex((prev) => (prev === maxIndex ? maxIndex : prev + 1))
            }
          }}
        />
      )}
    </>
  )
}

export default Slider

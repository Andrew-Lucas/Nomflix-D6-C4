import { motion, useAnimation, useViewportScroll } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Column1,
  Column2,
  HomeLink,
  Nav,
  SearchForm,
  SearchIcon,
  SearchInput,
  TVShowLink,
} from './styles/HeaderStyle'
import NomflixLogo from './NomflixLogo'
import { useForm } from 'react-hook-form'

const navVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
}

const searchInputVariant = {
  hidden: { scaleX: 0, opacity: 0 },
}

function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isTVShow = pathname === '/tv'

  const [showSearch, setShowSearch] = useState(false)
  const toogleSearch = () => setShowSearch((prev) => !prev)

  const navAnimation = useAnimation()
  const { scrollY } = useViewportScroll()
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 70) {
        navAnimation.start('scroll')
      } else {
        navAnimation.start('top')
      }
    })
  }, [scrollY, navAnimation])

  const goTo = useNavigate()
  const { register, handleSubmit } = useForm<{ keyword: string }>()
  const onValid = ({ keyword }: { keyword: string }) => {
    console.log(keyword)
    goTo(`/search?keyword=${keyword}`)
  }

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={'top'}>
      <Column1>
        <NomflixLogo />
        <HomeLink>
          <Link to="/">Home</Link>
          {isHome && <motion.div layoutId="activePage" />}
        </HomeLink>
        <TVShowLink>
          <Link to="/tv">TV Shows</Link>
          {isTVShow && <motion.div layoutId="activePage" />}
        </TVShowLink>
      </Column1>
      <Column2>
        <SearchForm onSubmit={handleSubmit(onValid)}>
          <SearchInput
            {...register('keyword', { required: true, minLength: 1 })}
            placeholder="Search for movies & TV Shows"
            variants={searchInputVariant}
            initial="hidden"
            animate={{
              scaleX: showSearch ? 1 : 0,
              opacity: 1,
              transformOrigin: 'right center',
              transition: { duration: 0.45 },
            }}
          />
          <SearchIcon
            animate={{
              left: !showSearch ? '100%' : '',
              transition: { duration: 0.45 },
            }}
            onClick={toogleSearch}
            viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </SearchIcon>
        </SearchForm>
      </Column2>
    </Nav>
  )
}

export default Header

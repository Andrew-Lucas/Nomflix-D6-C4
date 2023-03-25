import { motion } from 'framer-motion'
import styled from 'styled-components'

//<NavComponent>
export const Nav = styled(motion.nav)`
  z-index: 7;
  position: fixed;
  top: 0%;
  height: 7vh;
  padding: 0 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

//First Column...
export const Column1 = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 25px;
  align-items: center;
`

export const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 100px;
  height: 3vh;
  fill: ${({ theme }) => theme.red};
  path {
    stroke-width: 6px;
    stroke: red;
  }
`
export const HomeLink = styled.div`
  position: relative;
  color: ${({ theme }) => theme.light.brighter};
  a {
    font-size: 1.5vh;
  }
  div {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.red};
    height: 0.7vh;
    width: 0.7vh;
    border-radius: 50%;
  }
`
export const TVShowLink = styled(HomeLink)``

//Second Column...
export const Column2 = styled(Column1)`
  width: 30%;
`

//<Search>
export const SearchForm = styled.form`
  display: flex;
  position: relative;
  padding: 10px;
`

export const SearchInput = styled(motion.input)`
  height: 5vh;
  max-height: 40px;
  width: 17vw;
  max-width: 350px;
  padding-left: 12%;
  font-size: 20px;
  color: ${({ theme }) => theme.light.brighter};
  border-radius: 10px;
  outline: none;
  border: solid 1px grey;
  background-color: transparent;
`
export const SearchIcon = styled(motion.svg)`
  top: 33%;
  left: 6%;
  position: absolute;
  height: 2.5vh;
  max-height: 20px;
  cursor: pointer;
  fill: ${({ theme }) => theme.light.brighter} !important;
`
//</Search>

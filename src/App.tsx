import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './themes'
import GlobalStyle from './components/styles/GlobalStyle'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Tv from './routes/Tv'
import Search from './routes/Search'
import Header from './components/Header'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Header />
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/movie/:movieId'} element={<Home />} />

            <Route path="/tv" element={<Tv />} />
            <Route path={'/tvShow/:movieId'} element={<Tv />} />

            <Route path="/search" element={<Search />} />
            <Route path="search/result/:itemId" element={<Search />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App

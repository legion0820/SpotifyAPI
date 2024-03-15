import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function App({ children }) {
  return (
    <>
        <nav>
            <h1>Spotify App</h1>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/topsongs">Top Songs</NavLink></li>
                <li><NavLink to="/recommended">Recommended</NavLink></li>
                <li><NavLink to="/search">Search</NavLink></li>
            </ul>
        </nav>
        <main>
            { children || <Outlet /> }
        </main>
    </>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Global, css } from '@emotion/react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './App'
import SearchPage from './Search'
import TopSongsPage from './TopSongs'
import RecommendationsPage from './Recommendations'
import ProfilePage from './Profile'
import ErrorPage from './ErrorPage'
import HomePage from './HomePage'

//Font Awesome source used for icons: https://fontawesome.com/
//Font Source: https://fonts.google.com/specimen/Ubuntu
const globalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
    html {
        font-family: "Fredoka", sans-serif;
    }
    body {
        margin: 0px;
}
`

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Root><ErrorPage/></Root>,
        children: [
            {
                path:"/",  
                element: <HomePage/>
            },
            {
                path: "/search",
                element: <SearchPage/>
            },
            {
                path: "/topSongs",
                element: <TopSongsPage/>
            },
            {
                path: "/recommendations",
                element: <RecommendationsPage/>
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            }
        ]
    }
])
//Source used to fix double rendering with StrictMode: 
//https://support.boldreports.com/kb/article/12888/how-to-prevent-methods-from-being-called-twice-in-react#:~:text=To%20fix%20this%20issue%2C%20you,methods%20from%20being%20called%20twice.
ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <Global styles={globalStyles}/>
        <RouterProvider router={router}/>
    </>
)

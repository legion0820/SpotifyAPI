import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import TopSongs from './components/TopSongs.jsx'
import Recommended from './components/Recommended.jsx'
import Search from './components/Search.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "/topsongs", element: <TopSongs /> },
            { path: "/recommended", element: <Recommended /> },
            { path: "/search", element: <Search /> },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)

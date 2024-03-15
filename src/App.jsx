import { NavLink, Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

//Spinner source is provided in compnents/Spinner.jsx
import Spinner from "../components/Spinner";

export default function Root(props) {
    //children is used to show error for invalid routes
    const { children } = props
    //Used to show/hide loading spinner
    const { state } = useNavigation()

    return (
        <>
            <ScrollRestoration/> 
            <nav>
                <ul id="nav-bar">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/topSongs">Top Songs</NavLink></li>
                    <li><NavLink to="/search">Search</NavLink></li>
                    <li><NavLink to="profile">Profile</NavLink></li>
                    <li><NavLink to="/recommendations">Recommendations</NavLink></li>
                </ul>
            </nav>
            {(state == "loading") && <Spinner />}
            <div>{children || <Outlet/>}</div>
        </>
        
    )
}

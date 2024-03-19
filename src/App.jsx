import { NavLink, Outlet, useNavigation } from "react-router-dom";
import { useState } from "react";

//Spinner source is provided in compnents/Spinner.jsx
import Spinner from "../components/Spinner";
import styled from "@emotion/styled";
import './index.css'


const Nav = styled.nav`
    background-color: #1ff434;
    display: flow-root;
    box-shadow: 0px 5px 18px 10px #1ff434;
    margin-bottom: 120px;
`

const Ul = styled.ul`
    display: flex;
    margin-top: 30px;
    list-style-type: none;
    justify-content: space-around;
        
`

const Li = styled.li`
        
`

const Footer = styled.footer`
    bottom: 0px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    padding: 13px;
    padding-left: 0px;
    background-color: #bb9adc;
`
const Button2 = styled.button`
    border-radius: 100%;
    padding: 15px;
    position: fixed;
    bottom: 70px;
    right: 30px;
    z-index: 1;
    width: 60px;
    height: 60px;
    border: none;
    color: black;
    background-color: #bb9adc;
    &:hover {
        background-color: #04AA6D;
        
    }
`

export default function Root(props) {
    //children is used to show error for invalid routes
    const { children } = props
    //Used to show/hide loading spinner
    const { state } = useNavigation()

    //Sources used for button visibility:
    //https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
    //https://levelup.gitconnected.com/how-to-create-a-scroll-to-top-button-in-reactjs-7b2f2563d6b0
    const ScrollButton = () => {
        const [showButton, setShowButton] = useState(false)
        const handleScrollVisibility = () => {
            document.documentElement.scrollTop > 100 ? setShowButton(true) : setShowButton(false)
        }
        window.addEventListener('scroll', handleScrollVisibility)

        return (
            <Button2 style={{ display: showButton ? 'inline' : 'none' }} onClick={topFunction}><i className="fa-solid fa-arrow-up fa-xl" /></Button2>
        )

    }

    //Source used for "top" button: https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/
    function topFunction() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <Nav>
                <Ul id="nav-bar">
                    <Li><NavLink to="/" className="nav-link"><i className="fa-solid fa-right-to-bracket"/> Home/Log In</NavLink></Li>
                    <Li><NavLink to="/search" className="nav-link"><i className="fa-solid fa-magnifying-glass"/> Search</NavLink></Li>
                    <Li><NavLink to="/topSongs" className="nav-link"><i className="fa-solid fa-music"/> Top Songs</NavLink></Li>
                    <Li><NavLink to="/recommendations" className="nav-link"><i className="fa-solid fa-lightbulb"/> Recommendations</NavLink></Li>
                    <Li><NavLink to="profile" className="nav-link"><i className="fa-solid fa-user"/> Profile</NavLink></Li>
                    
                </Ul>
            </Nav>
            {(state == "loading") && <Spinner />}
            <div>{children || <Outlet/>}</div>
            <ScrollButton />
            <Footer >
                Spotify Data Powered by: <a href="https://developer.spotify.com/documentation/web-api"> developer.spotify.com</a>
            </Footer>
        </>
        
    )
}

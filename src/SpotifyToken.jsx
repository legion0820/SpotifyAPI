import RedirectToAuthCodeFlow from "./SpotifyLogInLink"
import GetToken from "./SpotifyAuthenticate"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "@emotion/styled"
import './index.css'

export let token

export const P = styled.p`
    margin-top: 100px;
    background-color:#bb9adc;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 11px #bb9adc;
`
export const Button = styled.button`
    margin-top: 60px;
    background-color: #1ff434;
    font-size: 25px;
    border-radius: 8px;
    border: 2px solid #bb9adc;
    padding: 7px;
    :hover {
        background-color: #04AA6D;
        cursor: pointer;

}
`
export const Div = styled.div`
    display: grid;
    justify-content: space-evenly;
    justify-items: center;
`


//Source used to obtain token is thanks to the lecture code provided by professor Hess at Oregon State University
export default function SpotifyToken() {
    const [ error, setError] = useState("")
    const [ success, setSuccess ] = useState(false)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const authCode = searchParams.get("code")

    useEffect(() => {
        async function ObtainToken() {
            SaveValues(await GetToken(authCode))

        }
        async function SaveValues(results) {
            setSuccess(results.success)
            setError(results.error)
            token = results.token
        }
        if (authCode) {
            ObtainToken()
          }
    }, [authCode])


    function LogIn(){

        return (
            <Div>
            <P>Begin by logging in with your Spotify Account to experience a new Spotify interface! </P>
            <Button id="log-in" onClick={() => RedirectToAuthCodeFlow()}>Log in with Spotify</Button>
            </Div>
        )
    }

    function LoggedIn() {
        return (
            <Div>
                <P style={{backgroundColor: "#1ff434", boxShadow: "0px 0px 10px 11px #1ff434"}}>Successfully Logged In <i className="fa-solid fa-check fa-bounce"/></P>
                <P style={{marginTop: "60px"}}>You can now enjoy navigating your personalized Spotify page from the available links above <i className="fa-regular fa-face-smile"/></P>
            </Div>
        )
    }
    
    
    return (
        <div>
            {error && <p>Error Encountered: {error}</p>}
            {(success || token) ? <LoggedIn/> : <LogIn/>}
        </div>
    )

    
}
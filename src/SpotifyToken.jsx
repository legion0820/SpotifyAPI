import RedirectToAuthCodeFlow from "./SpotifyLogInLink"
import GetToken from "./SpotifyAuthenticate"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export let token

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
    
    
    return (
        <div>
            {error && <p>Error Encountered: {error}</p>}
            {(success || token) ? <p>Success!</p> : <button onClick={() => RedirectToAuthCodeFlow()}>Log in with Spotify</button>}
        </div>
    )

    
}
import RedirectToAuthCodeFlow from "./SpotifyLogInLink"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

//Source used to obtain token is thanks to the lecture code provided by professor Hess at Oregon State University
export default function HomePage() {
    const [ error, setError] = useState("")
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ success, setSuccess ] = useState(false)
    const authCode = searchParams.get("code")
    const [ profileInfo, setProfileInfo ] = useState()

    //console.log("authentication Code: ", authCode)

    useEffect(() => {
        async function exchangeForAccessToken(code) {
            //console.log("Code: ", code)
            //console.log("exchange")
            const res = await fetch("/api/tokenExchange", {
                method: "POST",
                body: JSON.stringify({ code }),
                headers: { 
                    "Content-Type": "application/json"
                }
                
            })
            
            if (res.status !== 200) {
                
                setError(res.error)
              } else {
                const profile = (await res.json())
                //console.log(profile)
                
                if(profile.msg) {
                    setSuccess(true)
                    setProfileInfo(profile)
                } else {
                    //Try again to authenticate
                    RedirectToAuthCodeFlow()
                } 
              }
            }
            if (authCode) {
                exchangeForAccessToken(authCode)
              }
    }, [ authCode ])

    return (
        <div>
            {error && <p>Error Encountered: {error}</p>}
            {!success && <button onClick={() => RedirectToAuthCodeFlow()}>Log in with Spotify</button>}
            {profileInfo && <p>Welcome {profileInfo.msg.display_name}!</p>}
        </div>
    )

    
}
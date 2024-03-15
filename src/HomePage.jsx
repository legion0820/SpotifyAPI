import RedirectToAuthCodeFlow from "./SpotifyLogInLink"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

//Source used to obtain token is thanks to the lecture code provided by professor Hess at Oregon State University
export default function HomePage() {
    const [ error, setError] = useState("")
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ success, setSuccess ] = useState(false)
    const authCode = searchParams.get("code")
    const [ profileInfo, setProfileInfo ] = useState("")

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
                setSuccess(true)
                setProfileInfo(await res.json())
              }
            }
            if (authCode) {
                exchangeForAccessToken(authCode)
              }
    }, [ authCode ])

    return (
        <div>
            {error && <p>Error Encountered: {error}</p>}
            {!success && <RedirectToAuthCodeFlow />}
            {profileInfo && <p>Welcome {profileInfo.msg.display_name}!</p>}
        </div>
    )

    
}
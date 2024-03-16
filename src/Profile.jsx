import { useEffect, useState } from "react";
import { token } from "./SpotifyToken";
//Source used for useNavigate: https://reactrouter.com/en/main/hooks/use-navigate
import { useNavigate } from "react-router-dom";

export default function ProfilePage(){
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const navigate = useNavigate();

    useEffect(() => {

        async function FetchProfile(token) {
            const result = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            });
        
            SaveProfileInfo(await result.json())
        }
        async function SaveProfileInfo(results) {
            setName(results.display_name)
            setEmail(results.email)
        }
        if(token)
            FetchProfile(token)
    })

    return (
        <>
            <h1>Profile Page</h1>
            {!token && <button onClick={() => {navigate("/")}}>Log In First</button>}
            {name && <p>Hi {name}!</p>}
            {email && <p>Email: {email}</p>}
        </>
        
    )
}
import { useEffect, useState } from "react";
import { token } from "./SpotifyToken";
//Source used for useNavigate: https://reactrouter.com/en/main/hooks/use-navigate
import { useNavigate } from "react-router-dom";
import { H2 } from "./HomePage";
import { Div, Button, P } from "./SpotifyToken";
import styled from "@emotion/styled";


const P1 = styled.p`
    font-weight: bolder;
`

export default function ProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState("")
 
    useEffect(() => {
            async function fetchProfile(token) {
        try {
            const result = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            });

            if (!result.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const userProfile = await result.json()
            setUserData(userProfile)

        } catch (error) {
            console.error("Error loading user profile: ", error)
        }
    }
    if (token) {
        fetchProfile(token)
    }
    },[token])


    function LogIn() {
        return (
            <Div>
                <P>Please log in first to begin utilizing your personalized Spotify page.</P>
                <Button onClick={() => { navigate("/") }}>Redirect to log in</Button>
            </Div>
        )
    }

    function DisplayProfile() {
        return (
            <Div>
                
                <ul style={{marginBottom: "100px"}}>
                    {userData.images[1] && <img src={userData.images[1].url} alt="User Profile Image" width="100" height="100"/>}
                    <P1>Username:</P1> {userData.display_name}
                    <P1>Email:</P1> {userData.email}
                    <P1>Country:</P1> {userData.country}
                    <P1>Followers:</P1> {userData.followers.total}
                    <P1>Explicit Content Enabled:</P1> {(userData.explicit_content.filter_enabled) ? "True" : "False" }
                    <P1>Subscription:</P1> {userData.product}
                </ul>
                

            </Div>
        )
    }
    console.log(userData)

    return (
        <>
            <H2>Profile Page</H2>
            {!token && <LogIn/>}
            {userData && <DisplayProfile/>}
        </>

    )
}
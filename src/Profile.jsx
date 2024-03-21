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
const Ul = styled.ul`
    border-style: outset;
    padding: 50px;
    border-radius: 5px;
    // box-shadow: 0px 0px 19px 14px aqua;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px 30px 100px 30px;

`

const Div3 = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const P2 = styled.p`
    font-weight: bolder;
    text-decoration: underline;
`
const Div2 = styled.div`
    border-style: dotted;
    padding: 5px;
    border-radius: 5px;
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
            <Div3>
                {/* <Ul style={{ boxShadow: "0px 0px 19px 14px #1ff434", backgroundColor: "#1ff434", borderStyle: "none"}}> */}
                <Ul style={{ borderStyle: "none", backgroundColor: "#8c4eca"}}>
                    <P2>Fun Fact</P2>
                    <Div2>
                    <p>We are the worlds most popular </p>
                    <p>audio streaming subscription </p>
                    <p>service with more than 602</p>
                    <p>million users, including </p>
                    <p>236 million subscribers </p>
                    <p>in more than 180 markets.</p>
                    <br></br>
                    <p>-Spotify,</p>
                    <a href="https://newsroom.spotify.com/company-info/"> newsroom.spotify.com</a>
                    </Div2>

                </Ul>
                
                <Ul>
                    {userData.images[1] && <img src={userData.images[1].url} alt="User Profile Image" width="100" height="100"/>}
                    <P1>Username:</P1> {userData.display_name}
                    <P1>Email:</P1> {userData.email}
                    <P1>Country:</P1> {userData.country}
                    <P1>Followers:</P1> {userData.followers.total}
                    <P1>Explicit Content Enabled:</P1> {(userData.explicit_content.filter_enabled) ? "True" : "False" }
                    <P1>Subscription:</P1> {userData.product}
                </Ul>

                {/* <Ul style={{ boxShadow: "0px 0px 19px 14px #1ff434", backgroundColor: "#1ff434", borderStyle: "none"}}> */}
                <Ul style={{ borderStyle: "none", backgroundColor: "#8c4eca"}}>
                <P2>Fun Fact</P2>
                    <Div2>
                    <p>As per Spotify listening stats, </p>
                    <p>a ripple effect of this is </p>
                    <p>that around 60,000 songs enter </p>
                    <p>the Spotify platform on a </p>
                    <p>daily basis. </p>
                    <br></br>
                    <p>-Prateek Saxena,</p>
                    <a href="https://appinventiv.com/blog/spotify-statistics-facts/"> appinventiv.com</a>
                    </Div2>
                </Ul>
                
            </Div3>
        )
    }
    console.log(userData)

    return (
        <>
            <H2 style={{marginTop: "-30px", marginBottom: "50px"}}>Profile Page</H2>
            {!token && <LogIn/>}
            {userData && <DisplayProfile/>}
        </>

    )
}
import styled from "@emotion/styled"
import SpotifyToken from "./SpotifyToken"
    
    
export const H2 = styled.h2`
    display: flex;
    justify-content: space-evenly;
    font-size: 35px;
`

export default function HomePage() {

    return (
        <>
            <H2>
                <i className="fa-solid fa-headphones fa-bounce"/>
                Welcome to your personal Spotify page
                <i className="fa-solid fa-headphones fa-bounce"/>
            </H2>
            <SpotifyToken/>
        </>
        

    )
}
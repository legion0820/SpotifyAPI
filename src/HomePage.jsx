import styled from "@emotion/styled"
import SpotifyToken from "./SpotifyToken"
    
export const H2 = styled.h2`
    //width: 60%;
    display: flex;
    justify-content: space-evenly;
    font-size: 35px;
`


const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; // This is to vertically center, in case you need it
  flex-direction: column; // Stack children vertically
`;

export default function HomePage() {

    return (
        <CenteredContainer>
            <H2>
                <i className="fa-solid fa-headphones fa-bounce"/>
                Welcome to your personal Spotify page
                <i className="fa-solid fa-headphones fa-bounce"/>
            </H2>
            <SpotifyToken/>
        </CenteredContainer>
        

    )
}
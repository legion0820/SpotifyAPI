import { useState } from 'react'
import { token } from './SpotifyToken'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const AlbumCard = styled.div`
    background-color: #f9f9f9;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
    flex: 0 1 calc(25% - 20px);
    text-align: center;
    color: black;
`;

const containerStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const AlbumImage = styled.img`
    width: 100px; 
    height: auto; 
    margin-top: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

const AlbumContainer = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
    padding: 20px;
    margin: center;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%; /* Adjust the width as needed, 100% to fill the wrapper */
  height: 40px;
  padding: 10px;
  padding-left: 40px; /* Make space for the emoji */
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 25px;
  &:focus {
    outline: none; /* Optional: removes the outline to keep the styling consistent */
  }
`;


const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 30%;
`;

const InputEmoji = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px; // Adjust the size as needed
`;




export default function SearchPage() {
    const [searchInput, setSearchInput] = useState("");
    const [albums, setAlbums] = useState([]);

    async function search() {
        try {
            const artistResponse = await fetch('https://api.spotify.com/v1/search?q=' + encodeURIComponent(searchInput) + '&type=artist', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!artistResponse.ok) {
                throw new Error('Failed to fetch artist data');
            }

            const artistData = await artistResponse.json();
            console.log("Artist data:", artistData);

            if (artistData.artists && artistData.artists.items.length > 0) {
                const artistID = artistData.artists.items[0].id;
                console.log("Artist ID:", artistID);

                const albumsResponse = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album,single&market=US&limit=50', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (!albumsResponse.ok) {
                    throw new Error('Failed to fetch albums');
                }

                const albumsData = await albumsResponse.json();
                console.log("Albums data:", albumsData);
                setAlbums(albumsData.items);
            } else {
                console.log("No artists found.");
            }
        } catch (error) {
            window.alert("Please log in first!")
            console.error('Error searching:', error);
        }
    }


    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            search();
        }
    }

    return (
        <div css={containerStyle}>
            <h1>Spotify Search</h1>
            <InputWrapper>
                <InputEmoji><i style={{ color: 'black', fontSize: '20px' }} className="fa-solid fa-magnifying-glass"/></InputEmoji>
                <StyledInput
                    type="text"
                    onKeyDown={handleKeyDown}
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search for albums, artists, playlists, tracks"
                />
            </InputWrapper>
            {/* <button onClick={search}>Search</button> */}
            {albums.length > 0 && (
                <AlbumContainer>
                    {albums.map(album => (
                        <AlbumCard key={album.id}>
                            <AlbumImage src={album.images[0].url} alt={album.name} />
                            <h3>{album.name}</h3>
                        </AlbumCard>
                    ))}
                </AlbumContainer>
            )}
        </div>
    );
}


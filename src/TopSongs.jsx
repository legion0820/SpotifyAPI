import React, { useEffect, useState } from 'react';
import { token } from './SpotifyToken'; // Import token directly
import styled from '@emotion/styled';

const Card = styled.div`
  width: 16vw; 
//   height: 300px;
  background-color: lightgray;
  color: black;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px; 
  object-fit: cover; // ensures the image covers the area, without stretching
`;

const CardContent = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h3`
  margin: 5px 0 20px 0; no margin on sides
  font-size: 25px; 
`;

const CardArtist = styled.p`
  margin: 5px 0 0; // Only add margin to the top
  font-size: 14px; 
`;

const AlbumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; // Adds space between cards
  padding: 20px;
`;

const CardInfo = styled.p`
  margin: 10px 0; // Keeps things tight
  font-size: 14px; 
`;



export default function TopSongsPages() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
        try {
          const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
            headers: {
              Authorization: `Bearer ${token}`, // Use imported token
            },
          });
      
          if (!response.ok) {
            console.error('Spotify API request failed:', response);
            return; // Exit the function if the response is not ok
          }
      
          const data = await response.json();
          console.log(data); // Log the API response data
          setTracks(data.items);
        } catch (error) {
          console.error('Failed to fetch top tracks:', error);
        }
      };
      

    if (token) {
      fetchTracks();
    }
  }, [token]); // Dependency array includes token to refetch if it changes

  if (!tracks) return null;

  return (
    <div>
        <h1>Top 5 Tracks</h1>
        <AlbumContainer>
        {tracks.map((track) => (
            <Card key={track.id}>
                <CardImage src={track.album.images[0].url} alt={`Album art for ${track.name}`} />
                <CardContent>
                <CardTitle>{track.name}</CardTitle>
                <CardArtist>{track.artists.map((artist) => artist.name).join(', ')}</CardArtist>
                <CardInfo>Album: {track.album.name}</CardInfo>
                <CardInfo>Release Date: {track.album.release_date}</CardInfo>
                <CardInfo>Popularity: {track.popularity}/100</CardInfo>
                <CardInfo><a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">Listen on Spotify</a></CardInfo>
                </CardContent>
            </Card>
        ))}
      </AlbumContainer>
    </div>
  );
  
}

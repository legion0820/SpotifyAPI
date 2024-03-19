import React, { useEffect, useState } from 'react';
import { token } from './SpotifyToken'; // Import token directly
import styled from '@emotion/styled';

// Styled components using Emotion
const TrackList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TrackItem = styled.li`
  margin-bottom: 10px;
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
      <TrackList>
        {tracks.map(track => (
          <TrackItem key={track.id}>
            {track.name} by {track.artists.map(artist => artist.name).join(', ')}
          </TrackItem>
        ))}
      </TrackList>
    </div>
  );
}

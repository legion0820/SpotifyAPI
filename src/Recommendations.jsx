import React, { useState } from "react"
import { token } from "./SpotifyToken"
import styled from "@emotion/styled"

const RecommendationsContainer = styled.div`
    & {
        text-align: left;
        padding-bottom: 100px;
        display: flex;
        flex-direction: column;
    }
    ul, ol, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .artistImgContainer {
        height: 300px;
        display: flex;
    }
    .artist_img {
        height: 100%;
        margin: auto;
        border-radius: 10px;
    }
    .track_img {
        height: 80px;
    }
    .song {
        display: flex;
        background-color: lightgray;
    }
    .artistCard {
        color: black;
        height: 630px;
        width: 360px;
        background-color: lightgray;
        margin: 20px;
        display: flex;
        flex-direction: column;
        border-radius: 20px;
        padding: 10px;
    }
    .artistCardsContainer {
        display: flex;
        flex-wrap: wrap;
    }
    audio {
        height: 30%;
        width: 260px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .songInfo {
        width: 280px;
        overflow: hidden;
        white-space: nowrap;
    }
    .artistName {
        margin: auto;
        font-weight: bold;
        margin-bottom: 20px;
        margin-top: 10px;
        font-size: 18px;
    }
    .songName {
        margin-left: 10px;
        font-size: 14px;
    }
    .songsContainer {
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .songContainer::-webkit-scrollbar {
        display: none;
    }
    h1 {
        margin: auto;
    }
    button {
        width: 240px;
        margin: auto;
        background-color: #a4ff94;
        border: none;
        font-weight: bold;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        margin-top: 30px;
    }
`

export default function RecommendationsPage() {
    const [topSongs, setTopSongs] = useState([])
    const [topArtists, setTopArtists] = useState([])
    const [recArtists, setRecArtists] = useState([])
    const [recArtistTracks, setRecArtistTracks] = useState([])
    const [audioPlaying, setAudioPlaying] = useState(false)

    async function fetchTopSongs() {
        try {
            const response = await fetch(
                'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            const responseJson = await response.json()
            setTopSongs(responseJson.items)
        } catch (error) {
            console.error('Error fetching top songs: ' + error)
        }
    }
    async function fetchTopArtists() {
        try {
            const response = await fetch(
                'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            const responseJson = await response.json()
            setTopArtists(responseJson.items)
        } catch (error) {
            console.error('Error fetching top songs: ' + error)
        }
    }
    async function fetchRelatedArtists(artistId) {
        try {
            const response = await fetch(
                'https://api.spotify.com/v1/artists/' + artistId + '/related-artists',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            const responseJson = await response.json()
            setRecArtists(recArtists => recArtists.concat(responseJson.artists))
        } catch (error) {
            console.error('Error fetching top songs: ' + error)
        }
    }
    async function fetchRelatedArtistTracks(artistId, artistName, artistPic) {
        try {
            const response = await fetch(
                'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            const responseJson = await response.json()
            const responseTracks = responseJson.tracks
            setRecArtistTracks(recArtistTracks => [...recArtistTracks, {name: artistName, tracks: responseTracks, id: artistId, img: artistPic}])
        } catch (error) {
            console.error('Error fetching top songs: ' + error)
        }
    }

    const generateRecSongs = () => {
        if (token) {
            fetchTopSongs()
            console.log('topSongs:', topSongs)
            fetchTopArtists()
            console.log('topArtists:', topArtists)
            setRecArtists([])
            topArtists.forEach(artist => {
                fetchRelatedArtists(artist.id)
            })
            console.log('recArtists:', recArtists)
            setRecArtistTracks([])
            recArtists.forEach(artist => {
                fetchRelatedArtistTracks(artist.id, artist.name, artist.images[0])
            })
            console.log('recArtistTracks:', recArtistTracks)
        }
    }

    return (
        <RecommendationsContainer>
            <h1>Recommendations Page</h1>
            <button onClick={generateRecSongs}>Generate Recommended Songs</button>
            <ul className="artistCardsContainer">
                {recArtistTracks.map(artistTracks => (
                    <li key={artistTracks.id} className="artistCard">
                        <div className="artistImgContainer">
                            <img src={artistTracks.img.url} className="artist_img"/>
                        </div>
                        <p className="artistName">{artistTracks.name}</p>
                        <ul className="songsContainer">
                            {artistTracks.tracks.map(track => (
                                <li className="song" key={track.id}>
                                    <div>
                                        <img src={track.album.images[0].url} className="track_img"/>
                                    </div>
                                    <div className="songInfo">
                                        <p className="songName">{track.name}</p>
                                        <audio controls>
                                            <source src={track.preview_url} type="audio/mpeg" />
                                        </audio>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </RecommendationsContainer>
    )
}
import express from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: ".env.local" })

const client_id = process.env.VITE_SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = process.env.VITE_OAUTH_REDIRECT_URL
//Server file template is credited to Professor Hess at Oregon State University

let token = null
let profile = null

// console.log("== client_id:", client_id)
// console.log("== client_secret:", client_secret)

const app = express()
const port = 8000

app.use(express.json())

//Source used for token exchange and profile data access: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile
app.post("/api/tokenExchange", async (req, res) => {
  const { code } = req.body
  //console.log("== code:", code)
  if (!code) {
    res.status(400).send({ err: "Must specify auth code" })
  } else {
    const params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirect_uri);

    const spotifyRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
         },
        body: params
    });
    
    const { access_token } = await spotifyRes.json()
    //console.log("TOKEN: ", access_token)
    if (access_token) {
        token = access_token
        res.status(200).send({ msg: token })
    } else {
      res.status(401).send({
        err: "unathorized"
      })
    }
  }
})

app.listen(port, () => console.log(`API server listening on port ${port}`))
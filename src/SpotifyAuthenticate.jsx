import RedirectToAuthCodeFlow from "./SpotifyLogInLink"

//Source used to obtain token is thanks to the lecture code provided by professor Hess at Oregon State University
export default function GetToken(authCode) {
    //console.log("authentication Code: ", authCode)
    let result

        async function exchangeForAccessToken(code) {
            //console.log("Code: ", code)
            //console.log("exchange")
            const res = await fetch("/api/tokenExchange", {
                method: "POST",
                body: JSON.stringify({ code }),
                headers: { 
                    "Content-Type": "application/json"
                }
                
            })
            
            if (res.status !== 200) {
                return ({
                    token: null,
                    success: false,
                    error: res.error
                })
              } else {
                const token = (await res.json()).msg
                //console.log(token.msg)
                
                if(token) {
                    return ({
                        token: token,
                        success: true,
                        error: ""
                    })
                } else {
                    //Try again to authenticate
                    RedirectToAuthCodeFlow()
                } 
              }
            }
            if (authCode) {
                result = exchangeForAccessToken(authCode)
              }

    return (
        result
    )    

    
}
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const clientID = '1253085756361015296';
const clientSecret = 'WJMCXmaaXcGSeLIcMWW_lYtolft-ru2J';
const redirectURI = 'https://kvajik.github.io/OMS/callback';

app.get('/auth/discord', (req, res) => {
    const authorizeURL = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=identify`;
    res.redirect(authorizeURL);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    const tokenURL = 'https://discord.com/api/oauth2/token';
    const userURL = 'https://discord.com/api/users/@me';

    try {
        const tokenResponse = await axios.post(tokenURL, new URLSearchParams({
            client_id: clientID,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: redirectURI
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const { access_token } = tokenResponse.data;
        const userResponse = await axios.get(userURL, {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const user = userResponse.data;
        res.send(`Hello, ${user.username}!`);
    } catch (error) {
        console.error(error);
        res.send('Error during authentication');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

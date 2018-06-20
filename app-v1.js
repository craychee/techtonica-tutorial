/**
 * Posts a status update to Twitter on npm start.
 *
 * Requires:
 * - setting up a twitter app: https://apps.twitter.com/
 * - creating an access token
 */

'use strict';

// [START app]
const express = require('express');

const app = express();

const Twit = require('twit');

app.get('/', (req, res) => {
      res.status(200).send('Hello, techtonica!').end();
});

// For documentation, see: https://github.com/ttezel/twit
var TweetBot = new Twit({
      consumer_key:         '',
      consumer_secret:      '',
      access_token:         '',
      access_token_secret:  '',
});

TweetBot.post('statuses/update', { status: 'beep bop beep. I am a bot'}, function(err, data, response) {
      console.log(data)
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
      console.log('Press Ctrl+C to quit.');
});
// [END app]

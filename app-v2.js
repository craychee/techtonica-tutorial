'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const Buffer = require('safe-buffer').Buffer;
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable.
// See https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const PubSub = require('@google-cloud/pubsub');

// Instantiate a pubsub client
const pubsub = PubSub();
const jsonBodyParser = bodyParser.json();

// List of all messages received by this instance
const messages = [];

// The following environment variables are set by app.yaml when running on GAE,
// but will need to be manually set when running locally.
const PUBSUB_VERIFICATION_TOKEN = process.env.PUBSUB_VERIFICATION_TOKEN;
const topic = pubsub.topic(process.env.PUBSUB_TOPIC);

app.get('/', (req, res) => {
    res.render('index', { messages: messages });
});

// [START Twitter Bot]
const Twit = require('twit');
var TweetBot = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
});

TweetBot.post('statuses/update', { status: 'beep bop beep. I am a bot'}, function(err, data, response) {
    console.log(data)
});
// [END Twitter Bot]

// [START push]
app.post('/pubsub/push', jsonBodyParser, (req, res) => {
    if (req.query.token !== PUBSUB_VERIFICATION_TOKEN) {
        res.status(400).send();
        return;
    }
    // The message is a unicode string encoded in base64.
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
    messages.push(message);
    res.status(200).send();
});
// [END push]

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

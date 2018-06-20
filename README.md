# Techtonica Webservices Tutorial

This tutorial is an introduction to Google's Appengine and Pub/Sub. It is an
example of what a service responding to an event-driven system might look like.

## Setup

This tutorial builds on the "hello world" Google App Engine tutorial.
1. Walk through the Google [Node.js App Engine tutorial](https://codelabs.developers.google.com/codelabs/cloud-app-engine-node/index.html#0)
1. Create a [Twitter app account](https://apps.twitter.com/)
1. Create a topic and subscription.

        gcloud beta pubsub topics create <your-topic-name>
        gcloud beta pubsub subscriptions create <your-subscription-name> \
          --topic <your-topic-name> \
          --push-endpoint \
            https://<your-project-id>.appspot.com/pubsub/push?token=<your-verification-token> \
          --ack-deadline 30

## Steps

1. Modify the initial "hello world" app with `app-v1.js`. We will add our own
   Twitter app credentials and it will tweet as we start our app.
1. Walk through the `appengine/pubsub`
   [tutorial](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/master/appengine/pubsub)
1. Combine `app-v1` and the pubsub tutorial into `app-v2.js`.

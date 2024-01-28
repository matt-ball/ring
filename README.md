# ring app

Install Google Cloud SDK to deploy:
`curl https://sdk.cloud.google.com | bash`

# Deployment

SSH to compute engine instance:
`make deploy`

Note: `gcloud components update` may need to be used if the `gcloud app deploy` command fails.

# Google Digital Asset Links

Should the signing key for the Android release ever change, the json manifest (https://github.com/matt-ball/ring/blob/main/.well-known/assetlinks.json)
must be updated across ALL domains (including subdomains), GAE is covered via Github, however the root json file must also be updated manually in /var/www/html

Ensure that the *RELEASE* key is used.

context: https://developer.android.com/training/app-links/verify-android-applinks#multi-subdomain


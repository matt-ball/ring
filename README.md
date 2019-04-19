# ring app

Install Google Cloud SDK to deploy:
`curl https://sdk.cloud.google.com | bash`

# Deployment

SSH to compute engine instance:
`make deploy`

Note: `gcloud components update` may need to be used if the `gcloud app deploy` command fails.


.PHONY: bootstrap deploy lint lint-fix start

BIN = ./node_modules/.bin

bootstrap:
	npm install

deploy-prod:
    git reset --hard
	git pull
	gcloud app deploy

deploy:
    git reset --hard
	git pull
	gcloud app deploy --no-promote

lint:
	$(BIN)/standard

lint-fix:
	$(BIN)/standard --fix

start:
	node app.js

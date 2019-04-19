.PHONY: bootstrap deploy lint lint-fix start

BIN = ./node_modules/.bin

bootstrap:
	npm install

deploy:
	git pull
	gcloud app deploy

lint:
	$(BIN)/standard

lint-fix:
	$(BIN)/standard --fix

start:
	node app.js

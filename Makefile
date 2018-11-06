.PHONY: bootstrap deploy lint lint-fix start

BIN = ./node_modules/.bin

bootstrap:
	npm install

deploy:
	make lint
	gcloud app deploy

lint:
	$(BIN)/standard

lint-fix:
	$(BIN)/standard --fix

start:
	node app.js
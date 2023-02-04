develop:
		npx webpack serve

install:
		npx ci

build:
		NODE_ENV=production npx webpack

test:
		npm test

lint:
		npx eslint .

.PHONY: test
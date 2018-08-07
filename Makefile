install:
	npm install

build:
	npm run build

run:
	npm run babel-node -- 'src/bin/gendiff.js' $(args)

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm run test
	
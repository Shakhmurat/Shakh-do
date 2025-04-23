install:
	npm ci

dev:
	npx vite --host

lint:
	npx eslint .

deploy:
	npm run build && gh-pages -d dist
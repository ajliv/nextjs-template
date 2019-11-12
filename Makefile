.PHONY: start stop install
.DEFAULT_GOAL := start

app: install
	$$(yarn bin)/nodemon -L \
		--exec 'ts-node' \
		--ext 'ts' \
		--ignore '**/__tests__' \
		--ignore '**/*.d.ts' \
		--watch next.config.js \
		--watch server \
		--verbose \
		server/index.ts

build:
	docker-compose build

install:
	yarn install --frozen-lockfile

mkcert:
	mkcert -cert-file server/cert.pem -key-file server/key.pem localhost 127.0.0.1 ::1

open:
	open https://localhost:8080/hello

rebuild: install mkcert open
	docker-compose -f docker-compose.local.yml up --build

rs:
	docker-compose -f docker-compose.local.yml restart

start: install mkcert open
	cp -n .env.example .env 2>/dev/null || :
	docker-compose -f docker-compose.local.yml up

stop:
	docker-compose -f docker-compose.local.yml down

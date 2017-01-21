# baldercm/curly-guacamole Makefile

NODE_MODULES = ./node_modules/.bin
REPORT_DOCS  = docs/README.md
WORKING_DIR  = $(shell pwd)

DOCKER_VERSION      ?= latest
DOCKER_IMAGE         = baldercm/curly-guacamole:$(DOCKER_VERSION)
DOCKER_IMAGE_STABLE  = baldercm/curly-guacamole:stable


default: test

start:
	$(NODE_MODULES)/nodemon src/index.js --exec $(NODE_MODULES)/babel-node

clean:
	rm -Rf dist

build: clean
	$(NODE_MODULES)/babel src -d dist
	cp -R src/config dist

test: pretest test-commands end-cleanup

test-commands:
	NODE_ENV=test $(NODE_MODULES)/mocha

test-docs: pretest test-docs-commands end-cleanup

test-docs-commands:
	rm -f $(REPORT_DOCS)
	mkdir -p docs
	NODE_ENV=test $(NODE_MODULES)/mocha --reporter markdown >> $(REPORT_DOCS)

coverage: pretest precoverage
	NODE_ENV=test $(NODE_MODULES)/istanbul cover $(NODE_MODULES)/_mocha

pretest: eslint docker-test-start

start-cleanup:
	$(if $(shell docker ps -a | grep 'mongo-test'),docker rm -vf mongo-test)

end-cleanup:
	$(if $(shell docker ps -a | grep 'mongo-test'),docker rm -vf mongo-test)

docker-test-start: start-cleanup
	docker run -p 27001:27017 --name mongo-test -d mongo --smallfiles
	docker run --rm --link mongo-test:mongo-test aanand/wait

docker-test-stop: end-cleanup

prereport:
	rm -Rf report
	mkdir -p report

precoverage:
	rm -Rf coverage

eslint:
	$(NODE_MODULES)/eslint src

docker-build: build
	docker build --tag $(DOCKER_IMAGE) .

release-docker-build:
	docker build --tag $(DOCKER_IMAGE) .
	docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_STABLE)

release-docker-push:
	docker push $(DOCKER_IMAGE)
	docker push $(DOCKER_IMAGE_STABLE)

.PHONY: test

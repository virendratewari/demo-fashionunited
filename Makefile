# use the tools as dev dependencies rather than installing them globaly
# it lets you handle specific versions of the tooling for each of your projects
MOCHA=node_modules/.bin/mocha
ISTANBUL=node_modules/.bin/istanbul
JSHINT=node_modules/.bin/jshint

# test files must end with ".test.js"
TESTS=$(shell find server/ -name "*.spec.js")

clean:
	rm -rf reports

test:
	$(MOCHA) -R spec $(TESTS)

xunit:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	XUNIT_FILE="reports/TESTS-xunit.xml" $(MOCHA) -R xunit-file $(TESTS)

coverage:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(ISTANBUL) instrument --output server-cov server
	@# move original server code and replace it by the instrumented one
	mv server server-orig && mv server-cov server
	@# tell istanbul to only generate the lcov file
	ISTANBUL_REPORTERS=lcovonly $(MOCHA) -R mocha-istanbul $(TESTS)
	@# place the lcov report in the report folder, remove instrumented code
	@# and reput server at its place
	mv lcov.info reports/coverage.lcov
	rm -rf server
	mv server-orig server

cobertura: coverage
	python tools/lcov_cobertura.py reports/coverage.lcov -b server -o reports/coverage.xml

jshint:
	$(JSHINT) server test --show-non-errors

checkstyle:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(JSHINT) server test --reporter=checkstyle > reports/checkstyle.xml

sonar:
	@# add the sonar sonar-runner executable to the PATH
	PATH="$$PWD/tools/sonar-runner-2.2/bin:$$PATH" sonar-runner

ci: clean xunit cobertura checkstyle sonar

.PHONY: clean test xunit coverage cobertura jshint checkstyle sonar ci
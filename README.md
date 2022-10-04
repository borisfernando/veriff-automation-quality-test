# veriff-automation-quality-test
Veriff Automation Quality test task repository that contains automated tests from Veriff Demo application: https://demo.saas-3.veriff.me.

## Description
This repository contains multiple UI and API tests written in Typescript, using PlayWright framework.

### UI automation
The automated UI integration tests located in [ui-tests](tests/session/ui), are using the Page Object Model (POM) design pattern for each of the Veriff web pages.
- [Base test spec](tests/session/ui/base-ui.spec.ts) contains the general Test base methods. For example, methods that can be reused in multiple test files.
- [Base](pages/base) directory will contain the base code for the pages. This will define the general methods of the pages. It contains a contract (interface) and the implementation. 
- [Session configuration page](pages/session/session-configuration-page.ts) contains the Session Configuration page elements. Each of the locators necessary to run automated tests, for example: full name input, country picker, session type, etc.
- [Verification directory](pages/verification) contains the implementations of the Veriff Verification web page.
  - [Verification factory](pages/verification/verification-factory.page.ts) has the Factory design pattern that creates the Verification page instance depending on the type of session (In Context or Redirect).
  - [Verification In Context page](pages/verification/verification-in-context.page.ts) contains all elements related to In Context session type only (dialog).
  - [Verification Redirect page](pages/verification/verification-in-redirect.page.ts) contains all elements related to Redirect session type only (redirect to https://magic.saas-3.veriff.me - not dialog).

### API automation
The automated API integration tests uses also the PlayWright framework to execute requests and obtain data from responses.

## Tools
The tools used in this repository are:
- Node/npm.
- PlayWright.
- Typescript.

## Test execution
### Docker
To improve and facilitate execution, this [script](scripts/start-tests-docker.sh) will execute the following commands and open the html report:

```bash
$ ./scripts/start-tests-docker.sh
$ ./scripts/start-tests-docker.sh tests/session/ui
$ ./scripts/start-tests-docker.sh tests/session/api 
```

It will execute the following code:
```bash
# Build custom image.
$ docker build -t test-task:1.0 .
# Run container with full tests.
$ docker run test-task:1.0
# Run container with API tests.
$ docker run test-task:1.0 tests/session/api
# Run container with UI tests.
$ docker run test-task:1.0 tests/session/ui
# Clear containers and others.
$ docker system prune -f
```

### Locally

To run tests, the [script](scripts/start-tests.sh) (Docker's entrypoint) will execute the following command:
```bash
$ npx playwright test
```

#### Examples:
```bash
$ ./scripts/start-tests.sh                    # Full tests
$ ./scripts/start-tests.sh tests/session/api  # Api tests
$ ./scripts/start-tests.sh tests/session/ui   # UI tests
```

## Additional
- Adding pages by using the POM design pattern is as easy as creating a new `.ts` file.
- Each page will have its own directory and own locators. The general methods are handled by the [veriff.page.ts](pages/base/veriff.page.ts) contract.
- The repository reuses the POM code.
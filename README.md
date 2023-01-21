# WdioProject
### Requirement

Typescript: [https://docs.microsoft.com/en-us/learn/modules/typescript-get-started/](https://docs.microsoft.com/en-us/learn/modules/typescript-get-started/)

Webdriver_io: [https://webdriver.io/docs/gettingstarted/](https://webdriver.io/docs/gettingstarted/)

Allure: https://docs.qameta.io/allure/

#### Prerequisite - (Install All Dependencies)
``npm install``

### Test stack used : 
- `WebDriverIO` : WebdriverIO is a progressive automation framework built to automate modern web and mobile applications
- `Cucumber` : Cucumber is a software tool that supports behavior-driven development (BDD)
- `Chai` : Chai is a BDD / TDD assertion library for node and the browser
- `Allure reporting` : Allure Report is a flexible, lightweight multi-language test reporting tool.
- `npm` - Package management

### Available Environments

- staging
- prod

### Browser Support

- CHROME
- FIREFOX

### To execute Tests in Local

The list of services and environmnet available are mentioned above, these are case sensitive.
For the test execution we need to set the environment,
The tests are ran against the `staging` environment in pipeline

```sh
$ export ENV=staging
```

### How tests are executed as part of Pipeline

1. In pipeline, The tests are being execute via the `execute-test.sh` with `<environment>` 1st parameter, `<browser>` as the 2nd parameter, optional `<tag>` cucumber tags as 3rd paratmeter.

2. For Environment type, 2 options are available
    - staging(default)
    - prod 

<img width="329" alt="Screenshot 2023-01-21 at 10 39 02 PM" src="https://user-images.githubusercontent.com/85667476/213878859-69c0c445-1c44-442e-b714-173b081ff127.png">

3. For Browser. two Browser types are supported
    - CHROME (default)
    - FIREFOX

4. Cucumber Tags, `All` is default tag


### Example to run tests for specific tag

To run the `All` feature tests
```
npm run test:staging
```

run the test for `staging` environment

```
npm run test:staging
```
for `production`
```
npm run test:prod
```

to run particular cucumber `tag`

```
npm run test:staging <cucumberTag>
eg. npm run test:staging 1
```


to run the test `headless` mode

```
npm run test:staging <cucumberTag> Yes
eg. npm run test:staging All Yes
```

run the test for particular `browser`

```
npm run test:staging <cucumberTag> <head mode> <browser name>
eg. npm run test:staging All No FIREFOX
```
  
run the test for particular `URL`

```
npm run test:staging <cucumberTag> <head mode> <browser name> <URL>
eg. npm run test:staging 2 No CHROME www.google.com
```


to open the `Allure Report` 

```
npm run report
```




# typescript-amqp-hw

Simple AMQP _Hello World!_ Node.js application in TypeScript prepared for Heroku deployment.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## RPC AMQP

The example responds with _Hello World!_ message when a RPC message is sent to `testQueue` or bound `testExchange`.

## Install

Follow the Heroku button to install the application to Heroku. The installation process should include the CloudAMQP add-on.

## Set up and run locally

Node needs to be installed locally. Make sure the [Heroku CLI](https://cli.heroku.com/) is installed.

```sh
heroku git:clone -a <YOUR-APP-NAME>
```

It will be reported as an empty git repository, that's expected when deploying to Heroku from a Heroku Button click. To fix this, add the github remote and pull the source from it.

```sh
cd <YOUR-APP-NAME>
git remote add origin https://github.com/htutman/typescript-amqp-hw.git
git pull origin master
```

This will get the entire source code into the local git repository. To run locally the `CLOUDAMQP_URL` environment variable is needed with an URL to a AMQP server. To reuse the one provisioned on Heroku get the env var into `.env` file:

```sh
heroku config:get CLOUDAMQP_URL -s > .env
```

### Run locally

```sh
npm i
npm run build
heroku local
```

### Prettier

The project has `prettier` configured, to reformat code changes run:

```sh
npm run prettier
```

## Pushing changes

Add all chenges to git. Push the commit to `master` branch of the `heroku` remote.

```sh
git add .
git commit -m "<Commit message>"
git push heroku master
```

On successful push Heroku automatically runs `postinstall` script from the `package.json` that builds JavaScript from TypeScript sources.


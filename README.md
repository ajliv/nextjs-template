# Next.js Template

Template repo for Next.js apps

## Getting Started

### Requirements

* [docker](https://docs.docker.com/install/)
* [docker-compose](https://docs.docker.com/compose/install/)
* [mkcert](https://github.com/FiloSottile/mkcert)
* [node.js](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/en/docs/install)

### Running Locally

The following steps will spin up a local dev environment running over HTTPS

* Run `mkcert -install` once to created a new local CA
* Copy the **.env.example** file in the root of the project as **.env** and fill in any necessary [env vars](#environment-variables)
* Run `make`
* App will be running at https://localhost:8080
* Run `make stop` to destroy local environment

## Environment Variables

| Key             | Description                                     | Default             | Required      |
| --------------- | ----------------------------------------------- | :-----------------: | :-----------: |
| HEALTHCHECK     | The application health check route              | `/hc`               |               |
| LOG_FORMAT      | The [morgan] log format                         | `combined`          |               |
| PORT            | The application port                            | `8080`              |               |

## Testing

Run `yarn test` to run Jest tests

## CI/CD

Continuous integration and deployment workflows are run via [CircleCI](https://circleci.com).

[morgan]: https://www.npmjs.com/package/morgan

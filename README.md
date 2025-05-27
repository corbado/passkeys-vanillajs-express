<img width="1070" alt="GitHub Repo Cover" src="https://github.com/corbado/corbado-php/assets/18458907/aa4f9df6-980b-4b24-bb2f-d71c0f480971">

# Fullstack Express Passkey Example App

This is a sample implementation of the [Corbado passkeys-first authentication solution](https://www.corbado.com) using
Vanillajs and Express with TypeScript. The following packages are being used:

- [Corbado web-js](https://github.com/corbado/javascript/tree/develop/packages/web-js)
- [Corbado Node.js](https://github.com/corbado/corbado-nodejs)

[![integration-guides](https://github.com/user-attachments/assets/7859201b-a345-4b68-b336-6e2edcc6577b)](https://app.corbado.com/integration-guides/vanillajs-express)

## File structure

- `src/app.ts`: configuration file for the Express app
- `src/utils`: collection of utility functions, e.g. helper functions for authentication
- `src/routes`: directory configuring the routes for the app
- `src/controller`: controllers for the routes
- `src/middleware`: middleware, e.g. for authentication
- `views`: ejs templates for the app
- `public`: static files
- `.env`: add relevant environment variables that you can obtain
  from [Corbado developer panel](https://app.corbado.com/signin#register)

## Setup

### Prerequisites

Please follow the steps in [Getting started](https://docs.corbado.com/overview/getting-started) to create and configure
a project in the [Corbado developer panel](https://app.corbado.com/).

You need to have [Node](https://nodejs.org/en/download) and `npm` installed to run it.

### Configure environment variables

Use the values you obtained in [Prerequisites](#prerequisites) to configure the following variables inside an `.env`
file you create in the root folder of this project:

```sh
CORBADO_PROJECT_ID=pro-XXX
CORBADO_API_SECRET=corbado1_XXX
CORBADO_FRONTEND_API=https://${CORBADO_PROJECT_ID}.frontendapi.cloud.corbado.io
CORBADO_BACKEND_API=https://backendapi.cloud.corbado.io
```

## Usage

### Run the project locally

Run

```bash
npm i
```

to install all dependencies.

Finally, you can run the project locally with

```bash
npm run start
```

## Passkeys support

- Community for Developer Support: https://bit.ly/passkeys-community
- Passkeys Debugger: https://www.passkeys-debugger.io/
- Passkey Subreddit: https://www.reddit.com/r/passkey/

## Telemetry

This example application uses telemetry. By gathering telemetry data, we gain a more comprehensive understanding of how our SDKs, components, and example applications are utilized across various scenarios. This information is crucial in helping us prioritize features that are beneficial and impactful for the majority of our users. Read our [official documentation](https://docs.corbado.com/corbado-complete/other/telemetry) for more details.

To disable telemetry, add the following line to your `.env` file:

```sh
CORBADO_TELEMETRY_DISABLED=true
```
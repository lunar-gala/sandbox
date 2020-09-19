# Sandbox

Sandbox for LG.

- [Setup](#setup)
- [Deploying](#deploying)
- [Best Practices](#best-practices)

## Setup

You will need [Node](https://nodejs.org/en/), along with `npm`, which comes
installed with it, so please install these before continuing.

After cloning this repo, first install the necessary packages (will take a while)

```sh
npm install
```

Then you can run

```sh
npm start
```

to show the website on your local machine. The website should be available at
`localhost:8080` by default, and open it in your default browser tab. If not,
just navigate to that web address by typing it into your browser.

## Deploying

Our live site will be hosted on the `gh-pages` branch, to separate the development code from the production code. To deploy, run

```sh
npm run deploy
```

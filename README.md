## Introduction

Welcome to an application for Searching and Favouriting
Universities! This app makes use of React, Next.js 15, TypeScript, DaisyUI, PostgreSQL, and Prisma, and is dockerized (Next.js app and the PostgreSQL db are containers). It makes use of the Next.js app router, server functions, server components etc.. I thought it would be fun to try out some new technologies for this application. Please don't hate on me for no semi-colons in the typescript files! I've been using semi-colons forever, but I thought I'd try things without them since they are optional in TS, just to see how I liked it. I can do either! Anyways, follow below to build and run the app.

## Usage

**Download Docker desktop if you haven't, install and run it**
[https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)

**Open a bash terminal at the root of this project folder**

#### For fully dockerized production build
```bash
# First, build and start the client and database containers in docker
docker compose up --build

# Open another bash terminal at the root of this project folder
# Then sync the database schema
npx prisma db push

# Create the initial data for the database
npx prisma db seed
```

#### For a development build
```bash
# First, build and start the database container in docker
docker compose -f compose-dev.yaml up --build

# Open another bash terminal at the root of this project folder
# Then sync the database schema
npx prisma db push

# Create the initial data for the database
npx prisma db seed

# Install client packages locally
npm install

# Build and start the client in development mode.
npm run dev
```

#### Finally
Open [http://localhost:3000](http://localhost:3000) with your browser to interact with the application. (It may take a little bit for the application to compile the first time).


## Notes:
- There is only assumed to be one user for the purposes of this application, so there is no user authentication or login built into the system. The Favourites table in the db also doesn't have a userId field, where it would have one if there were multiple users to consider.

- There is no unit testing with Vitest or Jest, or e2e testing with Playwright or Cypress. It is something I would add if this was a real app.

- It wasn't necessary to create route handlers for getting data from the database with public api's, as I can retrieve the data in server components without them. I did, however, do this for the search page to make the api accessible outside of this app (route handler for getting university data), but did not do so for favourites.


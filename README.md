This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What to do

'What to do' is a responsive web application built in React with the Next.js framework, connected to a Firebase Firestore database. It allows users to create, edit and delete tasks on their own to-do list, style them and manage their status.

I developed it using server-side-rendering and stale-while-revalidate (SWR, from Vercel) strategies, in fetching and data mutation tasks. I also did a passwordless authentication strategy, through Magic Link, encrypted with JSON Web Token (JWT) to secure the connection with the API.

I used ESLint to style the code with Airbnb format.

**Note:** it would be prudent to do make test coverage for the UI and the API.

## Setup

1- Clone the repository

```bash
% git clone https://github.com/pnestevez/task-test.git
```

2- Install dependencies

```bash
% cd tastk-test
% npm install
```

3- Set .env:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api

MAGIC_SECRET_KEY=
NEXT_PUBLIC_MAGIC_PUB_KEY=

FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_CLIENT_CERT_URL=

JWT_SECRET=
```

4- Run up the app

```bash
% npm start
```

5- Open [http://localhost:3000](http://localhost:3000) with your browser.

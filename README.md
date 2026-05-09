# Acoustic Steps

Premium beginner acoustic guitar learning app with a Node.js backend, SQLite storage, and Auth0-ready authentication.

## Local Preview

```powershell
node server.js
```

Open `http://127.0.0.1:3000`.

Without Auth0 environment variables, the backend runs in local preview mode and stores progress under a demo user in SQLite.

## Auth0 Setup

Create an Auth0 Single Page Application and API, then set:

```powershell
$env:AUTH0_DOMAIN="your-tenant.us.auth0.com"
$env:AUTH0_CLIENT_ID="your_auth0_client_id"
$env:AUTH0_AUDIENCE="https://myguitarlesson/api"
```

In Auth0, add these URLs for local development:

- Allowed Callback URLs: `http://127.0.0.1:3000`
- Allowed Logout URLs: `http://127.0.0.1:3000`
- Allowed Web Origins: `http://127.0.0.1:3000`

For Vercel, also add your Vercel preview URL after deployment.

## SQLite Storage

The app uses Node's built-in `node:sqlite` module:

- Local: `./data/acoustic-steps.sqlite`
- Vercel serverless preview: `/tmp/acoustic-steps.sqlite`

Vercel's `/tmp` storage is ephemeral, so this is suitable for preview display and demos. For production persistence, move the same API contract to durable storage such as Turso, Vercel Postgres, or another hosted database.

## Vercel Preview

Set a Vercel token locally:

```powershell
$env:VERCEL_TOKEN="your_vercel_token"
node scripts\deploy-vercel.mjs
```

The script prints the preview URL.

# Food delivery app

This repository contains a React customer app (`frontend`), a React admin app (`admin`), and an Express/MongoDB API (`backend`). The existing app structure is retained; environment variables now configure the API, database, CORS, and upload directory.

Use Node.js 20.19+ (or 22.12+) and npm for local development and builds.

## Run locally

1. Install dependencies in `backend`, `frontend`, and `admin` by running `npm install` in each directory.
2. Copy `backend/.env.example` to `backend/.env` and set `DB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`. Keep `.env` files private.
3. Copy each frontend `.env.example` to `.env` if the API is not at `http://localhost:4000`.
4. Start the API from `backend` with `npm run server`.
5. Start each Vite app from its own directory with `npm run dev`. If both apps run at once, set their allowed local origins in `backend/.env` to the ports Vite prints.

The API health check is `GET /`. Food images are served from `/images`; by default they are stored in `backend/uploads`.

## Deploy (suggested setup)

Use MongoDB Atlas for the database, Render (or another Node host with persistent storage) for the API, and Vercel (or another static host) for each Vite app.

### API

- Create a Node web service with `backend` as its root directory.
- Build command: `npm install`
- Start command: `npm start`
- Set `DB_URI` to a MongoDB Atlas connection string, `JWT_SECRET` to a long random secret, and `ADMIN_USERNAME` / `ADMIN_PASSWORD` to private admin credentials.
- Set `CLIENT_ORIGINS` to the comma-separated, exact HTTPS origins for the deployed customer and admin apps (no trailing slash). Do not use `*` for a public deployment.
- Configure a persistent disk and set `UPLOADS_DIR` to its mount path (for example `/var/data/uploads`). Without persistent storage, uploaded food images can disappear on redeploy/restart. Existing files in `backend/uploads` must be copied to that disk if they are needed by existing food records.
- Use the host-provided `PORT`; the server reads it automatically.

### Customer and admin apps

Deploy `frontend` and `admin` as two separate static sites:

- Build command: `npm install && npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` to the deployed API's HTTPS base URL (for example `https://your-api.example.com`) in each site's build environment.
- Set `VITE_ADMIN_URL` in the customer site's build environment to the deployed admin site's URL to show the Admin entry point in the customer navigation and footer. It can be set to `http://localhost:5174` for local development.
- Add the final site origins to the API's `CLIENT_ORIGINS` and redeploy the API.

The admin app now requires the server-configured admin credentials. Its menu create/delete API routes also require an admin JWT; never put admin credentials in a `VITE_*` variable or ship them in browser code.

## Current limitations before launch

- Checkout is still a placeholder: it displays a local success alert and does not create an order or charge a payment method. Stripe is not wired into the checkout flow. Do not accept real orders/payments until this is implemented and tested.
- The admin Orders screen is currently empty.
- Uploaded images are local files, so production needs a persistent disk or a future object-storage integration.
- Restrict the MongoDB Atlas network access list and use a dedicated database user. If a database credential has ever been committed or shared, rotate it before deployment.

I can guide you through creating the hosting services and entering their settings, but publishing requires your hosting/database accounts and their dashboard access.

# RSVP Backend

NestJS backend for Hakuna Matata Party RSVP System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database URL and admin password
```

3. Set up Prisma:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start the server:
```bash
npm run start:dev
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

- `POST /rsvp` - Create a new RSVP
- `GET /rsvp?password=<admin_password>` - Get all RSVPs (admin only)

## Railway Deployment

### Prerequisites

- A Railway account ([railway.app](https://railway.app))
- Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

1. **Create a New Project on Railway**
   - Log in to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or your Git provider)
   - Choose this repository

2. **Add PostgreSQL Database**
   - In your Railway project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will automatically provision a PostgreSQL database and set the `DATABASE_URL` environment variable

3. **Configure Environment Variables**
   - In your Railway service settings, go to "Variables"
   - Add the following environment variables:
     - `PORT` - Railway will set this automatically, but you can leave it as `3001` if needed
     - `FRONTEND_URL` - Your frontend URL (e.g., `https://your-frontend-domain.com`)
     - `ADMIN_PASSWORD` - Your admin password for accessing RSVPs
     - `DATABASE_URL` - Automatically set by Railway when you add PostgreSQL

4. **Run Database Migrations**
   - Railway will automatically build and deploy your application
   - After the first deployment, open the Railway service logs
   - Run migrations manually using Railway CLI or add a deploy hook:
     ```bash
     npx prisma migrate deploy
     ```
   - Alternatively, you can add this as a deploy command in Railway settings

5. **Deploy**
   - Railway will automatically detect your Node.js application
   - The build process will:
     - Install dependencies
     - Generate Prisma client (via `postinstall` script)
     - Build the NestJS application
     - Start the production server

### Railway CLI (Alternative Method)

If you prefer using Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link your project
railway link

# Deploy
railway up

# Run migrations
railway run npx prisma migrate deploy
```

### Environment Variables Summary

Required environment variables for Railway:
- `DATABASE_URL` - Automatically provided by Railway PostgreSQL service
- `PORT` - Automatically set by Railway (defaults to port provided by Railway)
- `FRONTEND_URL` - Your frontend URL for CORS configuration
- `ADMIN_PASSWORD` - Admin password for RSVP access

### Troubleshooting

- **Database connection issues**: Ensure `DATABASE_URL` is correctly set and the PostgreSQL service is running
- **Build failures**: Check that all dependencies are in `package.json` (not `devDependencies` for production)
- **Migration errors**: Run `npx prisma migrate deploy` manually after deployment
- **Port issues**: Railway automatically sets `PORT`, but ensure your app uses `process.env.PORT`


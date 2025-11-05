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

**Important**: You don't need to manually create the database. Railway creates it automatically.

1. **Create a New Project on Railway**
   - Log in to Railway dashboard
   - Click "New Project"
   - Select "Empty Project" (or deploy from GitHub later)

2. **Add PostgreSQL Database FIRST** ⚠️
   - In your Railway project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will automatically create the database and set `DATABASE_URL`
   - **Do this BEFORE deploying your app** to ensure proper connection

3. **Deploy Your Application**
   - Click "+ New" → "GitHub Repo" → Select this repository
   - Railway will automatically detect it's a Node.js app
   - Railway automatically shares `DATABASE_URL` from the PostgreSQL service
   - The app will build and deploy automatically

4. **Configure Environment Variables**
   - In your **app service** settings, go to "Variables"
   - Add the following environment variables:
     - `FRONTEND_URL` - Your frontend URL (e.g., `https://your-frontend-domain.com`)
     - `ADMIN_PASSWORD` - Your admin password for accessing RSVPs
     - `DATABASE_URL` - Should already be set automatically by Railway
     - `PORT` - Railway sets this automatically (usually not needed)

5. **Migrations Run Automatically** ✅
   - Migrations run automatically on each deployment (configured in `railway.json`)
   - Check deployment logs to verify migrations ran successfully
   - The build process will:
     - Install dependencies
     - Generate Prisma client (via `postinstall` script)
     - Build the NestJS application
     - Run database migrations (`prisma migrate deploy`)
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

- **No tables created**: Migrations should run automatically. If tables are missing:
  1. Check deployment logs for migration errors
  2. Verify `DATABASE_URL` is set in your app service variables
  3. Ensure PostgreSQL service is running
  4. Manually run migrations: `railway run npx prisma migrate deploy` (see Railway CLI section)

- **Database connection issues**: 
  - Ensure PostgreSQL service is created BEFORE the app service
  - Verify `DATABASE_URL` is visible in your app service's "Variables" tab
  - Both services must be in the same Railway project

- **Build failures**: Check that all dependencies are in `package.json` (not `devDependencies` for production)

- **Migration errors**: 
  - Check logs for specific error messages
  - Ensure Prisma CLI is available (it's in dependencies)
  - Run manually: `railway run npx prisma migrate deploy`

- **Port issues**: Railway automatically sets `PORT`, but ensure your app uses `process.env.PORT`

### If You Need to Redo the Deployment

1. Delete the current app service (keep the PostgreSQL service)
2. Create a new app service from GitHub
3. Railway will automatically connect to the existing PostgreSQL service
4. Migrations will run automatically on deployment


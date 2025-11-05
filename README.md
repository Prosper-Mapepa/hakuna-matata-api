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


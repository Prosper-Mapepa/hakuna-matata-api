# Backend Environment Variables

The `.env` file has been configured with the following values:

```
DATABASE_URL="postgresql://postgres:Letmein@99x!@localhost:5432/hakuna-matata-rsvp?schema=public"
ADMIN_PASSWORD="Letmein@99x!"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

## Database Configuration

- **Database Name**: hakuna-matata-rsvp
- **Password**: Letmein@99x!
- **Host**: localhost
- **Port**: 5432 (default PostgreSQL port)
- **User**: postgres (default PostgreSQL user)

## Setup Instructions

1. Make sure PostgreSQL is running on your machine
2. Create the database if it doesn't exist:
   ```bash
   createdb hakuna-matata-rsvp
   ```
   Or connect to PostgreSQL and run:
   ```sql
   CREATE DATABASE "hakuna-matata-rsvp";
   ```

3. Run Prisma migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

## Note

If your PostgreSQL username is different from `postgres`, update the `DATABASE_URL` in the `.env` file accordingly.


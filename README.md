# Loan Picks Dashboard - Backend

This is the backend for the Loan Picks Dashboard application, built with Node.js, Express, TypeScript, and Prisma (PostgreSQL). It provides APIs for user authentication, product management, and AI-powered chat assistance.

## Prerequisites

- Node.js (v18+)
- PostgreSQL Database (local or cloud like Render/Neon)

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in this directory with the following:
    ```env
    DATABASE_URL="postgresql://user:password@host:port/database"
    JWT_SECRET="your_secret_key"
    GEMINI_API_KEY="your_google_gemini_api_key"
    PORT=5000
    ```

3.  **Database Setup:**
    ```bash
    # Generate Prisma client
    npm run prisma:generate

    # Push schema to database
    npm run prisma:push

    # Seed the database with initial products
    npm run seed
    ```

## Scripts

- `npm run dev`: Start the development server with hot-reload (port 5000).
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Run the compiled production server.
- `npm run seed`: Populate the database with sample loan products.

## API Endpoints

### Auth
- `POST /api/auth/register`: Register a new user (`email`, `password`, `display_name`).
- `POST /api/auth/login`: Login and get JWT (`email`, `password`).

### Products
- `GET /api/products`: Fetch all loan products (supports filtering).
- `GET /api/products/:id`: Fetch a single product by ID.

### AI Chat
- `POST /api/ai/ask`: Send a message to the AI assistant regarding a product. Requires `Authorization` header.

## Folder Structure

- `src/config`: Database and env configuration.
- `src/controllers`: Request logic (separated from routes).
- `src/routes`: API definitions.
- `src/prisma`: Database schema.
- `src/scripts`: Utility scripts (seeding).

# Store Application

A full-stack application built with React + Node.js + TypeScript + Prisma + PostgreSQL

## System Requirements

- Node.js (version 16 or higher)
- npm
- PostgreSQL (version 12 or higher)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/arkadiyz/store.git
cd store
```

### 2. Database Setup

#### Install PostgreSQL

- Download and install PostgreSQL from https://www.postgresql.org/download/
- Create a new database (e.g., `store_db`)

#### Database Connection

Create a `.env` file in the `server` directory with the following content:

```env
DATABASE_URL="postgresql://postgres:arkadi1990@localhost:5432/store_db"
PORT=5000
```

**Connection Details:**

- **Username:** `postgres`
- **Password:** `arkadi1990`
- **Host:** `localhost`
- **Port:** `5432`
- **Database:** `store_db`

## Installation & Setup

### Server Setup

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Import the database schema and data:

```bash
psql -U postgres -d store_db -f ../schema.sql
```

**Note:** The `schema.sql` file contains the complete database structure and sample data, so you don't need to run Prisma migrations or seed commands.

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run the seed file to populate initial data:

```bash
npm run seed
```

6. Start the development server:

```bash
npm run dev
```

The server will be running at: `http://localhost:5000`

### Client Setup

Open a new terminal and run:

1. Navigate to client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the React application:

```bash
npm start
```

The application will be running at: `http://localhost:3000`

## Available Scripts

### Server Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Run database seed file

### Client Scripts

- `npm start` - Start React development server
- `npm run build` - Build React app for production

## Project Structure

```
store/
├── README.md               # This documentation file
├── client/                 # React application
│   ├── package.json
│   ├── tsconfig.json
│   ├── public/             # Static files
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── App.css
│       ├── App.tsx
│       ├── App.test.tsx
│       ├── index.css
│       ├── index.tsx
│       ├── logo.svg
│       ├── react-app-env.d.ts
│       ├── reportWebVitals.ts
│       ├── setupTests.ts
│       ├── components/     # React components
│       │   ├── Modal.css
│       │   ├── Modal.tsx
│       │   ├── ProductForm.css
│       │   ├── ProductForm.tsx
│       │   ├── SearchAutoComplete.css
│       │   ├── SearchAutoComplete.tsx
│       │   ├── UserTable.tsx
│       │   └── ReactTable/  # Data table components
│       │       ├── columns.tsx
│       │       ├── DataTable.css
│       │       ├── DataTable.tsx
│       │       ├── Table.css
│       │       ├── Table.tsx
│       │       ├── TableBody.tsx
│       │       ├── TableCell.tsx
│       │       ├── TableHeader.tsx
│       │       ├── TableHeaderCell.tsx
│       │       ├── TablePagination.tsx
│       │       └── TableRow.tsx
│       ├── pages/          # Application pages
│       │   ├── HomePage.css
│       │   └── HomePage.tsx
│       ├── redux/          # State management
│       │   ├── store.ts
│       │   └── slices/     # Redux slices
│       │       ├── appSlice.ts
│       │       ├── errorSlice.ts
│       │       └── loaderSlice.ts
│       ├── services/       # API services
│       │   ├── error.service.ts
│       │   ├── http.service.ts
│       │   ├── net.service.ts
│       │   └── utils.ts
│       └── types/          # TypeScript definitions
│           └── Product.ts
└── server/                 # Node.js backend
    ├── index.ts            # Main server file
    ├── package.json
    ├── tsconfig.json
    ├── api/                # API routes
    │   └── product/        # Product endpoints
    │       ├── product.controller.ts
    │       ├── product.routes.ts
    │       └── product.service.ts
    ├── data/               # Data files
    │   └── data.ts
    ├── logs/               # Application logs
    │   └── backend.log
    ├── prisma/             # Database schema & seeds
    │   ├── schema.prisma
    │   └── seed.ts
    └── services/           # Backend services
        ├── cache.service.ts
        ├── db.service.ts
        └── logger.service.ts
```

## Technology Stack

### Backend

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Prisma:** Prisma
- **CORS:** Enabled for cross-origin requests

### Frontend

- **Framework:** React 19 + TypeScript
- **State Management:** Redux Toolkit
- **Data Tables:** TanStack React Table
- **HTTP Client:** Axios
- **Notifications:** React Toastify

## API Endpoints

### Products

- `GET /api/product` - Get all products
- `POST /api/product` - Create new product
- `PUT /api/product/:id` - Update product
- `DELETE /api/product/:id` - Delete product

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Verify the DATABASE_URL in `.env` file
- Check if the database exists
- Confirm username/password are correct

### Application Startup

1. Always start the server before the client
2. Ensure ports 3000 and 5000 are available
3. If installation fails, delete `node_modules` and reinstall

### Common Solutions

```bash
# Reset Prisma client
npx prisma generate

# Reset database
npx prisma db push --force-reset

# Clear npm cache
npm cache clean --force
```

## Production Deployment

### Server

```bash
cd server
npm run build
npm start
```

### Client

```bash
cd client
npm run build
# Built files will be in the build/ directory
```

## Environment Variables

### Server (.env)

```env
DATABASE_URL="postgresql://postgres:arkadi1990@localhost:5432/store_db"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=5000
NODE_ENV=development
```

## Support

For issues, check:

1. Server logs in `server/logs/backend.log`
2. Browser console for JavaScript errors
3. Network tab for API request failures
4. PostgreSQL logs for database issues

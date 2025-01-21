# Librius - Online Library Application

Librius is a full-stack application designed to serve as an online library. The project is built using **TypeORM** with **Express.js** for the backend and **Vite** with **React** for the frontend. The backend is responsible for managing the database and providing an API, while the frontend allows users to interact with the library.

---

## Features
- **Frontend** built with **React** and **Vite** for a fast and modern user experience.
- **Backend** using **Express.js** and **TypeORM** for database management and API development.
- Full CRUD operations for managing books in the library.
- Environment variable configuration using `.env`.
- Error handling middleware and CORS support.

---

## Prerequisites
Before starting, ensure you have the following installed:
- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **PostgreSQL** (or any other database supported by TypeORM)

---

## Getting Started

### 1. Clone the repository
Clone the repository to your local machine:
```bash
git clone https://github.com/panteliic/Librius.git
cd librius
```

---

### Frontend Setup (Vite + React)

#### 2. Install frontend dependencies
Navigate to the `frontend` directory and install the required dependencies:
```bash
cd frontend
npm install
# or
yarn install
```

#### 3. Run the frontend application
To start the frontend development server, run:
```bash
npm run dev
# or
yarn dev
```

The frontend will be accessible at [http://localhost:5173](http://localhost:5173).

---

### Backend Setup (TypeORM + Express)

#### 4. Install backend dependencies
Navigate to the `backend` directory and install the required dependencies:
```bash
cd backend
npm install
# or
yarn install
```

#### 5. Configure environment variables
Create a `.env` file in the `backend` directory and add your database configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password123
DB_NAME=Librius
PORT=3000 # Backend will run on port 5000
```

#### 6. Set up the database
Ensure you have a PostgreSQL database created and running. Use the configuration from the `.env` file to connect to the database.

#### 7. Run the backend application
To start the backend server in development mode, run:
```bash
npm run start:dev
# or
yarn start:dev
```

For production, you need to build the app first:
```bash
npm run build
# or
yarn build
```
Then run the compiled code:
```bash
npm start
# or
yarn start
```

The backend will be accessible at [http://localhost:3000](http://localhost:3000).

---

### 8. Test the application
Once both servers (frontend and backend) are running, you can test your app by navigating to [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:5173](http://localhost:5173) for the backend.

You should see the homepage of the online library, where users can browse books and interact with the library's features.

---

### 9. Migrations (Optional)
To manage database schema changes using migrations, you can use the following commands:

- **Generate a new migration:**
  ```bash
  npm run typeorm migration:generate -- -n MigrationName
  ```

- **Run migrations:**
  ```bash
  npm run typeorm migration:run
  ```

- **Revert migrations:**
  ```bash
  npm run typeorm migration:revert
  ```

---

## Project Structure

```
src/
├── data-source.ts       # Database configuration (TypeORM)
├── entity/
├── middleware/
├── routes/
├── controllers/
├── index.ts                 # Entry point for the backend
├── app.ts                   # Express app configuration
└── .env                     # Environment variables
```

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! 🚀

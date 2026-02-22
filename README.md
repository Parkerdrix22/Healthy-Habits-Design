# Healthy Habits

## 1. App Summary
Healthy Habits is a parent-guided wellness app for building consistent daily routines in nutrition, movement, and balanced screen use for children. Many families struggle to track these habits in one place, which makes progress hard to see and maintain. This app combines core habit categories into a single dashboard so parents can monitor trends and support healthy behavior without shaming language. The primary user is a parent or caregiver managing one or more child profiles. Parents can view goals, activity ideas, food logs, and screen-time summaries in a kid-friendly interface. The long-term objective is to move from a UI prototype to a full-stack app where actions persist to a database. This repository currently includes the frontend plus database schema and seed scripts as the backend foundation.

## 2. Tech Stack
### Frontend
- React 19
- Vite 6
- TypeScript 5
- HTML/CSS

### Backend
- Planned: Node.js + Express.js API layer (vertical-slice persistence integration in progress)

### Database
- MySQL 8 (SQL scripts included: `db/schema.sql`, `db/seed.sql`)

### Authentication
- Not implemented yet

### External Services / APIs
- None

## 3. Architecture Diagram
![System Architecture Diagram](docs/SystemArchitecture.png)

Actor → Frontend (Browser)

Frontend → Backend (HTTP)

Backend → MySQL (SQL query)

Backend → Frontend (JSON response)

## 4. Prerequisites
Install the following software before running locally.

### Required Software
- Node.js (includes npm): https://nodejs.org/en/download
- MySQL Server 8.x: https://dev.mysql.com/downloads/mysql/
- MySQL Command-Line Client (`mysql`) available in your system `PATH`: https://dev.mysql.com/doc/refman/8.0/en/mysql.html
- Git: https://git-scm.com/downloads

### Verify Installation
Run these commands:

```bash
node -v
npm -v
mysql --version
git --version
```

If each command prints a version, prerequisites are installed correctly.

## 5. Installation and Setup
1. Clone the repository and move into the project directory.
```bash
git clone <your-repo-url>
cd Healthy-Habits-Design
```

2. Install frontend dependencies.
```bash
npm install
```

3. Create a local MySQL database.
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS healthy_habits;"
```

4. Apply schema.
```bash
mysql -u root -p healthy_habits < db/schema.sql
```

5. Seed sample data.
```bash
mysql -u root -p healthy_habits < db/seed.sql
```

6. Confirm tables exist.
```bash
mysql -u root -p -e "USE healthy_habits; SHOW TABLES;"
```

Environment variables:
- Configure backend database connection settings in a `.env` file (for example: host, port, user, password, database).

## 6. Running the Application
1. Start the backend server:
```bash
npm run server
```

2. Start the frontend development server:
```bash
npm run dev
```

3. Open:
- `http://localhost:5173`

API base URL:
- `http://localhost:3000` (used by the frontend for goal updates)

## 7. Verifying the Vertical Slice
Implemented vertical slice:
- The `Save Goal` button in the Goals page is connected to backend server logic.
- The backend updates the `Goals` table and returns the updated goal data.
- The frontend displays the updated value in the UI.
- The update persists after page refresh.

Verification steps:
1. Open the app and navigate to Goals.
2. Enter a goal and click `Save Goal`.
3. Confirm a successful API response in the browser network tab (2xx).
4. Verify the database row changed:
```bash
mysql -u root -p -e "USE healthy_habits; SELECT * FROM Goals ORDER BY goalID DESC LIMIT 5;"
```
5. Refresh the page and confirm the saved goal value is still shown in the UI.

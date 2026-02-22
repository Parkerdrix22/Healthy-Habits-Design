#!/usr/bin/env node
// Healthy Habits — Database Setup Script
// Run from the project root: npm run setup

import readline from 'readline';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { Client } = pg;

const GREEN  = '\x1b[32m';
const CYAN   = '\x1b[36m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';

function log(msg)    { console.log(`${GREEN}✔${RESET}  ${msg}`); }
function info(msg)   { console.log(`${CYAN}ℹ${RESET}  ${msg}`); }
function warn(msg)   { console.log(`${YELLOW}⚠${RESET}  ${msg}`); }
function fatal(msg)  { console.error(`${RED}✖${RESET}  ${msg}`); process.exit(1); }
function header(msg) { console.log(`\n${BOLD}${msg}${RESET}\n`); }

// ── Inline SQL ────────────────────────────────────────────────────────────────

const SCHEMA_SQL = `
DROP TABLE IF EXISTS screentimelog CASCADE;
DROP TABLE IF EXISTS nutritionlog CASCADE;
DROP TABLE IF EXISTS activitylogs CASCADE;
DROP TABLE IF EXISTS streaks CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS workoutideas CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS children CASCADE;
DROP TABLE IF EXISTS tips CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  userid       SERIAL PRIMARY KEY,
  username     VARCHAR(50) NOT NULL,
  passwordhash VARCHAR(50) NOT NULL,
  firstname    VARCHAR(50) NOT NULL,
  lastname     VARCHAR(50) NOT NULL,
  email        VARCHAR(50) NOT NULL,
  userrole     VARCHAR(50) NOT NULL,
  datecreated  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastlogin    TIMESTAMP
);

CREATE TABLE children (
  childid     SERIAL PRIMARY KEY,
  userid      INT NOT NULL,
  firstname   VARCHAR(50) NOT NULL,
  lastname    VARCHAR(50) NOT NULL,
  birthdate   TIMESTAMP NOT NULL,
  age         INT NOT NULL,
  height      DECIMAL(5,2),
  weight      DECIMAL(5,2),
  datecreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE activitylogs (
  activityid     SERIAL PRIMARY KEY,
  childid        INT NOT NULL,
  activitytype   VARCHAR(50) NOT NULL,
  timecreated    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  duration       INT NOT NULL,
  steps          INT,
  caloriesburned INT,
  repeatingflag  BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (childid) REFERENCES children(childid)
);

CREATE TABLE goals (
  goalid      SERIAL PRIMARY KEY,
  userid      INT NOT NULL,
  childid     INT NOT NULL,
  category    VARCHAR(50) NOT NULL,
  targetvalue INT NOT NULL,
  goaltype    VARCHAR(50) NOT NULL,
  value       INT NOT NULL DEFAULT 0,
  unit        VARCHAR(50) NOT NULL,
  start_date  TIMESTAMP NOT NULL,
  end_date    TIMESTAMP NOT NULL,
  frequency   VARCHAR(50) NOT NULL,
  isactive    BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (userid) REFERENCES users(userid),
  FOREIGN KEY (childid) REFERENCES children(childid)
);

CREATE TABLE workoutideas (
  workoutid       SERIAL PRIMARY KEY,
  title           VARCHAR(50) NOT NULL,
  description     VARCHAR(200),
  instructions    VARCHAR(200),
  agegroup        VARCHAR(50) NOT NULL,
  durationminutes INT NOT NULL,
  intensity       VARCHAR(50) NOT NULL,
  equipment       VARCHAR(50),
  location        VARCHAR(50),
  tags            VARCHAR(50),
  createdat       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdbyuserid INT NOT NULL,
  FOREIGN KEY (createdbyuserid) REFERENCES users(userid)
);

CREATE TABLE recipes (
  recipeid        SERIAL PRIMARY KEY,
  title           VARCHAR(50) NOT NULL,
  difficulty      VARCHAR(50) NOT NULL,
  description     VARCHAR(200),
  instructions    VARCHAR(200),
  nutritioninfo   VARCHAR(50),
  prepminutes     INT NOT NULL,
  cookminutes     INT NOT NULL,
  servings        INT NOT NULL,
  tags            VARCHAR(50),
  imageurl        VARCHAR(50),
  createdat       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdbyuserid INT NOT NULL,
  FOREIGN KEY (createdbyuserid) REFERENCES users(userid)
);

CREATE TABLE nutritionlog (
  nutritionlogid SERIAL PRIMARY KEY,
  childid        INT NOT NULL,
  fooditem       VARCHAR(50) NOT NULL,
  foodgroup      VARCHAR(50) NOT NULL,
  timestamp      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  servingsize    INT NOT NULL,
  ishealthy      BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (childid) REFERENCES children(childid)
);

CREATE TABLE screentimelog (
  screentimelogid SERIAL PRIMARY KEY,
  childid         INT NOT NULL,
  date            TIMESTAMP NOT NULL,
  duration        INT NOT NULL,
  devicetype      VARCHAR(50) NOT NULL,
  activitytype    VARCHAR(50) NOT NULL,
  timestamp       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (childid) REFERENCES children(childid)
);

CREATE TABLE streaks (
  streakid      SERIAL PRIMARY KEY,
  childid       INT NOT NULL,
  category      VARCHAR(50) NOT NULL,
  currentstreak INT NOT NULL DEFAULT 0,
  longeststreak INT NOT NULL DEFAULT 0,
  lastupdated   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (childid) REFERENCES children(childid)
);

CREATE TABLE tips (
  tipid    SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  content  VARCHAR(50) NOT NULL,
  agegroup VARCHAR(50) NOT NULL,
  isactive BOOLEAN NOT NULL DEFAULT TRUE
);
`;

const SEED_SQL = `
INSERT INTO users (userid, username, passwordhash, firstname, lastname, email, userrole, datecreated, lastlogin) VALUES
(1,  'jparker',   'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2', 'Jamie',   'Parker',   'jamie@healthyhabits.com',   'parent', '2025-01-10 08:00:00', '2026-02-17 09:15:00'),
(2,  'sthompson', 'b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3', 'Sara',    'Thompson', 'sara@healthyhabits.com',    'parent', '2025-02-14 10:30:00', '2026-02-16 18:45:00'),
(3,  'mreyes',    'c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4', 'Marco',   'Reyes',    'marco@healthyhabits.com',   'parent', '2025-03-01 12:00:00', '2026-02-15 07:30:00'),
(4,  'lchen',     'd4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5', 'Lisa',    'Chen',     'lisa@healthyhabits.com',    'parent', '2025-03-20 09:00:00', '2026-02-17 11:00:00'),
(5,  'dwilson',   'e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6', 'Derek',   'Wilson',   'derek@healthyhabits.com',   'parent', '2025-04-05 14:00:00', '2026-02-14 20:00:00'),
(6,  'amorales',  'f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1', 'Ana',     'Morales',  'ana@healthyhabits.com',     'parent', '2025-05-12 07:45:00', '2026-02-17 08:00:00'),
(7,  'coachkim',  'a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3', 'Kim',     'Nguyen',   'kim@healthyhabits.com',     'coach',  '2025-01-05 08:00:00', '2026-02-17 10:30:00'),
(8,  'nutrijess', 'b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4', 'Jessica', 'Adams',    'jessica@healthyhabits.com', 'coach',  '2025-01-08 09:00:00', '2026-02-16 14:00:00'),
(9,  'adminalex', 'c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5', 'Alex',    'Rivera',   'alex@healthyhabits.com',    'admin',  '2025-01-01 00:00:00', '2026-02-17 12:00:00'),
(10, 'tblake',    'd5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6', 'Tanya',   'Blake',    'tanya@healthyhabits.com',   'parent', '2025-06-01 11:00:00', '2026-02-13 16:30:00');

SELECT setval('users_userid_seq', 10);

INSERT INTO children (childid, userid, firstname, lastname, birthdate, age, height, weight, datecreated) VALUES
(1,  1,  'Avery',    'Parker',   '2015-06-15', 10, 54.50, 72.00, '2025-01-10 08:05:00'),
(2,  1,  'Jordan',   'Parker',   '2017-09-22', 8,  48.25, 58.50, '2025-01-10 08:06:00'),
(3,  2,  'Mia',      'Thompson', '2014-03-10', 11, 57.00, 80.00, '2025-02-14 10:35:00'),
(4,  2,  'Ethan',    'Thompson', '2016-11-05', 9,  50.75, 64.00, '2025-02-14 10:36:00'),
(5,  3,  'Sofia',    'Reyes',    '2015-01-28', 10, 55.00, 74.50, '2025-03-01 12:05:00'),
(6,  4,  'Lucas',    'Chen',     '2013-08-19', 12, 60.25, 92.00, '2025-03-20 09:05:00'),
(7,  4,  'Emma',     'Chen',     '2016-04-03', 9,  49.50, 60.00, '2025-03-20 09:06:00'),
(8,  5,  'Noah',     'Wilson',   '2014-12-01', 11, 58.00, 85.00, '2025-04-05 14:05:00'),
(9,  6,  'Isabella', 'Morales',  '2015-07-20', 10, 53.75, 70.00, '2025-05-12 07:50:00'),
(10, 10, 'Caleb',    'Blake',    '2016-02-14', 9,  51.00, 66.00, '2025-06-01 11:05:00');

SELECT setval('children_childid_seq', 10);

INSERT INTO goals (goalid, userid, childid, category, targetvalue, goaltype, value, unit, start_date, end_date, frequency, isactive) VALUES
(1,  1, 1, 'Fitness',     10000, 'Steps',           8200, 'steps',    '2026-02-01', '2026-02-28', 'Daily',  TRUE),
(2,  1, 1, 'Reading',     20,    'Duration',           15, 'minutes',  '2026-02-01', '2026-02-28', 'Daily',  TRUE),
(3,  1, 2, 'Fitness',     8000,  'Steps',            6900, 'steps',    '2026-02-01', '2026-02-28', 'Daily',  TRUE),
(4,  2, 3, 'Nutrition',   5,     'Veggie Servings',     4, 'servings', '2026-02-01', '2026-02-28', 'Daily',  TRUE),
(5,  2, 4, 'Screen Time', 2,     'Limit',               1, 'hours',    '2026-02-01', '2026-02-28', 'Daily',  TRUE),
(6,  3, 5, 'Fitness',     150,   'Active Minutes',    120, 'minutes',  '2026-02-10', '2026-03-10', 'Weekly', TRUE),
(7,  4, 6, 'Hydration',   8,     'Water Intake',        6, 'cups',     '2026-01-15', '2026-04-15', 'Daily',  TRUE),
(8,  4, 7, 'Sleep',       10,    'Duration',             9, 'hours',   '2026-02-01', '2026-02-28', 'Daily',  TRUE),
(9,  5, 8, 'Fitness',     5,     'Workouts',             3, 'sessions','2026-02-01', '2026-02-28', 'Weekly', TRUE),
(10, 6, 9, 'Reading',     30,    'Duration',            25, 'minutes', '2026-02-01', '2026-02-28', 'Daily',  FALSE);

SELECT setval('goals_goalid_seq', 10);
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function ask(rl, question, defaultVal) {
  const hint = defaultVal !== '' ? ` (default: ${defaultVal})` : '';
  return new Promise(res => {
    rl.question(`  ${question}${hint}: `, answer => res(answer.trim() || defaultVal));
  });
}

async function askPassword(rl) {
  return new Promise(res => {
    process.stdout.write(`  DB Password (default: none): `);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
      let password = '';
      const onData = (char) => {
        char = char.toString();
        if (char === '\r' || char === '\n') {
          process.stdin.setRawMode(false);
          process.stdin.removeListener('data', onData);
          process.stdout.write('\n');
          res(password);
        } else if (char === '\u0003') {
          process.exit();
        } else if (char === '\u007f') {
          password = password.slice(0, -1);
        } else {
          password += char;
          process.stdout.write('*');
        }
      };
      process.stdin.on('data', onData);
    } else {
      rl.question('', res);
    }
  });
}

async function runSQL(client, sql) {
  const statements = sql
    .split(/(?<=;)/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  for (const stmt of statements) {
    await client.query(stmt);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  header('=== Healthy Habits — Database Setup ===');
  info('Press Enter to accept the default shown in parentheses.\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const host     = await ask(rl, 'DB Host',       'localhost');
  const port     = await ask(rl, 'DB Port',       '5432');
  const dbName   = await ask(rl, 'Database name', 'healthy_habits');
  const user     = await ask(rl, 'DB User',       process.env.USER || 'postgres');
  const password = await askPassword(rl);

  rl.close();

  // ── Step 1: Create database ─────────────────────────────────────────────────
  header('Step 1/3 — Creating database');

  const adminClient = new Client({
    host, port: Number(port), database: 'postgres', user,
    password: password || undefined,
  });

  try {
    await adminClient.connect();
    const existing = await adminClient.query(
      'SELECT 1 FROM pg_database WHERE datname = $1', [dbName]
    );
    if (existing.rows.length > 0) {
      warn(`Database "${dbName}" already exists — skipping creation.`);
    } else {
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      log(`Created database "${dbName}".`);
    }
    await adminClient.end();
  } catch (err) {
    await adminClient.end().catch(() => {});
    fatal(`Could not connect to PostgreSQL: ${err.message}`);
  }

  // ── Step 2: Apply schema ────────────────────────────────────────────────────
  header('Step 2/3 — Applying schema');

  const dbClient = new Client({
    host, port: Number(port), database: dbName, user,
    password: password || undefined,
  });

  try {
    await dbClient.connect();
    await runSQL(dbClient, SCHEMA_SQL);
    log('Schema applied.');
  } catch (err) {
    await dbClient.end().catch(() => {});
    fatal(`Schema failed: ${err.message}`);
  }

  // ── Step 3: Seed data ───────────────────────────────────────────────────────
  header('Step 3/3 — Seeding data');

  try {
    await runSQL(dbClient, SEED_SQL);
    log('Seed data loaded (10 users, 10 children, 10 goals).');
    await dbClient.end();
  } catch (err) {
    await dbClient.end().catch(() => {});
    fatal(`Seed failed: ${err.message}`);
  }

  // ── Write .env ──────────────────────────────────────────────────────────────
  const envPath = resolve(__dirname, '../.env');
  writeFileSync(envPath, [
    '# PostgreSQL Connection',
    `DB_HOST=${host}`,
    `DB_PORT=${port}`,
    `DB_NAME=${dbName}`,
    `DB_USER=${user}`,
    `DB_PASSWORD=${password}`,
    '',
    '# Server',
    'PORT=3001',
    '',
  ].join('\n'));
  log('.env written with your connection details.');

  console.log(`
${BOLD}${GREEN}Setup complete!${RESET}

  Start the app:  ${CYAN}npm run dev${RESET}
  Frontend:       ${CYAN}http://localhost:5173${RESET}
  API:            ${CYAN}http://localhost:3001${RESET}
`);
}

main();

# MongoDB Data Layer — Fundamentals and Advanced Techniques (Assignment)

This repository contains the assignment work for the "MongoDB Data Layer: Fundamentals and Advanced Techniques" module.

The purpose of this assignment is to practice creating and querying MongoDB data, and to demonstrate familiarity with the MongoDB Node.js ecosystem.

## Repository structure

- `insert_books.js` — Script used to insert sample book documents into a MongoDB collection.
- `queries.js` — Script containing example queries performed against the books collection (finds, aggregations, updates, deletes, etc.).
- `package.json` — Node.js project manifest (dependencies and scripts).
- `Week1-Assignment.md` — Assignment brief and instructions (provided by the instructor).
- `images/` — Supporting images used in the assignment (e.g. Compass screenshots).

## Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)
- MongoDB instance (local or Atlas)
- MongoDB Compass (optional, for GUI exploration)

If you don't have MongoDB installed locally, you can create a free cluster on MongoDB Atlas and obtain a connection string.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure the MongoDB connection string.

 - By default the scripts expect a connection string in the environment variable `MONGODB_URI`.
 - Create a `.env` file or export the environment variable before running the scripts. Example `.env` contents:

```
MONGODB_URI=mongodb://localhost:27017/books_db
```

If you use Windows PowerShell you can set the environment variable for the current session with:

```powershell
$env:MONGODB_URI = 'mongodb://localhost:27017/books_db'
```

## Usage

- Insert sample data:

```bash
node insert_books.js
```

- Run queries or demonstrations:

```bash
node queries.js
```

The scripts will connect to the database specified by `MONGODB_URI` and perform the intended operations. Check the console output for results and any errors.

## What to look for in the scripts

- `insert_books.js` demonstrates how to create documents and insert them into a collection.
- `queries.js` contains sample read operations (filtering and projecting), aggregations, and may include update/delete examples. Review the code and comments to learn the specific techniques used.

## Troubleshooting

- "ECONNREFUSED" or connection errors: verify MongoDB is running and that `MONGODB_URI` is correct.
- Authentication errors: ensure username/password and database name in the connection string are correct.
- Permission or network errors when using Atlas: make sure your IP is whitelisted or set to allow access from anywhere (0.0.0.0/0) for testing.


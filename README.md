# WanderLand AI

A full-stack travel journal application powered by AI content enhancement. Create, manage, and enhance your travel stories with intelligent suggestions and image support.

---

## Features

* User Authentication with JWT
* Travel Journal CRUD (Create, Read, Update, Delete)
* Image upload via Cloudinary
* AI content enhancement using Google Gemini API
* Location tagging for journal entries
* Responsive UI for all devices
* Dark themed modern interface

---

## Tech Stack

### Frontend

* React 19
* Vite
* React Router DOM
* Bootstrap 5
* Axios

### Backend

* Node.js & Express
* MongoDB with Mongoose
* JWT Authentication
* Bcryptjs
* Cloudinary
* Google Generative AI (Gemini)
* Multer
* CORS

---

## Prerequisites

Before running the project, ensure you have:

* Node.js (v14 or higher)
* MongoDB (local or cloud)
* Git
* API Keys for:

  * Google Gemini API
  * Cloudinary

---

## Installation

### 1. Clone Repository

```bash
git clone 
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Journals

* GET /api/journals
* POST /api/journals
* PUT /api/journals/:id
* DELETE /api/journals/:id

### AI Service

* POST /api/ai/summary

### Upload

* POST /api/upload

---

## Project Structure

```
WanderLandAI/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

---

## Environment Variables

### Backend (.env)

```
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
```

---

## Running the Project

### Development

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

---

## Usage

* Register a new account
* Login
* Create travel journal entries
* Upload images
* Enhance content using AI
* Edit or delete entries

---

## Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## License

MIT License
Copyright (c) 2026 Nandhini Hariraman

Permission is hereby granted...

---

## Author

Nandhini


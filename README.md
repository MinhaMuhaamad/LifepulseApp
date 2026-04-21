# LifePulse App

> A secure, full-stack MERN application with JWT authentication and a 60-question interactive life-dimensions questionnaire.

![LifePulse](https://img.shields.io/badge/Stack-MERN-blueviolet) ![Auth](https://img.shields.io/badge/Auth-JWT-green) ![Questions](https://img.shields.io/badge/Questions-60-orange)

---

## Screenshots

| Page | Description |
|------|-------------|
| `/login` | Geometric animated css-doodle background + frosted glass card |
| `/register` | Organic/flowing css-doodle background + frosted glass card |
| `/survey` | Paginated questionnaire (10 Qs/page) with animated header strip |
| `/results` | Radar chart + bar chart + detailed category score breakdown |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Recharts |
| Animation | css-doodle (Web Component) |
| HTTP Client | Axios with JWT interceptor |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Validation | express-validator |

---

## Project Structure

```
lifepulseapp/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── QuestionTypes/
│   │   │       ├── SliderQuestion.jsx
│   │   │       ├── RangeQuestion.jsx
│   │   │       ├── EmojiScaleQuestion.jsx
│   │   │       ├── ImageChoiceQuestion.jsx
│   │   │       └── MCQQuestion.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # React Context + useReducer
│   │   ├── data/
│   │   │   └── questions.js         # All 60 questions
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── SurveyPage.jsx
│   │   │   └── ResultsPage.jsx
│   │   ├── utils/
│   │   │   └── axiosInstance.js     # Axios + JWT interceptor
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
│
├── server/                    # Node/Express backend
│   ├── config/
│   │   └── db.js              # Mongoose connection
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   └── validate.js        # express-validator helper
│   ├── models/
│   │   ├── User.js            # User schema + bcrypt pre-save hook
│   │   └── Response.js        # Survey response schema
│   ├── routes/
│   │   ├── auth.js            # /api/auth/register, /api/auth/login, /api/auth/me
│   │   └── survey.js          # /api/survey/submit, /api/survey/me
│   ├── .env.example
│   └── index.js               # App entry point
│
├── .gitignore
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB (local) running on `mongodb://127.0.0.1:27017` **OR** a MongoDB Atlas URI
- npm v9+

---

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/lifepulseapp.git
cd lifepulseapp
```

---

### 2. Set up the Server

```bash
cd server
npm install
```

Create your `.env` file (copy from example):

```bash
cp .env.example .env
```

Edit `server/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/lifepulse
JWT_SECRET=your_very_long_random_secret_at_least_32_chars
JWT_EXPIRES_IN=7d
PORT=5000
```

Start the server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on **http://localhost:5000**

---

### 3. Set up the Client

```bash
cd ../client
npm install
npm start
```

Client runs on **http://localhost:3000**

---

## API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive JWT |
| `GET` | `/api/auth/me` | ✅ Bearer token | Get current user info |

#### POST `/api/auth/register`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securePass123"
}
```

**Success Response `201`:**
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane Smith", "email": "jane@example.com" }
}
```

**Error Responses:**
- `400` — Validation failed (invalid email, short password, etc.)
- `400` — Registration failed (email already exists — generic message)
- `500` — Server error

---

#### POST `/api/auth/login`

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "securePass123"
}
```

**Success Response `200`:**
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane Smith", "email": "jane@example.com" }
}
```

**Error Responses:**
- `400` — Validation failed
- `401` — Invalid credentials (generic — does not reveal whether email exists)
- `500` — Server error

---

### Survey — `/api/survey`

All survey endpoints require `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| `POST` | `/api/survey/submit` | ✅ | Submit/upsert survey answers |
| `GET` | `/api/survey/me` | ✅ | Retrieve user's saved answers |

#### POST `/api/survey/submit`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "answers": {
    "s01": 7,
    "s02": 3,
    "ed01": 4.5,
    "em01": 2
  }
}
```

**Success Response `200`:**
```json
{
  "message": "Survey submitted successfully",
  "response": {
    "user": "...",
    "answers": { ... },
    "submittedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

> Uses `findOneAndUpdate` with `upsert: true` — safe to call multiple times.

---

#### GET `/api/survey/me`

**Headers:** `Authorization: Bearer <token>`

**Success Response `200`:**
```json
{
  "response": {
    "user": "...",
    "answers": { "s01": 7, "s02": 3, ... },
    "submittedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` — No/invalid/expired token
- `404` — No survey found for this user
- `500` — Server error

---

## Security Features

- Passwords hashed with **bcryptjs** (salt rounds: 12) — never stored in plaintext
- **JWT** tokens with 7-day expiry
- Input validation via **express-validator** on all auth routes
- Generic error messages — email enumeration is prevented
- JWT attached via Axios interceptor; stale tokens auto-cleared on 401
- `.env` never committed to git (listed in `.gitignore`)

---

## Questionnaire Design

**60 questions across 6 categories, 10 per category:**

| # | Category | Question Focus | Input Types Used |
|---|----------|---------------|-----------------|
| 1–10 | Social | Conversations, comfort, leadership, anxiety | slider, emojiscale, mcq, range, imagechoice |
| 11–20 | Educational | Study hours, learning style, stress, curiosity | slider, imagechoice, mcq, range, emojiscale |
| 21–30 | Emotional | Wellbeing, stress, sleep, therapy openness | emojiscale, slider, range, mcq, imagechoice |
| 31–40 | Cultural | Environment, heritage, traditions, travel | imagechoice, mcq, slider, range, emojiscale |
| 41–50 | Digital/Tech | Screen time, social media, AI, gaming | slider, range, emojiscale, mcq, imagechoice |
| 51–60 | Environmental | Eco-habits, climate concern, transport | slider, range, mcq, imagechoice, emojiscale |

Each category uses **at least 3 different input types** ✅

---

## css-doodle Patterns Used

| Location | Pattern Style |
|----------|--------------|
| `/login` background | Geometric/grid — rectangular cells rotating with `@r` |
| `/register` background | Organic/flowing — elliptical blobs with easing animation |
| Survey header strip (rotates) | 3 patterns: wave bars, spinning shapes, morphing polygons |

---

## Running Both Together

Open two terminals:

```bash
# Terminal 1 — server
cd lifepulseapp/server && npm run dev

# Terminal 2 — client
cd lifepulseapp/client && npm start
```

Then visit **http://localhost:3000**

---

## Submission Checklist

- [x] GitHub repo with `client/` and `server/` folders
- [x] Root-level `README.md` with setup instructions, API docs, screenshots section
- [x] All 60 questions in `questions.js` with required distribution
- [x] At least 3 distinct css-doodle patterns (login, register, survey header ×3 rotating)
- [x] Working JWT authentication — register, login, token storage, protected routes
- [x] Survey submit (upsert) and retrieve endpoints with MongoDB
- [x] Results page with radar chart + bar chart + score breakdown
- [x] `.gitignore` covering node_modules, .env, build output, OS files
- [x] `.env.example` provided

---

## Instructor Notes

- **Monorepo**: `client/` (React 18) and `server/` (Node/Express) share one repository
- **css-doodle**: imported in `src/index.js` via `import 'css-doodle'`, used as `<css-doodle>` JSX tags with `aria-hidden="true"` on all decorative instances
- **Auth flow**: Register/Login → JWT stored in `localStorage` → Axios interceptor attaches `Bearer` token → `PrivateRoute` guards `/survey` and `/results`
- **Upsert**: `Response.findOneAndUpdate(..., { upsert: true })` ensures no duplicate entries per user
- **Score normalisation**: All answer types normalised to 0–100 for the results charts

---

*LifePulse App — NUCES Chiniot-Faisalabad Campus | Instructor: Zaki Akram*

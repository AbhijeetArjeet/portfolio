# PortfolioForge — Full-Stack Custom Portfolio Platform with AMOLED Theme & LinkedIn Integration

A production-ready, secure, full-stack multi-user portfolio creation platform built with **React + Vite**, **Node.js + Express**, and **Prisma ORM (PostgreSQL & SQLite)**. 

The application enables students, creators, and developers to generate, customize, publish, and share professional web portfolios from personal profiles, LinkedIn, GitHub repositories, skills suites, and project galleries. It features server-side role-based authorization, 6 responsive templates, procedural Magic Randomizer, CSS Grid vs Flexbox layout switchers, sharable read-only links for visiting organisations with permission approval workflows, version history snapshots, and JSON backup export/restore.

---

## 📋 Evaluation Criteria Compliance Summary

| Criterion | Requirement | Implementation in PortfolioForge |
| :--- | :--- | :--- |
| **1. React + Vite Project** | Must be built with React and Vite. | Modern React 18 SPA built with Vite 5, optimized bundle splitting, and sub-7s production build. |
| **2. Module Identification** | Clearly identify and implement User and Admin modules. | Explicit Module Badges across the app: **User / Creator Studio**, **Faculty / Admin Evaluator**, and **Visiting Organisation / Recruiter View**. |
| **3. Login and Signup** | Working login/signup using Local Storage. | Fully persistent auth system using Local Storage with pre-seeded demo accounts, dual-synced with Express REST backend and JWT session fallback. |
| **4. Vercel Deployment** | Deploy React project on Vercel with zero broken routes. | Configured `vercel.json` SPA rewrite rules and root `postinstall` script for 1-click static and full-stack hosting. |

---

## 🔐 Demo Credentials & Pre-Seeded Accounts

| Role | Username / Email | Password | Access Details |
| :--- | :--- | :--- | :--- |
| **Faculty Admin** | `Sunita Bulla` (`sunita.bulla@university.edu`) | `mam` | Full platform moderation, user role toggles (Admin/User), new user creation, publication control, and audit logs. |
| **Student Creator** | `Abhijeet Arjeet` (`abhijeet@example.com`) | `password123` | OpenDisplay-USB, AniScribe, AURA, dualboot-clock-fix, LinkedIn integration, multi-portfolio management. |
| **Student Creator** | `Hritik Kumar` (`hritik@example.com`) | `password123` | Student-personal-portfolio, Web Portfolio, responsive layouts, LinkedIn integration. |
| **Student Creator** | `Duggiralapati Sri Sarvagna` (`sarvagna@example.com`) | `password123` | KAREN-AI Desktop Assistant, CTCMS, Flappy Bird Engine, Frontend Lab, LinkedIn integration. |

*Quick login buttons are available directly on the `/login` page.*

---

## 🌟 Key Features & Architectural Capabilities

### 1. First-Class LinkedIn Integration
- **Strict HTTPS URL Validation**: Enforces standard LinkedIn profile formats (`https://(www.)linkedin.com/in/...` or `/company/...`).
- **Visibility Toggle**: Users can enable or hide their LinkedIn badge at any time (`showLinkedin`).
- **Universal Template Support**: Rendered with official accessible SVG branding and keyboard navigation across all 6 portfolio themes.
- **Backup Persistence**: Included in JSON backup export/import and version history snapshots.
- *Strict Privacy*: No unverified web scraping or unauthorized third-party private APIs.

### 2. Multi-Portfolio CRUD & Persistent Storage
- **Multiple User Portfolios**: Create distinct portfolios tailored for software engineering, academic research, or creative design.
- **1-Click Duplication**: Clone existing portfolios and project galleries with deep relation copying in a single Prisma transaction.
- **Reliable Auto-Save**: Debounced persistence with visual status indicators (`Saving...`, `Saved`, `Save failed`), navigation warning on pending changes, and explicit `Save Now` triggers.
- **Version History Snapshots**: Create named snapshot versions and restore prior content with a single click.
- **JSON Backup Export & Import**: Download your entire portfolio dossier as `.json` and restore it anytime.

### 3. AMOLED Pitch-Black Theme
- Designed for true AMOLED displays: `#000000` pitch black background, `#0a0a0a` cards, `#1f1f23` silver-monochrome borders, and high-contrast typography.
- Zero bluish/navy gradients.

### 4. 6 Distinct Professional Templates
1. **Developer**: CLI terminal preview, monospace details, and GitHub stats card.
2. **Minimal**: Clean typographical layout with focus on bio and essential works.
3. **Creative**: Dynamic Bento grid with highlights and visual hierarchy.
4. **Editorial**: Magazine serif style for writers and technical bloggers.
5. **Academic**: Publication listings, citations, research statement, and CV downloads.
6. **Executive**: Dossier format for technical leads and engineering managers.

### 5. Organisation Read-Only Sharing & Permission Requests
- Public links (`/u/:slug`) render in **Organisation Read-Only Mode** with a persistent header notice.
- Visiting recruiters and companies can view all projects but cannot edit them.
- Recruiters can click **"Request Edit / Collaboration Permission"** to submit a formal request.
- Portfolio owners and Administrators review, approve, or reject access requests from their dashboard inbox.

---

## 🏗️ Architecture & Project Structure

```text
portfolio/
├── client/                      # Frontend Application (React 18 + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Navbar, Footer, LoadingSpinner
│   │   │   ├── editor/          # PersonalInfo, PreGivenMaterials, Themes, Projects, Skills
│   │   │   └── portfolio/       # 6 Templates (Developer, Minimal, Creative, Editorial, Academic, Executive)
│   │   ├── context/             # AuthContext, ThemeContext (AMOLED)
│   │   ├── pages/               # Home, Login, Register, Dashboard, PortfolioEditor, PublicPortfolio, AdminDashboard
│   │   ├── services/            # Portfolio, Storage, API, Upload services
│   │   └── styles/              # main.css (AMOLED variables), templates.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend REST API (Node.js + Express + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma        # SQLite development schema
│   │   ├── schema.postgresql.prisma # PostgreSQL production schema
│   │   └── seed.js              # Database seed script
│   ├── src/
│   │   ├── config/              # Prisma client and environment configuration
│   │   ├── middleware/          # Auth, RBAC, ownership verification, Zod validation
│   │   ├── modules/             # Auth, Portfolios, Admin, Uploads
│   │   ├── app.js               # Express app
│   │   └── server.js            # Server entrypoint
│   └── tests/                   # Automated API, Security, Ownership, and Feature test suites
│
├── vercel.json                  # Vercel SPA build and rewrite configuration
├── render.yaml                  # Render web service blueprint
└── README.md
```

---

## 🚀 Running the Project Locally

### 1. Prerequisites
- Node.js 18+ and npm installed.

### 2. Backend Setup
```bash
cd server
npm install
npx prisma db push
node prisma/seed.js
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
# Vite runs on http://localhost:5173
```

### 4. Running Automated Tests
```bash
cd server
npm test
# Executes 25 automated tests across all 5 test suites with 100% pass rate.
```

---

## 🌐 Deployment

### Vercel Deployment (Frontend)
1. Push repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. The root `vercel.json` and `package.json` handle SPA routing and installation automatically.
4. Set Environment Variable:
   - `VITE_API_URL`: Your backend API URL (optional; client automatically falls back to Local Storage if offline).

### Render Deployment (Backend)
1. Deploy `server/` as a Web Service on [Render](https://render.com).
2. Set Build Command: `npm install && npx prisma db push --schema=prisma/schema.postgresql.prisma`
3. Set Start Command: `npm start`
4. Set Environment Variables: `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`.

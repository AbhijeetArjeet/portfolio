# Personal Portfolio Website — Abhijeet Arjeet

A clean, responsive, and curriculum-compliant personal portfolio website created in adherence with course modules **CO-1** (Git, Version Control, Semantic HTML5) and **CO-2** (CSS3, CSS Grid, Flexbox, Core JavaScript, and Fetch API).

---

## 📋 Course Outcomes (CO) Compliance

### 1. CO-1: Git, Version Control & Semantic HTML5
- **Git & Version Control Lifecycle**: 
  - Local repository initialized via `git init`.
  - `.gitignore` file configured for tracking exclusions.
  - Branching, merging, and remote repository integration ready for GitHub (`AbhijeetArjeet`).
- **Semantic HTML5 Architecture**:
  - Proper structural elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<details>`, `<summary>`, `<time>`.
- **Form Enhancements**:
  - Semantic `<form>`, `<fieldset>`, `<legend>`, `<input>` types (`text`, `email`, `tel`, `search`), `<textarea>`, `<select>`.
  - HTML5 validation attributes: `required`, `placeholder`, `pattern`, `minlength`.
- **SEO & Accessibility**:
  - Meta tags configured: `charset`, `viewport`, `description`, `author`, `keywords`.
  - Semantic headers, ARIA labels, descriptive `alt` tags on media.

### 2. CO-2: CSS3 Styling & Core Layouts
- **Types of CSS Applied**:
  - **External CSS**: Clean, modular styles in `style.css`.
  - **Internal CSS**: Inline `<style>` block demonstrating component badge styles.
  - **Inline CSS**: Embedded `style=""` attribute demonstrating inline styling.
- **CSS Selectors**:
  - Universal (`*`), Element (`body`, `h1`, `p`, etc.), Class (`.navbar`, `.project-card`), ID (`#hero`, `#projects`), Group (`h1, h2, h3`), Descendant (`.nav-links li a`), and Pseudo-classes (`:hover`, `:focus`, `:active`).
- **CSS Box Model**:
  - Margin, Border, Padding, and Content with universal `box-sizing: border-box`.
- **Layout Systems**:
  - **CSS Grid Layout** (`display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;`): Powering the Featured Projects gallery and skills breakdown as specifically emphasized by coursework instructions.
  - **CSS Flexbox** (`display: flex`): Header navigation, hero section, button groups, and toolbar controls.
- **CSS Positioning & Animations**:
  - `position: sticky` on navbar.
  - Smooth hover transitions and card elevation transformations (`transform: translateY(-4px)`).
  - Keyframe animations (`@keyframes fadeIn`).
  - Media queries for responsive layouts on desktop, tablet, and mobile devices.

### 3. CO-2: Core JavaScript & Asynchronous Features
- **Modern ES6+ Syntax**: `const`, `let`, Arrow functions, Template literals, Destructuring.
- **Asynchronous JavaScript**: `async/await` and Promises integrated with GitHub's REST API (`https://api.github.com/users/AbhijeetArjeet/repos`) to load live open-source projects dynamically.
- **DOM Manipulation & Events**:
  - Real-time search filter and category tag filter buttons.
  - Dynamic generation of project cards.
- **Client-Side Form Validation**:
  - Name, email regex, and message length verification with live error messaging.
- **LocalStorage API**:
  - Stores submitted contact form inquiries so messages persist across browser reloads.
  - Stores **Peer Portfolio Links** (Friends' Portfolios) allowing dynamic updates to classmates' websites.
  - Stores and syncs **LinkedIn Profile URL** across all buttons and references.

---

## 💼 LinkedIn & Professional Experience Integration
- Dedicated **Professional Experience & Education** section highlighting:
  - Smart India Hackathon (SIH) under MoSPI / DIID for **VAYU-CPI**.
  - Open Source Systems Architecture & 29+ GitHub repositories.
  - B.Tech in Computer Science & Engineering with curriculum alignment.
- **LinkedIn Connect Buttons** present in the Navigation Bar, Hero Section, Quick Facts, Experience Banner, Contact Panel, and Footer.
- Interactive **"Edit LinkedIn URL"** tool to update or fine-tune your LinkedIn handle on the fly (persisted in `localStorage`).

---

## 👥 Peer Portfolios Network (Connecting Classmates)
The website includes a dedicated **Peer Portfolio Network** section designed to connect your 2 classmates' portfolios:
- Click **"Edit Details"** on either card to input your friends' names and live portfolio URLs.
- The links and descriptions are automatically saved in the browser's `localStorage` so they stay configured across sessions.

---

## 🚀 How to Run Locally

1. Open this folder in any web browser:
   - Double click `index.html`, or
   - Right click `index.html` -> **Open with** -> Google Chrome / Microsoft Edge / Firefox.
2. Alternatively, run a lightweight local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

---

---

## 🔐 Authentication & Evaluator Login System
A dedicated authentication suite has been integrated at [`login.html`](login.html) with:
- **Sign In & Sign Up Tabs**: Seamless client-side tab switching with input validation and password show/hide toggles.
- **Faculty / Evaluator Preset Access**:
  - **Username / Login**: `Suneetha`
  - **Password**: `Bulla`
  - Includes a **1-Click Autofill** button for rapid evaluator grading.
- **User Registration**: Create custom accounts that persist locally in browser `localStorage`.
- **Dynamic Session Handling**: When logged in, the main portfolio displays an evaluator welcome banner and updates the navigation bar with active user status and a Logout action.

---

## 📂 Project Structure
```text
portfolio/
├── index.html        # Main HTML5 document with semantic elements
├── login.html        # Sign In & Sign Up page with Evaluator authentication
├── style.css         # CSS3 stylesheet (Grid, Flexbox, Box Model, Responsive, Auth)
├── script.js         # Core JS (Fetch API, DOM manipulation, LocalStorage, Auth)
├── profile.jpg       # Profile photo
├── .gitignore        # Git ignore file for version control
└── README.md         # Documentation and CO-1/CO-2 syllabus mapping
```

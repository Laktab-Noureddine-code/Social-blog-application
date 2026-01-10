# 🚀 Project Refactoring Roadmap: The 1-Day Overhaul

**Objective:** Modernize, secure, and deploy the Professional Social Network platform in 24 hours.
**Strategy:** High-intensity "Vibe Coding" using AI (Claude 3.5 Sonnet / Gemini Pro 1.5) for heavy lifting, identifying security flaws, and generating modern UI code.

---

## 📅 The Schedule (08:00 – 00:00)

### Phase 1: Setup & Housekeeping (08:00 – 09:30)
*Goal: Initialize environment and prepare context for AI.*
- [ ] **Clone & Install:** Run `composer install` and `npm install`.
- [ ] **Generate Context:** Create a `context.txt` file containing the full folder structure (use `tree`) and key files (`User` model, `AuthController`, `App.jsx`, `store.js`).
- [ ] **Feed the AI:** Upload `context.txt` to Claude/Gemini to establish a "knowledge base" of the legacy code.

### Phase 2: Backend Refactor & Security Audit (09:30 – 12:30)
*Goal: Fix errors, restructure to DDD, and secure endpoints.*
- [ ] **Security Audit:** Paste `routes/api.php` into AI to check for IDOR, SQL Injection, and Mass Assignment vulnerabilities.
- [ ] **Refactor Structure:** Move logic from "Fat Controllers" to `Services` or `Actions` (e.g., `CreatePostAction`).
- [ ] **Validation:** Extract validation rules into `FormRequest` classes.
- [ ] **Authorization:** Implement Laravel Policies (e.g., ensure User A cannot delete User B's post).

### Phase 3: The "Free" Real-Time Switch (12:30 – 14:30)
*Goal: Replace paid Pusher with self-hosted Laravel Reverb (or laravel-websockets).*
- [ ] **Install Package:** Install Laravel Reverb (Laravel 11) or `laravel-websockets` (Laravel 10).
- [ ] **Configure Backend:** Update `.env` (Set `BROADCAST_DRIVER=reverb`, Host `0.0.0.0`, Port `8080`).
- [ ] **Configure Frontend:** Update `echo.js` to point to the local `wsHost` with `forceTLS: false` (for local dev).
- [ ] **Nginx Proxy:** Setup reverse proxy rules for WebSocket traffic (if deploying).

### Phase 4: Localization (i18n) (14:30 – 16:00)
*Goal: Make the app bilingual (EN/FR/AR).*
- [ ] **Backend:** Create `lang/fr/messages.php` and `lang/ar/messages.php`.
- [ ] **Frontend:** Install `react-i18next`.
- [ ] **Implementation:** Rewrite hardcoded strings in components (e.g., Sidebar, Navbar) using the `useTranslation` hook.

### Phase 5: Frontend Redesign & Structure (16:00 – 20:00)
*Goal: Modernize UI and fix file structure.*
- [ ] **Restructure:** Move files from `src/components` to feature folders:
    - `src/features/auth`
    - `src/features/feed`
    - `src/features/chat`
- [ ] **Design System:** Update `tailwind.config.js` with a new "Modern Slate & Indigo" palette.
- [ ] **Vibe Coding:** Screenshot legacy components (e.g., Profile), paste into AI, and request a "LinkedIn 2024" style redesign using Tailwind + Framer Motion.
- [ ] **Dark Mode:** Ensure all new components support dark mode.

### Phase 6: Deployment (20:00 – 22:00)
*Goal: Go live.*
- [ ] **Infrastructure:** Provision a VPS (Ubuntu) on DigitalOcean/Hetzner/AWS.
- [ ] **Tooling:** Install Docker and Coolify (or use Laravel Forge).
- [ ] **Dockerize:** Generate a `Dockerfile` for Nginx + PHP-FPM + React build.
- [ ] **Deploy:** Connect GitHub repo and trigger the first build.

### Phase 7: Final Polish (22:00 – 00:00)
*Goal: Smoke testing and bug fixing.*
- [ ] **Click Test:** Manually test every button and flow.
- [ ] **Error Logs:** Copy any crashes to AI and apply immediate fixes.

---

## 🧠 Key Technical Decisions

1.  **Real-Time Engine:**
    * *Decision:* Use **Laravel Reverb** instead of raw `socket.io`.
    * *Reason:* It is a drop-in replacement for Pusher. This prevents a complete rewrite of the frontend Redux logic (which uses Laravel Echo) and avoids needing a separate Node.js server.

2.  **UI Library:**
    * *Decision:* Use **Shadcn/UI** (Radix UI + Tailwind).
    * *Reason:* Provides accessible, pre-built components that look professional out of the box, saving hours of CSS writing.

3.  **File Architecture:**
    * *Decision:* **Feature-based** folder structure.
    * *Reason:* Grouping by feature (Feed, Chat, Profile) is more scalable than grouping by file type (Components, Pages).

---

## 🤖 AI Prompt Toolkit

Copy these prompts to your AI assistant to speed up development.

**🔥 For Refactoring Components:**
> "I have a React component `ChatWindow.jsx` that is 500 lines long. It handles UI, WebSocket connections, and API calls. Please refactor this into:
> 1. A custom hook `useChatSocket` for the logic.
> 2. A Redux slice `chatSlice` for state.
> 3. A presentational component `ChatUI`."

**🔒 For Security Audits:**
> "Analyze this Laravel Controller method. It updates a user profile. Identify if a user can update someone else's email by changing the ID in the request (IDOR) and rewrite the code to prevent it using Laravel Policies."

**🎨 For UI Redesign:**
> "Here is my current Navbar code. It looks outdated. Rewrite it using Tailwind CSS. It should have a glassmorphism effect, a responsive mobile menu with a hamburger icon, and a language switcher dropdown."

**🐳 For Docker:**
> "Generate a production Dockerfile for a Laravel 11 and React Vite app served via Nginx. Include steps to build the frontend assets."
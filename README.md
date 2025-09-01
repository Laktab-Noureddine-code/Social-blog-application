# 🌐 Professional Social Network Platform

A full-stack social network web application built to foster professional and community interactions through blogging, pages, and groups. Developed as a final project at OFPPT – ISTA Bouznika.

## 📌 Project Overview

This platform allows users to create and manage profiles, join or create groups and pages, write blog articles, and communicate through real-time messaging. It supports a diverse range of user types such as individuals, content creators, professionals, and communities.

## ✨ Features

- 🔐 Secure authentication (login, registration, password reset)
- 👤 Profile creation and customization
- 📝 Blog system: Write and manage personal, group, or page-based articles
- 📄 Pages & 👥 Groups: Create thematic or professional spaces
- 💬 Real-time messaging (private & group chats) using WebSocket
- 🔍 Smart search and filters across all entities
- 📥 Save and report content
- 📱 Fully responsive interface (mobile, tablet, desktop)

## 🧰 Tech Stack

### Frontend

- **React.js** – Main framework
- **TailwindCSS** – For responsive utility-first design
- **Redux Toolkit** – State management
- **Tiptap** – Rich text editor (with image, code, YouTube extensions)
- **Framer Motion** – Animations
- **Radix UI & MUI** – UI components
- **Axios** – API requests
- **React Hook Form** – Form handling
- **Pusher JS** – Real-time WebSocket communication

### Backend

- **Laravel** – PHP framework for backend logic
- **Laravel Sanctum / JWT** – Token-based authentication
- **MySQL** – Relational database
- **Laravel Queues** – Background job processing
- **Pusher (WebSockets)** – Real-time messaging and notifications

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Composer
- PHP (v8+)
- MySQL
- Laravel CLI

### 1. Clone the repository

git clone https://github.com/Laktab-Noureddine-code/Social-blog-application.git
cd Social-blog-application

### 2. Setup Backend (Laravel)

- cd back-end
- composer install
- cp .env.example .env
- php artisan key:generate
- # Configure .env with DB credentials
- php artisan migrate
- php artisan serve
  
### 3. Setup Frontend (React)
cd front-end
- npm install
- npm run dev

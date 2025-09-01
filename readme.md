# simpleCMS

*A compact CMS built by merging my previous **simpleCRUD** (posts CRUD/MVC) and **simpleAuth** (session auth + password reset) projects into one cohesive codebase.*

## Overview
A simple content management system built with **Node.js, Express, MongoDB, and EJS**.  
It includes **session-based authentication**, Google login, secure password reset via Gmail OAuth2, and full CRUD for posts with view count, sorting, and image upload.

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **View Engine:** EJS
- **Auth & Security:** express-session, connect-mongo, passport-local, passport-google-oauth20, **argon2**, helmet, cors
- **Email:** Nodemailer + Gmail API (OAuth2)
- **File Upload:** Multer
- **Utilities:** dotenv, uuid, method-override
- **Testing:** Jest, Supertest

## Features
- User registration with **argon2** hashing
- Session-based login/logout (local strategy)
- Google OAuth2 social login
- Email-based password reset (Gmail OAuth2)
- Post **create / read / update / delete**
- View count tracking & sorting (latest / most viewed / oldest)
- Image upload for posts
- Basic security hardening (helmet, cors)
- Tests with Jest & Supertest

## API Routes (key)
| Method | Route           | Description              | Auth |
|------: |-----------------|--------------------------|:----:|
| GET    | /login          | Render login form        |  No  |
| POST   | /login          | Handle login             |  No  |
| POST   | /logout         | Handle logout            | Yes  |
| GET    | /register       | Render register form     |  No  |
| POST   | /register       | Handle registration      |  No  |
| GET    | /dashboard      | Dashboard page           | Yes  |
| GET    | /posts          | List posts               |  No  |
| GET    | /posts/new      | New post form            | Yes  |
| POST   | /posts          | Create post              | Yes  |
| GET    | /posts/:id      | View post                |  No  |
| PUT    | /posts/:id      | Update post              | Yes  |
| DELETE | /posts/:id      | Delete post              | Yes  |

## What I Learned
- Structuring Express apps with **MVC + service layer**
- Implementing secure **session authentication** and **Google OAuth2**
- Building a robust email **password reset** flow (Nodemailer + Gmail API)
- Using **argon2** for modern password hashing
- Handling **file uploads** with Multer
- Middleware chaining, access control, and practical test setup (Jest, Supertest)

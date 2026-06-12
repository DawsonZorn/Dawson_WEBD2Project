# Soccer Fan Club CMS
 
A containerized content management system for a soccer fan club, built with a Laravel REST API backend and a React frontend. Admins can manage blog content and moderate user activity through a dedicated dashboard.
 
## Features
 
- Public blog with viewable posts and comments
- User authentication (register, login, logout)
- Admin dashboard with full CRUD for blog posts
- Admin ability to edit and delete user comments
- Dockerized environment for consistent local development and deployment
- RESTful API backend consumed by a decoupled React frontend
## Tech Stack
 
- **Backend:** PHP, Laravel
- **Frontend:** React, Tailwind CSS
- **containerization:** Docker
- **Database:** MySQL
## Setup
 
```bash
# Clone the repository
git clone https://github.com/DawsonZorn/Dawson_WEBD2Project
 
# Navigate to project root
cd Dawson_WEBD2Project
 
# Start Docker containers
docker-compose up --build
 
# Install PHP dependencies (inside container or locally)
composer install
 
# Copy environment file and configure
cp .env.example .env
php artisan key:generate
 
# Run migrations and seed the database
php artisan migrate --seed
 
# Frontend (in a separate terminal)
cd frontend
npm install
npm run dev
```
 
## Usage
 
- Visit `http://localhost:3000` for the React frontend
- Visit `http://localhost:8000/api` for the Laravel API
- Register an account or log in to interact with posts and comments
- Admin credentials are seeded via the database seeder

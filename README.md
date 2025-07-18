# A60205222260
## URL Shortener Service
This is a full-stack URL shortener application built using Express.js for the backend and React.js for the frontend. It allows users to create shortened URLs, track click statistics, and manage URL expiry settings.


## Features
### Backend (Node.js, Express)
API to shorten URLs (with optional custom shortcode)

URL redirection based on shortcode

Expiry time support for URLs

In-memory URL storage

Logging of backend activity using a custom logger (with external logging service)

### Frontend (React)
Form to submit up to 5 URLs at once

View list of generated short URLs

Stats page to see click count and details

Client-side validations


## Project Structure:
├── backend/
│   ├── middleware/
│   │   └── logger.js
│   ├── models/
│   │   └── urlStore.js
│   ├── node_modules/
│   ├── routes/
│   │   └── urlRoutes.js
│   ├── utils/
│   │   └── generateCode.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ShortenerForm.jsx
│   │   │   └── UrlStats.jsx
│   │   ├── middleware/
│   │   │   └── log.js
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js



## Installation
1.Clone the repository
git clone https://github.com/ajayprataptomar/A60205222260.git
cd A60205222260

2.Backend setup
cd backend
npm install
npm start


3.Frontend setup
cd frontend
npm install
npm run dev

## API Endpoints
POST /shorten
Shorten up to 5 URLs.

GET /r/:code
Redirects to the original URL based on shortcode.

GET /stats
Returns all stored URLs and their click statistics.


## Output
See assests Folder


# Email OTP Login - Next.js + Upstash Redis

This is a simple Email OTP Login system built with Next.js 13, TypeScript, and Upstash Redis. Users can login using email OTP, verify OTP to create a session, and access protected routes. Session is persisted using cookies and OTPs are temporarily stored in Upstash Redis.

## Features

- Login with email OTP
- OTP verification with 6-digit code
- Session stored in a secure cookie (httpOnly)
- Middleware route protection
- Redirect logged-in users away from login page
- OTP stored temporarily in Upstash Redis
- Works in development and production

## Project Structure
```
otp-login/
├─ src/
│ ├─ app/
│ │ ├─ page.tsx # Login page
│ │ ├─ hello/page.tsx # Protected home page
│ ├─ api/
│ │ └─ auth/
│ │ ├─ request-otp.ts # Request OTP API
│ │ └─ verify-otp.ts # Verify OTP API
│ ├─ middleware.ts # Middleware to protect routes
│ ├─ otpStore.ts # OTP generation & verification with Redis
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ .env # Environment variables
└─ README.md
```

## Setup

Clone the repository:

```bash
git clone <repo-url>
cd otp-login
npm install

// inside .env.local file in root directory
 
EMAIL_USER=<your-email@gmail.com>
EMAIL_PASS=<your-email-password-or-app-password>
UPSTASH_REDIS_REST_URL=<your-upstash-redis-url>
UPSTASH_REDIS_REST_TOKEN=<your-upstash-redis-token>
AUTH_SECRET=<random-secret-for-hashing>
NEXT_PUBLIC_BASE_URL=http://localhost:3000

npm run dev


For production:

npm run build
npm start


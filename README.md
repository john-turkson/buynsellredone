This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started to test frontend

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Testing Locally with Netlify CLI

This README explains how to set up and use the **Netlify CLI** to test your application locally. The Netlify CLI allows you to run your project in a local environment that closely mimics the Netlify hosting environment, enabling you to test serverless functions, redirects, and more before deploying.

---

## Prerequisites

Before you begin, ensure the following:

1. **Node.js and npm installed**  
   Download and install Node.js from [nodejs.org](https://nodejs.org). npm comes bundled with Node.js.

2. **Netlify CLI installed**  
   You can install the CLI globally using npm:  
   ```bash
   npm install -g netlify-cli

3. **Initialize Netlify CLI in application**  
   Once you have installed the CLI, run the following to intialize the CLI in your application with:  
   ```bash
   netlify link

### Things to keep in mind

- These previous serverless functions such as 'login' and 'register' have been moved into the api folder for nextjs
- All serverless functions will be moved into the api folder and be accessed via the api folder in the src/app directory
- All env variables will be automatically loaded once the CLI is linked correctly
- To test locally, run the following `netlify dev`
 
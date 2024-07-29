# Task Tracker
This Next.js project includes a REST API for user login and registration. It is a task tracker designed to manage and monitor projects, customers, jobs, and workers. The application supports basic CRUD operations and is built to be both scalable and maintainable. Beyond authentication, it employs role-based authorization to secure functionalities. Additionally, the app is internationalized with translations available in both English and Italian.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all dependencies:

```bash
npm install
```

Create a .env file in the root directory of your project and add the following variables:

NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_WEBSITE_BASE_URL=http://localhost:3000

NODE_ENV=development

MONGODB_NAME=<your mongo db database name>
MONGODB_URI=mongodb://127.0.0.1:27017/$MONGODB_NAME

USER_SECRET_COOKIE_PASSWORD=<your secret cookie password>

First, run the development server:

```bash
npm run dev
```

For running tests:

```bash
npm run test
```

For checking typescript code:

```bash
npm run tsc
```

To create a production build:
```bash
npm run build
```
And then:
```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
- You can view all endpoints within the endpoint folder.
  
- The `pages/app` directory renders the AppSpa component giving you access to the react spa: `/app`.
- All AppSpa code is within the spas/app folder. It contains all scenes and redux-store. 
I developed a Single Page Application (SPA) in Next.js without using server-side rendering because SEARCH ENGINE OPTIMIZATION(SEO) is not necessary for this application. The app is private and requires login access. Given the private nature of the app, client-side data rendering is sufficient.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

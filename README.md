# Next.js + Kinde + MongoDB Template

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

1. Tailwind & shadcn/ui configured.
2. Kinde integration.
3. Prisma configured with MongoDB provider.
4. Kinde `user.created` webhook configured to create a user in the database.

## Getting Started

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Nunito, a custom Google Font.

## Environment Variables

Copy the `.env.example` to a `.env` file. Your values will be found on the Kinde & MongoDB platforms. More information below.

## Next.js

### Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Kinde

### Learn more

To learn more about Kinde, take a look at the following resources:

- [Kinde Documentation](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/)
- [Kinde Webhooks](https://docs.kinde.com/integrate/webhooks/webhooks-nextjs/)

## How to configure

When creating your project, you'll be presented with your environment values, copy & paste them into your `.env` file.

The only "private" route set up is `/app`, Kinde will default the `KINDE_POST_LOGIN_REDIRECT_URL` to point to `/dashboards`, you will need to change that to `/app` OR change the folder name to `dashboards`.

## Webhooks

For the `user.created` webhook, you'll need to set up [ngrok](https://ngrok.com/) to tunnel your localhost to the internet. You can then use the ngrok URL to set up the webhook on the Kinde platform.

- URL: `{Ngrok URL}/api/webhook/kinde/user.created`
- Event: `user.created`

If you update your `User` schema, you might have to update the webhook to populate the data correctly.

## Route protection

You _can_ configure the `middleware.ts` to protect routes, instead a `(private)` route group has been set up with a `layout.tsx` to protect that group of routes instead. You can configure the `middleware.ts` to protect individual routes if you wanted to, Kinde has docs for that as well.

## `getAppUser` helper

This custom helper combines the `getUser` method from Kinde and the `findUnique` method from Prisma to get the user from the database. This will add a `mongo` object to the user object that will continue MongoDB user data. Currently only the `_id` is added, but you can add more fields if you want.

## MongoDB Altas

### Learn more

To learn more about MongoDB, take a look at the following resources:

- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Prisma MongoDB](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)

### Connection string

Prisma has a _slightly_ different way for structuring the connection string to what MongoDB Atlas provides. If you grab the connection string it'll look like this:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=<appName>
```

Change it to the following:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<appName>
```

**IMPORTANT**: Try to avoid `#` or `@` in your username & password, and wrap your connection string in quotes in your `.env` file.

```
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<appName>"
```

## Styling & Components

The project is set up with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/). A default theme has been set up but you can configure the theme [here](https://ui.shadcn.com/themes).

A `shadcn` command is configured in the `package.json` to pull components into the `modules/design-system/ui` folder.

```bash
pnpm shadcn add <name>
```

## Project structure

The project follows [Module Driven Development](https://papers.adro.codes/module-driven-development) for the project structure, with a couple of modules already set up for the various parts of the template.

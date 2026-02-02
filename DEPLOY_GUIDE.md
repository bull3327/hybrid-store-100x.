
# 🚀 How to Launch Your Store for Facebook Ads

Currently, your store is running partly on your computer (`localhost`). To share it on Facebook, you need to **Deploy** it to the public internet.

Here is the safest and most professional way to do it using **Vercel** (the best host for Next.js) and **Supabase** (for the database).

## Step 1: Get a Cloud Database (Supabase)
Your current database is inside a Docker container on your laptop. Vercel cannot reach your laptop. You need a database in the cloud.

1.  Go to [Supabase.com](https://supabase.com) and sign up (Free tier).
2.  Create a **New Project**.
3.  Once created, go to **Project Settings** -> **Database**.
4.  Copy the **Connection String (URI)**. It looks like:
    `postgres://postgres.xxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
    *(Make sure to replace [YOUR-PASSWORD] with the password you created)*.

## Step 2: Connect Your App to the Cloud Database
1.  Open your `.env` file in this project.
2.  Comment out your local `DATABASE_URL` (put a `#` in front of it).
3.  Add your new Supabase URL:
    ```env
    DATABASE_URL="postgres://postgres.xxxx....."
    ```
4.  Run this command in your terminal to set up the new database:
    ```bash
    npx prisma db push
    npx prisma db seed
    ```

## Step 3: Deploy to Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub/GitLab/Bitbucket.
2.  Push your code to a Git repository (GitHub is easiest).
    *   *If you haven't used Git yet, ask me and I will initialize it for you.*
3.  On Vercel, click **Add New** -> **Project**.
4.  Import your repository.
5.  **Important**: In the "Environment Variables" section on Vercel, add:
    *   `DATABASE_URL`: (Paste your Supabase URL)
    *   `NEXTAUTH_SECRET`: (Paste the secret from your .env)
    *   `NEXTAUTH_URL`: https://your-project-name.vercel.app (You will get this URL after deployment, or you can set it to the domain you plan to buy).
6.  Click **Deploy**.

## Step 4: Share on Facebook
Once Vercel finishes, it will give you a link like `https://hybrid-store-100x.vercel.app`.

1.  Copy that link.
2.  Go to Facebook.
3.  Create a post or Ad.
4.  Paste the link.
5.  **Facebook will automatically detect the "Open Graph" tags** I just added to your code, and it will create a beautiful, clickable card with your store's image and title!

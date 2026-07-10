# GrowX Fashion - Zero Cost Live Production Deployment Guide
This guide walks you through launching your complete premium e-commerce stack (Next.js frontend, Python FastAPI backend, Supabase PostgreSQL DB, Auth, and Storage) absolutely **for free** using industry-standard developer free-tiers.

---

## 🛠️ Summary of Free-Tier Hosting Stack
| Component | Hosting Provider | Free-Tier Inclusions | Cost |
| :--- | :--- | :--- | :--- |
| **Database, Auth & Storage** | **Supabase** | 1 PostgreSQL DB (500MB), Supabase Auth (50K MAUs), 1GB Storage | **₹0 (Free)** |
| **Backend API (FastAPI)** | **Render** or **Koyeb** | Free web service runtime, auto git deployments, free SSL | **₹0 (Free)** |
| **Frontend UI (Next.js)** | **Vercel** | Unlimited static/SSR deployments, global CDN, free SSL | **₹0 (Free)** |
| **Code Repository** | **GitHub** | Unlimited public and private repositories, automated pipelines | **₹0 (Free)** |

---

## 📦 Step 1: Set Up Your Free Repositories on GitHub
Both Render and Vercel will deploy your live code directly from GitHub and re-deploy automatically whenever you push updates.

1. Go to [GitHub](https://github.com/) and register a free account if you haven't already.
2. Create **two separate private repositories**:
   * One for your frontend: `growx-fashion-frontend`
   * One for your backend: `growx-fashion-backend`
3. Push your backend code files (`main.py`, `config.py`, `requirements.txt`, etc.) to the backend repo.
4. Push your frontend code files (`package.json`, Zustand stores, components, etc.) to the frontend repo.

---

## 🗄️ Step 2: Provision Your Free Database & Auth on Supabase
Supabase provides a complete backend-as-a-service on a dedicated PostgreSQL database.

1. Register for a free account on [Supabase](https://supabase.com/).
2. Click **New Project**, select a region close to your target audience (e.g., **Mumbai/India** for Razorpay), and enter a secure database password.
3. Once the database is ready:
   * Go to the **SQL Editor** in the left menu.
   * Paste the entire content of your `supabase_schema.sql` file.
   * Click **Run**. This establishes all your tables, safety policies, and automatic cart links!
4. Go to **Project Settings → API** and copy your:
   * `Project URL`
   * `anon public key`
   * `service_role secret key` (Keep this private!)
5. Head to **Storage** and create a new **Public Bucket** named `product-images` where you will upload your product catalog photos.

---

## 🐍 Step 3: Host Your Python FastAPI Backend on Render (Free)
Render hosts Python microservices for free and connects securely to your Supabase database.

1. Register for a free account at [Render](https://render.com/).
2. Click **New +** → **Web Service**.
3. Link your GitHub account and select your `growx-fashion-backend` repository.
4. Configure the Web Service settings:
   * **Name:** `growx-fashion-api`
   * **Environment/Runtime:** `Python`
   * **Build Command:** `pip install -r requirements.txt` (Make sure your `requirements.txt` is in the root directory)
   * **Start Command:** `uvicorn backend.main:app --host 0.0.0.0 --port 10000`
   * **Instance Type:** Choose **Free** (includes free SSL, auto git deploys).
5. Click **Advanced** and add your environment variables:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   SUPABASE_JWT_SECRET=your-supabase-jwt-secret
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret
   STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
   RAZORPAY_KEY_ID=rzp_test_your_razorpay_key
   RAZORPAY_KEY_SECRET=rzp_secret_your_razorpay_secret
   ADMIN_EMAIL=admin@growxfashion.com
   ```
6. Click **Create Web Service**. Within 2-3 minutes, your live backend endpoint will look like:
   `https://growx-fashion-api.onrender.com`

> 💡 **Note on Render's Free Tier:** Free services automatically spin down after 15 minutes of inactivity. When a new user visits, the API might take about 30 seconds to "wake up" on the first request. To prevent this for free, you can use a free ping tool like [UptimeRobot](https://uptimerobot.com/) to ping `https://growx-fashion-api.onrender.com/` every 10 minutes!

---

## 🎨 Step 4: Host Your Next.js Frontend on Vercel (Free)
Vercel is the creator of Next.js and provides the fastest, highest-performing hosting for React apps.

1. Sign up on [Vercel](https://vercel.com/) using your GitHub credentials.
2. Click **Add New** → **Project**.
3. Select your `growx-fashion-frontend` repository from the linked GitHub account.
4. Vercel automatically detects Next.js configurations. Keep the default build settings as-is.
5. Expand the **Environment Variables** section and insert your client secrets:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   NEXT_PUBLIC_API_URL=https://growx-fashion-api.onrender.com/api/v1
   ```
6. Click **Deploy**. Vercel will bundle your assets, optimize images, and host your site globally under a secure subdomain like:
   `https://growx-fashion-frontend.vercel.app`

---

## ⚡ Step 5: Configure Free Google Auth & Webhooks

### Free Google Sign-In with Supabase
1. Go to the [Google Cloud Console](https://console.cloud.google.com/) (completely free).
2. Create a project and set up your **OAuth Consent Screen**.
3. Under **Credentials**, create an **OAuth client ID** (Application Type: Web Application).
4. In your Supabase Dashboard, go to **Authentication → Providers → Google**:
   * Enable Google.
   * Copy the **Redirect URI** provided by Supabase.
   * Paste this Redirect URI into Google Cloud Console under "Authorized redirect URIs".
   * Copy the generated `Client ID` and `Client Secret` from Google back into your Supabase settings and click Save!

### Free Payment Testing (Stripe + Razorpay)
1. Register for Stripe or Razorpay in **Developer/Test Mode** (no business registry required to test checkout loops!).
2. For Stripe, go to your Stripe dashboard webhooks page and set the endpoint to:
   `https://growx-fashion-api.onrender.com/api/v1/payments/stripe/webhook`
3. For Razorpay, go to settings and add your webhook listener pointing to:
   `https://growx-fashion-api.onrender.com/api/v1/payments/razorpay/webhook`

---

### 🎉 Your E-Commerce Store is now 100% Live and Operational!
Whenever you push changes or write code updates to your GitHub repository, both **Vercel** and **Render** will automatically build and update your live production servers immediately.

# april-86 Deployment Guide: Netlify (Frontend) & Render (Backend)

This guide walks you through deploying your **frontend to Netlify** and your **Flask backend to Render**, enabling real-time order processing, SMTP Gmail notifications to `priya4029657@gmail.com`, and customer confirmations.

---

## 🏛️ System Architecture

```
Customer (Browser)
       │
       ▼
Netlify (Frontend)
   https://your-site.netlify.app
       │
       │  HTTPS POST /api/send-order-email
       ▼
Render (Flask Web Service)
   https://your-backend.onrender.com
       │
       │  SMTP (smtp.gmail.com:587)
       ▼
priya4029657@gmail.com (Store Notification)
   & Customer Email (Confirmation Copy)
```

---

## 📁 Repository Structure

```
april-86/
├── frontend/                     ← Deploy to Netlify
│   ├── index.html                (Main storefront, cart, checkout)
│   ├── login.html                (User authentication & admin portal)
│   ├── script.js                 (Frontend logic, cart, API calls)
│   ├── login.js                  (Auth logic & admin controls)
│   ├── style.css                 (Store styling)
│   ├── login.css                 (Auth styling)
│   ├── images/                   (Product and banner assets)
│   └── netlify.toml              (Netlify redirects & headers)
│
├── backend/                      ← Deploy to Render
│   ├── app.py                    (Flask REST API & SMTP email sender)
│   ├── requirements.txt          (Flask, flask-cors, gunicorn, etc.)
│   ├── Procfile                  (web: gunicorn app:app)
│   ├── render.yaml               (Render service blueprint)
│   ├── .env                      (Local credentials — NEVER pushed to GitHub)
│   ├── .env.example              (Template for environment variables)
│   ├── users.json                (Customer & admin database)
│   ├── orders.json               (Order history store)
│   └── reviews.json              (Customer reviews store)
│
├── .gitignore                    (Protects .env and cache files)
├── netlify.toml                  (Root config pointing Netlify to frontend/)
├── DEPLOYMENT_GUIDE.md
└── start_store.bat               (Local 1-click launcher)
```

---

## Part 1: Deploy Backend to Render

### 1. Push Code to GitHub
Ensure your repository is pushed to GitHub. The `.gitignore` file automatically prevents your `.env` credentials from being uploaded.

```bash
git add .
git commit -m "Restructure project for Netlify frontend and Render backend"
git push origin main
```

### 2. Create Web Service on Render
1. Log in to [Render](https://dashboard.render.com/).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository (`april-86`).
4. Configure the service settings:
   - **Name**: `april-86-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: `Free`

### 3. Add Environment Variables on Render
Under **Environment Variables** in Render, add the following keys:

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `SENDER_EMAIL` | `april86shop@gmail.com` | Your Gmail address used to send orders |
| `SENDER_PASSWORD` | `lghaqlyfswssmaoz` | 16-character Gmail App Password (no spaces) |
| `RECEIVER_EMAIL` | `priya4029657@gmail.com` | Email address where store order alerts arrive |
| `OWNER_WHATSAPP` | `917708520530` | WhatsApp notifications recipient |
| `STORE_PHONE` | `7708520530` | Store support number |
| `PYTHON_VERSION` | `3.11.0` | Recommended Python version |

### 4. Deploy and Copy Your Render URL
1. Click **Deploy Web Service**.
2. Once deployed, Render will provide a live URL such as:
   `https://april-86-backend.onrender.com`
3. Verify your backend is running by visiting:
   `https://april-86-backend.onrender.com/health`
   You should see: `{"service":"april-86-backend","status":"healthy"}`.

---

## Part 2: Deploy Frontend to Netlify

### 1. Update Backend URL in Frontend
Open [`frontend/script.js`](frontend/script.js) around line 45 and set your live Render URL:

```javascript
const RENDER_BACKEND_URL = 'https://april-86-backend.onrender.com';
```

*(Optional: You can also set `window.BACKEND_API_URL` dynamically in `index.html` or use the Netlify proxy redirect in `frontend/netlify.toml`.)*

### 2. Deploy to Netlify
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** → **Import an existing project**.
3. Connect your GitHub account and select `april-86`.
4. Netlify will automatically detect [`netlify.toml`](netlify.toml):
   - **Base directory**: `frontend`
   - **Publish directory**: `.` (or `frontend` if deploying without root config)
   - **Build command**: *(leave empty)*
5. Click **Deploy site**.
6. Netlify will generate your public store URL (e.g. `https://april-86.netlify.app`).

---

## Part 3: Testing the Email Flow

1. Open your live Netlify store (`https://your-site.netlify.app`).
2. Add any item to the cart and proceed to **Checkout**.
3. Fill in the delivery details (Name, Phone, Email, Address) and click **Place Order**.
4. The frontend will dispatch an HTTPS POST request to:
   `https://april-86-backend.onrender.com/api/send-order-email`
5. The Flask backend:
   - Records the order in `orders.json`
   - Syncs or registers the user in `users.json`
   - Connects to `smtp.gmail.com:587` with TLS encryption
   - Sends a formatted HTML invoice to `priya4029657@gmail.com`
   - Sends a confirmation email to the customer's email address
6. The customer receives immediate visual confirmation on the frontend!

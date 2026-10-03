# april-86 — Elegance Dress Store

Fullstack e-commerce web application structured with a decoupled frontend for **Netlify** and a Python Flask backend for **Render**.

---

## 🏛️ Project Structure

```
april-86/
├── frontend/                  ← Deploy to Netlify
│   ├── index.html             (Storefront, product gallery, cart, checkout)
│   ├── login.html             (User authentication & admin portal)
│   ├── script.js              (Frontend logic & API calls)
│   ├── login.js               (Auth & session manager)
│   ├── style.css              (Modern responsive styling)
│   ├── login.css              (Authentication styling)
│   ├── images/                (Product images & banners)
│   └── netlify.toml           (Netlify headers and redirects)
│
├── backend/                   ← Deploy to Render
│   ├── app.py                 (Flask REST API & SMTP email sender)
│   ├── requirements.txt       (Flask, flask-cors, gunicorn, etc.)
│   ├── Procfile               (web: gunicorn app:app)
│   ├── render.yaml            (Render blueprint configuration)
│   ├── .env.example           (Template for environment variables)
│   ├── users.json             (Users & customer records)
│   ├── orders.json            (Orders database)
│   └── reviews.json           (Customer reviews)
│
├── DEPLOYMENT_GUIDE.md        (Complete Netlify & Render deployment manual)
├── netlify.toml               (Root Netlify configuration pointing to frontend/)
├── start_store.bat            (1-click local launcher)
└── .gitignore                 (Guards credentials and cache)
```

---

## 🚀 Quick Deployment

- **Frontend (Netlify)**:
  1. Base directory: `frontend`
  2. Publish directory: `.`
  3. Update `RENDER_BACKEND_URL` in [frontend/script.js](file:///d:/april-86/frontend/script.js) with your Render URL.

- **Backend (Render)**:
  1. Root directory: `backend`
  2. Build command: `pip install -r requirements.txt`
  3. Start command: `gunicorn app:app`
  4. Environment variables: `SENDER_EMAIL`, `SENDER_PASSWORD`, `RECEIVER_EMAIL` (see [backend/.env.example](file:///d:/april-86/backend/.env.example)).

For detailed instructions, see [DEPLOYMENT_GUIDE.md](file:///d:/april-86/DEPLOYMENT_GUIDE.md).

---

## 💻 Local Development

To run the full stack locally:
- Double-click [start_store.bat](file:///d:/april-86/start_store.bat)
- Or run:
  ```bash
  cd backend
  python app.py
  ```
- Open `http://localhost:5000` in your browser.

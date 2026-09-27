# 📧 Email Setup Guide — april-86 Dress Store

## Overview
- **Order Notification Email**: `priya4029657@gmail.com`
- **Store Contact / WhatsApp**: `+91 77085 20530`
- **Payment Method**: Cash on Delivery (COD)

---

## Step 1: Gmail App Password Configuration

Google requires an **App Password** for sending emails via SMTP.

Your credentials in `.env`:
```env
SENDER_EMAIL="april86shop@gmail.com"
SENDER_PASSWORD="lgha qlyf swss maoz"
RECEIVER_EMAIL="priya4029657@gmail.com"
OWNER_WHATSAPP="917708520530"
STORE_PHONE="7708520530"
```

---

## Step 2: Run the Backend Server

Open a terminal in the project directory (`d:\april-86`) and run:

```bash
python app.py
```

You should see:
```
==================================================
  ✦ ELEGANCE DRESS STORE — Backend Server
==================================================
  🌐 Open: http://localhost:5000
  📧 Receiver Email: priya4029657@gmail.com
  📲 WhatsApp: 917708520530
==================================================
```

---

## Step 3: Open the Website

With the server running, open: **http://localhost:5000**

---

## How Order Emails Work

```
Customer clicks "Place Order" (Cash on Delivery)
        ↓
Browser sends order data to http://localhost:5000/send-order-email
        ↓
Flask server receives customer & product details
        ↓
Python sends a formatted HTML email via Gmail SMTP
        ↓
Order notification arrives in priya4029657@gmail.com 📬
(Confirmation is also sent to the customer if email was provided)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Authentication failed" | Check that your 16-character Gmail App Password in `.env` is active |
| "Connection refused" | Make sure `python app.py` is running in your terminal |
| Email in Spam folder | Check Spam/Junk folder and mark as "Not Spam" |

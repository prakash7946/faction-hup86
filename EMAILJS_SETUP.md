# 🚀 EmailJS Setup Guide — Run Anywhere Without a Backend

With **EmailJS**, your store (`april-86`) can send real order notification emails to `priya4029657@gmail.com` **directly from the browser**.

This means you can host your website **anywhere for free**:
- 🌐 **GitHub Pages**
- ⚡ **Netlify**
- ▲ **Vercel**
- 💻 **Static web hosting or opening `index.html` directly in browser**
- 🚫 **No Python or Flask server required!**

---

## ⚡ 2-Minute Setup Steps

### Step 1: Create a Free EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and click **Sign Up Free** (Free tier gives 200 emails/month).

---

### Step 2: Add Email Service (Gmail)
1. In the EmailJS Dashboard, click **Email Services** -> **Add New Service**.
2. Select **Gmail**.
3. Connect your Gmail account (`april86shop@gmail.com` or your preferred sender email).
4. Note your **Service ID** (e.g., `service_abc123` or `service_april86`).

---

### Step 3: Create Email Template
1. Go to **Email Templates** -> **Create New Template**.
2. Set **To Email**: `priya4029657@gmail.com` (or `{{to_email}}`).
3. Set **Subject**: `🛍️ New Order {{order_id}} — {{customer_name}} ({{total}})`
4. Set the **Content / Body** to:

```html
<h2>🛍️ New Order Received — april-86</h2>
<p><strong>Order ID:</strong> {{order_id}}</p>
<p><strong>Date:</strong> {{order_date}}</p>
<p><strong>Payment Method:</strong> {{payment_method}}</p>

<hr/>

<h3>👤 Customer Details</h3>
<p><strong>Name:</strong> {{customer_name}}</p>
<p><strong>Phone:</strong> {{customer_phone}}</p>
<p><strong>Email:</strong> {{customer_email}}</p>
<p><strong>Delivery Address:</strong> {{customer_address}}</p>

<hr/>

<h3>📦 Ordered Items</h3>
{{{items_html}}}

<p><strong>Subtotal:</strong> {{subtotal}}</p>
<p><strong>Shipping:</strong> {{shipping}}</p>
<p><strong>Grand Total:</strong> <strong>{{total}}</strong></p>

<hr/>
<p style="color:#777; font-size:12px;">april-86 Dress Store Automated Notification</p>
```

5. Click **Save** and note your **Template ID** (e.g., `template_xyz789` or `template_april86`).

---

### Step 4: Get Your Public Key
1. Go to **Account** -> **General** tab.
2. Find and copy your **Public Key** (e.g., `user_XXXXXXXXX` or `XXXXXXXXXXXXXX`).

---

### Step 5: Update `script.js`
Open [script.js](file:///d:/april-86/script.js) and update the `EMAILJS_CONFIG` object at the top:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',     // Replace with your Service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',   // Replace with your Template ID
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',     // Replace with your Public Key
  RECEIVER_EMAIL: 'priya4029657@gmail.com',
  STORE_NAME: 'april-86 Dress Store',
  STORE_PHONE: '7708520530'
};
```

---

## 🎯 How It Works

```
Customer clicks "Place Order"
            ↓
Browser executes EmailJS SDK directly
            ↓
EmailJS Cloud dispatches formatted email
            ↓
Order arrives instantly in priya4029657@gmail.com 📬
```

- **Works everywhere**: Localhost, Netlify, Vercel, GitHub Pages, or direct file open.
- **Auto fallback**: If Flask is running locally, it can also use Flask if EmailJS is not configured.

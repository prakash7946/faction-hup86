"""
==========================================
  ELEGANCE DRESS STORE — FLASK BACKEND
  Email & WhatsApp notification server
==========================================
  Setup:
  1. pip install flask flask-cors python-dotenv
  2. Set your email & CallMeBot credentials in .env
  3. Run: python app.py
  4. Open: http://localhost:5000
==========================================
"""

from flask import Flask, request, jsonify, send_from_directory
import urllib.parse
import urllib.request
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='.')
CORS(app)  # Allow cross-origin requests from the frontend

# ==================== EMAIL CONFIG ====================
# Using Gmail SMTP — credentials loaded from .env
SENDER_EMAIL    = os.environ.get("SENDER_EMAIL", "april86shop@gmail.com")
SENDER_PASSWORD = os.environ.get("SENDER_PASSWORD", "lgha qlyf swss maoz").replace(" ", "")
RECEIVER_EMAIL  = os.environ.get("RECEIVER_EMAIL", "priya4029657@gmail.com")  # Order notifications sent here

# ==================== WHATSAPP CONFIG ====================
OWNER_WHATSAPP   = os.environ.get("OWNER_WHATSAPP", "917708520530")
CALLMEBOT_APIKEY = os.environ.get("CALLMEBOT_APIKEY", "1234567")


# ==================== SERVE FRONTEND ====================
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)


# ==================== SEND ORDER EMAIL API ====================
@app.route('/send-order-email', methods=['POST'])
def send_order_email():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'No data received'}), 400

        order_id    = data.get('orderId', 'N/A')
        customer    = data.get('customer', {})
        items       = data.get('items', [])
        subtotal    = data.get('subtotal', 0)
        shipping    = data.get('shipping', 0)
        total       = data.get('total', 0)
        order_date  = data.get('date', datetime.now().strftime('%d/%m/%Y %I:%M %p'))

        base_url = request.host_url.rstrip('/')

        # ---- Build HTML and text for items ----
        items_html = ""
        items_text = ""
        for item in items:
            item_total = item['price'] * item['qty']
            img_path = item.get('image', '').lstrip('/')
            img_url = f"{base_url}/{img_path}" if img_path else ''
            
            img_tag = f'<img src="{img_url}" alt="{item["name"]}" style="width:50px;height:60px;object-fit:cover;border-radius:6px;margin-right:12px;vertical-align:middle;">' if img_url else ''

            items_html += f"""
            <tr>
              <td style="padding:12px; border-bottom:1px solid #f0e0e8;">
                <div style="display:flex;align-items:center;">
                  {img_tag}
                  <span style="font-weight:600;color:#1a1a2e;">{item['name']}</span>
                </div>
              </td>
              <td style="padding:12px; border-bottom:1px solid #f0e0e8; text-align:center;">{item['size']}</td>
              <td style="padding:12px; border-bottom:1px solid #f0e0e8; text-align:center;">{item['qty']}</td>
              <td style="padding:12px; border-bottom:1px solid #f0e0e8; text-align:right; color:#c9547a; font-weight:700;">₹{item_total:,}</td>
            </tr>"""
            items_text += f"  • {item['name']} (Size: {item['size']}) × {item['qty']} = ₹{item_total:,}\n"

        shipping_display = "FREE 🎉" if shipping == 0 else f"₹{shipping:,}"

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#f5f0f8; font-family:'Segoe UI',Arial,sans-serif; color:#2d3436;">
  <div style="max-width:640px; margin:30px auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 30px rgba(0,0,0,0.12);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#c9547a,#a83d62); padding:36px 40px; text-align:center;">
      <div style="font-size:28px; font-weight:800; color:#fff; letter-spacing:-0.5px;">✦ april-86</div>
      <div style="color:rgba(255,255,255,0.9); font-size:14px; margin-top:6px; letter-spacing:1px;">NEW ORDER NOTIFICATION</div>
    </div>

    <!-- Success Banner -->
    <div style="background:#f0faf4; border-bottom:3px solid #2ed573; padding:20px 40px; text-align:center;">
      <div style="font-size:36px; margin-bottom:6px;">🎉</div>
      <h1 style="margin:0; font-size:22px; color:#1a1a2e;">New Order Received!</h1>
      <p style="margin:8px 0 0; color:#6b6b8a; font-size:14px;">Order ID: <strong>{order_id}</strong> • {order_date}</p>
    </div>

    <!-- Body Content -->
    <div style="padding:32px 40px;">

      <!-- Order ID Box -->
      <div style="background:#fdf3f7; border:1px solid #f0d0de; border-radius:10px; padding:16px 20px; margin-bottom:28px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:13px; color:#6b6b8a; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Order ID</span>
        <span style="font-size:16px; font-weight:800; color:#c9547a;">{order_id}</span>
      </div>

      <!-- Customer Details -->
      <h2 style="font-size:15px; font-weight:700; color:#1a1a2e; text-transform:uppercase; letter-spacing:0.8px; margin:0 0 14px; border-bottom:2px solid #f0e0e8; padding-bottom:10px;">
        📦 Customer & Delivery Details
      </h2>
      <table style="width:100%; border-collapse:collapse; margin-bottom:28px; font-size:14px;">
        <tr><td style="padding:8px 0; color:#6b6b8a; width:35%;">👤 Name:</td><td style="padding:8px 0; font-weight:600; color:#1a1a2e;">{customer.get('name','')}</td></tr>
        <tr><td style="padding:8px 0; color:#6b6b8a;">📞 Phone:</td><td style="padding:8px 0; font-weight:600; color:#1a1a2e;">{customer.get('phone','')}</td></tr>
        <tr><td style="padding:8px 0; color:#6b6b8a;">📧 Email:</td><td style="padding:8px 0; font-weight:600; color:#1a1a2e;">{customer.get('email','')}</td></tr>
        <tr><td style="padding:8px 0; color:#6b6b8a;">📍 Address:</td><td style="padding:8px 0; font-weight:600; color:#1a1a2e;">{customer.get('address','')}, {customer.get('city','')}&nbsp;–&nbsp;{customer.get('pin','')}</td></tr>
        <tr><td style="padding:8px 0; color:#6b6b8a;">📅 Date:</td><td style="padding:8px 0; font-weight:600; color:#1a1a2e;">{order_date}</td></tr>
      </table>

      <!-- Items -->
      <h2 style="font-size:15px; font-weight:700; color:#1a1a2e; text-transform:uppercase; letter-spacing:0.8px; margin:0 0 14px; border-bottom:2px solid #f0e0e8; padding-bottom:10px;">
        🛍️ Items Ordered
      </h2>
      <table style="width:100%; border-collapse:collapse; font-size:14px; margin-bottom:20px;">
        <thead>
          <tr style="background:#fdf3f7;">
            <th style="padding:10px 12px; text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:#6b6b8a;">Product</th>
            <th style="padding:10px 12px; text-align:center; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:#6b6b8a;">Size</th>
            <th style="padding:10px 12px; text-align:center; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:#6b6b8a;">Qty</th>
            <th style="padding:10px 12px; text-align:right; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:#6b6b8a;">Amount</th>
          </tr>
        </thead>
        <tbody>{items_html}</tbody>
      </table>

      <!-- Totals -->
      <div style="background:#fdf3f7; border-radius:10px; padding:16px 20px; margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; font-size:14px; color:#6b6b8a; padding:5px 0;">
          <span>Subtotal</span><span>₹{subtotal:,}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:14px; color:#6b6b8a; padding:5px 0;">
          <span>Shipping</span><span style="color:#2ed573; font-weight:600;">{shipping_display}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:17px; font-weight:800; color:#1a1a2e; padding:10px 0 0; border-top:1px solid #e8d0de; margin-top:8px;">
          <span>Grand Total</span><span style="color:#c9547a;">₹{total:,}</span>
        </div>
      </div>

      <!-- Payment Section -->
      <div style="background:#f0faf4; border:1px solid #b7ebc9; border-radius:10px; padding:16px 20px; margin-bottom:28px;">
        <div style="font-weight:700; color:#1b7e3d; font-size:14px; margin-bottom:6px;">💵 Payment Method: Cash on Delivery (COD)</div>
        <div style="font-size:13px; color:#2d3436; line-height:1.6;">
          • Pay ₹{total:,} cash when your order arrives at your doorstep<br>
          • Store Contact / WhatsApp: <strong>7708520530</strong>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#fdf3f7; padding:20px 40px; text-align:center; border-top:1px solid #f0e0e8; font-size:12px; color:#6b6b8a;">
      ✦ april-86 Dress Store • Notification sent to {RECEIVER_EMAIL}
    </div>

  </div>
</body>
</html>
"""

        text_body = f"""
==============================================
  ✦ april-86 DRESS STORE — NEW ORDER
==============================================

ORDER PLACED SUCCESSFULLY! ✅
Order ID: {order_id}
Date: {order_date}

DELIVERY DETAILS:
-----------------
Name:    {customer.get('name','')}
Phone:   {customer.get('phone','')}
Email:   {customer.get('email','')}
Address: {customer.get('address','')}, {customer.get('city','')} - {customer.get('pin','')}

ITEMS ORDERED:
--------------
{items_text}

Subtotal:  ₹{subtotal:,}
Shipping:  {shipping_display}
TOTAL:     ₹{total:,}

💵 PAYMENT METHOD:
-------------------------
Cash on Delivery (COD)
Pay ₹{total:,} in cash when your order arrives.
Store Contact: 7708520530

Thank you for shopping with april-86!
"""

        # ---- Send via Gmail SMTP ----
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"✦ New Order #{order_id} Received — april-86 Store"
        msg['From']    = f"april-86 Dress Store <{SENDER_EMAIL}>"
        msg['To']      = RECEIVER_EMAIL

        msg.attach(MIMEText(text_body, 'plain', 'utf-8'))
        msg.attach(MIMEText(html_body, 'html', 'utf-8'))

        customer_email = customer.get('email', '')

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.ehlo()
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            
            # Send to store receiver (priya4029657@gmail.com)
            server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())
            print(f"✅ Order notification email sent to: {RECEIVER_EMAIL}")

            # Send confirmation copy to customer if email is provided
            if customer_email and customer_email.strip() != "":
                customer_msg = MIMEMultipart('alternative')
                customer_msg['Subject'] = f"✦ Your Order #{order_id} is Confirmed! — april-86"
                customer_msg['From']    = f"april-86 Dress Store <{SENDER_EMAIL}>"
                customer_msg['To']      = customer_email
                customer_msg.attach(MIMEText(text_body, 'plain', 'utf-8'))
                customer_msg.attach(MIMEText(html_body, 'html', 'utf-8'))
                server.sendmail(SENDER_EMAIL, customer_email, customer_msg.as_string())
                print(f"📧 Confirmation email sent to customer: {customer_email}")

        print(f"✅ Order email processed successfully! Order ID: {order_id}")
        return jsonify({'success': True, 'message': f'Order email sent to {RECEIVER_EMAIL}'})

    except smtplib.SMTPAuthenticationError:
        print("❌ Gmail authentication failed. Check your App Password.")
        return jsonify({'success': False, 'error': 'Email authentication failed. Check your Gmail App Password.'}), 500
    except Exception as e:
        print(f"❌ Email error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500


# ==================== WHATSAPP STATUS API ====================
@app.route('/whatsapp-status', methods=['GET'])
def whatsapp_status():
    configured = CALLMEBOT_APIKEY != "YOUR_CALLMEBOT_APIKEY"
    return jsonify({'configured': configured})


# ==================== SEND WHATSAPP API ====================
@app.route('/send-whatsapp', methods=['POST'])
def send_whatsapp():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'No data received'}), 400

        order_id   = data.get('orderId', 'N/A')
        customer   = data.get('customer', {})
        items      = data.get('items', [])
        subtotal   = data.get('subtotal', 0)
        shipping   = data.get('shipping', 0)
        total      = data.get('total', 0)
        order_date = data.get('date', datetime.now().strftime('%d/%m/%Y %I:%M %p'))

        # Build item lines with image links
        base_url = request.host_url.rstrip('/')
        item_parts = []
        for item in items:
            img_path = item.get('image', '').lstrip('/')
            img_url  = f"{base_url}/{img_path}" if img_path else ''
            line = (
                f"  • {item['name']} (Size: {item['size']}) x{item['qty']} "
                f"= Rs.{item['price'] * item['qty']:,}"
            )
            if img_url:
                line += f"\n    📷 Image: {img_url}"
            item_parts.append(line)
        item_lines = "\n".join(item_parts)

        shipping_display = "FREE" if shipping == 0 else f"Rs.{shipping:,}"

        message = (
            f"NEW ORDER - april-86\n"
            f"------------------------\n"
            f"Order ID: {order_id}\n"
            f"Date: {order_date}\n\n"
            f"CUSTOMER:\n"
            f"Name: {customer.get('name', '')}\n"
            f"Phone: {customer.get('phone', '')}\n"
            f"Email: {customer.get('email', '')}\n"
            f"Address: {customer.get('address', '')}, {customer.get('city', '')} - {customer.get('pin', '')}\n\n"
            f"ITEMS ORDERED:\n"
            f"{item_lines}\n\n"
            f"------------------------\n"
            f"Subtotal: Rs.{subtotal:,}\n"
            f"Shipping: {shipping_display}\n"
            f"TOTAL: Rs.{total:,}\n\n"
            f"Payment: Cash on Delivery (COD) | Contact: 7708520530\n"
            f"------------------------"
        )

        # Check if API key is configured
        if CALLMEBOT_APIKEY == "YOUR_CALLMEBOT_APIKEY":
            return jsonify({'success': False, 'error': 'CallMeBot not configured.'})
            
        if CALLMEBOT_APIKEY == "1234567":
            return jsonify({'success': True, 'message': 'WhatsApp message simulated.'})

        # Send directly via CallMeBot API
        encoded_msg = urllib.parse.quote(message)
        callmebot_url = (
            f"https://api.callmebot.com/whatsapp.php"
            f"?phone={OWNER_WHATSAPP}"
            f"&text={encoded_msg}"
            f"&apikey={CALLMEBOT_APIKEY}"
        )
        req = urllib.request.Request(callmebot_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp_text = resp.read().decode('utf-8')
            print(f"CallMeBot response: {resp_text[:120]}")

        print(f"\n✅ WhatsApp sent directly to {OWNER_WHATSAPP} | Order: {order_id}")
        return jsonify({'success': True, 'message': 'WhatsApp message sent directly to owner!'})

    except urllib.error.URLError as e:
        print(f"❌ WhatsApp network error: {e.reason}")
        return jsonify({'success': False, 'error': f'Network error: {e.reason}'}), 500
    except Exception as e:
        print(f"❌ WhatsApp error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500


# ==================== RUN SERVER ====================
if __name__ == '__main__':
    print("=" * 50)
    print("  ✦ ELEGANCE DRESS STORE — Backend Server")
    print("=" * 50)
    print("  🌐 Open: http://localhost:5000")
    print("  📧 Receiver Email: " + RECEIVER_EMAIL)
    print("  📲 WhatsApp: " + OWNER_WHATSAPP)
    print("=" * 50)
    app.run(debug=True, port=5000)

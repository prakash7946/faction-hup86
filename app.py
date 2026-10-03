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
import sys
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import json
import hashlib
from datetime import datetime
from dotenv import load_dotenv

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

load_dotenv()

app = Flask(__name__, static_folder='.')
CORS(app)  # Allow cross-origin requests from the frontend

USERS_JSON_PATH   = os.path.join(os.path.dirname(__file__), 'users.json')
ORDERS_JSON_PATH  = os.path.join(os.path.dirname(__file__), 'orders.json')
REVIEWS_JSON_PATH = os.path.join(os.path.dirname(__file__), 'reviews.json')

def load_reviews_from_json():
    if not os.path.exists(REVIEWS_JSON_PATH):
        return []
    try:
        with open(REVIEWS_JSON_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading {REVIEWS_JSON_PATH}: {e}")
        return []

def save_reviews_to_json(reviews):
    try:
        with open(REVIEWS_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(reviews, f, indent=2)
        return True
    except Exception as e:
        print(f"Error writing {REVIEWS_JSON_PATH}: {e}")
        return False

def load_users_from_json():
    if not os.path.exists(USERS_JSON_PATH):
        return []
    try:
        with open(USERS_JSON_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading {USERS_JSON_PATH}: {e}")
        return []

def save_users_to_json(users):
    try:
        with open(USERS_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(users, f, indent=2)
        return True
    except Exception as e:
        print(f"Error writing {USERS_JSON_PATH}: {e}")
        return False

def load_orders_from_json():
    if not os.path.exists(ORDERS_JSON_PATH):
        return []
    try:
        with open(ORDERS_JSON_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading {ORDERS_JSON_PATH}: {e}")
        return []

def save_orders_to_json(orders):
    try:
        with open(ORDERS_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(orders, f, indent=2)
        return True
    except Exception as e:
        print(f"Error writing {ORDERS_JSON_PATH}: {e}")
        return False

def get_or_create_user(customer_data, explicit_user_id=None):
    """
    Checks if a user exists in users.json (by ID, email, or phone).
    If not, automatically creates a new user with unique ID and saves to users.json.
    Returns the user dict with 'id'.
    """
    if not isinstance(customer_data, dict):
        customer_data = {}

    users = load_users_from_json()
    email = (customer_data.get('email') or '').strip().lower()
    phone = (customer_data.get('phone') or '').strip()
    name = (customer_data.get('name') or 'Customer').strip()
    user_id = explicit_user_id or customer_data.get('user_id') or customer_data.get('userId') or customer_data.get('id')

    matched_user = None

    # 1. Match by explicit user_id
    if user_id:
        matched_user = next((u for u in users if u.get('id') == user_id), None)

    # 2. Match by email
    if not matched_user and email and '@' in email:
        matched_user = next((u for u in users if (u.get('email') or '').strip().lower() == email), None)

    # 3. Match by phone
    if not matched_user and phone and len(phone) >= 8:
        matched_user = next((u for u in users if (u.get('phone') or '').strip() == phone), None)

    if matched_user:
        # Update user details if newly available
        updated = False
        if not matched_user.get('phone') and phone:
            matched_user['phone'] = phone
            updated = True
        if name and name != 'Customer' and (not matched_user.get('name') or matched_user.get('name') == 'Customer'):
            matched_user['name'] = name
            updated = True
        matched_user['last_active'] = datetime.now().isoformat() + 'Z'
        if updated:
            save_users_to_json(users)
        return matched_user

    # Generate user ID
    if not user_id:
        clean_prefix = email.split('@')[0] if email and '@' in email else ''
        clean_prefix = ''.join(c if c.isalnum() else '_' for c in clean_prefix).strip('_')
        if clean_prefix:
            user_id = f"usr_{clean_prefix}"
            if any(u.get('id') == user_id for u in users):
                user_id = f"usr_{clean_prefix}_{int(datetime.now().timestamp()) % 10000}"
        else:
            user_id = f"usr_{int(datetime.now().timestamp())}"

    new_user = {
        'id': user_id,
        'name': name,
        'email': email if email else f"{user_id}@store.local",
        'phone': phone,
        'role': 'customer',
        'created_at': datetime.now().isoformat() + 'Z',
        'last_login': datetime.now().isoformat() + 'Z'
    }

    if customer_data.get('address'):
        new_user['address'] = customer_data.get('address')
    if customer_data.get('city'):
        new_user['city'] = customer_data.get('city')
    if customer_data.get('state'):
        new_user['state'] = customer_data.get('state')

    users.append(new_user)
    save_users_to_json(users)
    print(f"👤 Created & stored user {user_id} ({name} - {email}) in users.json")
    return new_user

# ==================== EMAIL CONFIG ====================
# Using Gmail SMTP — credentials loaded from .env
SENDER_EMAIL    = os.environ.get("SENDER_EMAIL", "april86shop@gmail.com")
SENDER_PASSWORD = os.environ.get("SENDER_PASSWORD", "lgha qlyf swss maoz").replace(" ", "")
RECEIVER_EMAIL  = os.environ.get("RECEIVER_EMAIL", "priya4029657@gmail.com")  # Order notifications sent here

# ==================== WHATSAPP CONFIG ====================
OWNER_WHATSAPP   = os.environ.get("OWNER_WHATSAPP", "917708520530")
CALLMEBOT_APIKEY = os.environ.get("CALLMEBOT_APIKEY", "1234567")


# ==================== SERVE FRONTEND & AUTH ====================
@app.route('/')
@app.route('/index.html')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/login')
@app.route('/login.html')
def login_page():
    return send_from_directory('.', 'login.html')

# ==================== SHA-256 USER JSON STORE API ====================
@app.route('/api/users', methods=['GET'])
def get_users_json():
    users = load_users_from_json()
    return jsonify(users)

@app.route('/api/sync-users', methods=['POST'])
def sync_users_json():
    data = request.get_json()
    if isinstance(data, list):
        save_users_to_json(data)
        return jsonify({'success': True, 'count': len(data)})
    return jsonify({'success': False, 'error': 'Invalid format'}), 400

@app.route('/api/auth/register', methods=['POST'])
def api_register():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    raw_password = data.get('password', '')

    if not email or not raw_password:
        return jsonify({'success': False, 'error': 'Email and password required'}), 400

    users = load_users_from_json()
    if any(u.get('email') == email for u in users):
        return jsonify({'success': False, 'error': 'User with this email already exists'}), 409

    # SHA-256 Hashing
    password_hash = hashlib.sha256(raw_password.encode('utf-8')).hexdigest()

    new_user = {
        'id': data.get('id') if data.get('id') else f"usr_{int(datetime.now().timestamp())}",
        'name': data.get('name') if data.get('name') else email.split('@')[0],
        'email': email,
        'phone': data.get('phone', ''),
        'password_hash': password_hash,
        'hash_algorithm': 'SHA-256',
        'role': 'customer',
        'created_at': datetime.now().isoformat() + 'Z',
        'last_login': datetime.now().isoformat() + 'Z',
        'remember_me': bool(data.get('remember_me', False))
    }

    users.append(new_user)
    save_users_to_json(users)
    return jsonify({'success': True, 'user': new_user, 'message': 'Registered successfully with SHA-256 hash'}), 201

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.get_json() or {}
    identifier = (data.get('email') or data.get('id') or data.get('user_id') or data.get('username') or '').strip().lower()
    raw_password = data.get('password', '')
    provided_hash = data.get('password_hash')

    if not identifier or (not raw_password and not provided_hash):
        return jsonify({'success': False, 'error': 'Missing User ID/Email or password'}), 400

    # Compute or verify SHA-256
    calc_hash = provided_hash if provided_hash else hashlib.sha256(raw_password.encode('utf-8')).hexdigest()

    users = load_users_from_json()
    matched_user = next((u for u in users if (u.get('id', '').lower() == identifier) or (u.get('email', '').lower() == identifier)), None)

    # STRICT CHECK: If user is not in users.json, deny login!
    if not matched_user:
        return jsonify({
            'success': False, 
            'error': f'Access Denied: User "{identifier}" not found in users.json. Only existing users in users.json can log in.'
        }), 404

    # Verify password if user has password_hash
    if matched_user.get('password_hash'):
        if matched_user.get('password_hash') != calc_hash:
            return jsonify({'success': False, 'error': f'Invalid password for {matched_user.get("id")}'}), 401
    else:
        # First-time customer login: save their password hash
        matched_user['password_hash'] = calc_hash
        matched_user['hash_algorithm'] = 'SHA-256'

    matched_user['last_login'] = datetime.now().isoformat() + 'Z'
    save_users_to_json(users)
    return jsonify({'success': True, 'user': matched_user, 'message': 'Login successful (SHA-256 verified)'}), 200

# ==================== ORDERS JSON DATA STORE API ====================
@app.route('/api/orders', methods=['GET'])
def get_orders_json():
    orders = load_orders_from_json()
    return jsonify(orders)

@app.route('/api/orders', methods=['POST'])
def save_new_order_json():
    data = request.get_json() or {}
    if not data:
        return jsonify({'success': False, 'error': 'No order data'}), 400

    orders = load_orders_from_json()
    order_id = data.get('order_id') or data.get('orderId')
    
    # Auto-associate or create user in users.json
    customer_info = data.get('customer') if isinstance(data.get('customer'), dict) else {}
    explicit_user_id = data.get('user_id') or customer_info.get('user_id')
    user = get_or_create_user(customer_info, explicit_user_id=explicit_user_id)
    assigned_user_id = user['id']

    data['user_id'] = assigned_user_id
    if isinstance(data.get('customer'), dict):
        data['customer']['user_id'] = assigned_user_id

    # Check if existing order to update
    existing = next((o for o in orders if (o.get('order_id') == order_id or o.get('orderId') == order_id)), None)
    if existing:
        existing.update(data)
        save_orders_to_json(orders)
        return jsonify({'success': True, 'action': 'updated', 'count': len(orders), 'user_id': assigned_user_id})
    else:
        orders.insert(0, data)
        save_orders_to_json(orders)
        return jsonify({'success': True, 'action': 'created', 'count': len(orders), 'user_id': assigned_user_id})

@app.route('/api/sync-orders', methods=['POST'])
def sync_orders_json():
    incoming = request.get_json()
    if not isinstance(incoming, list):
        return jsonify({'success': False, 'error': 'Expected JSON array'}), 400
    
    # Ensure all synced orders have a user_id and corresponding user in users.json
    for order in incoming:
        if isinstance(order, dict):
            cust = order.get('customer') if isinstance(order.get('customer'), dict) else {}
            u_id = order.get('user_id') or cust.get('user_id')
            user = get_or_create_user(cust, explicit_user_id=u_id)
            order['user_id'] = user['id']
            if isinstance(order.get('customer'), dict):
                order['customer']['user_id'] = user['id']

    save_orders_to_json(incoming)
    return jsonify({'success': True, 'count': len(incoming)})

# ==================== REVIEWS & FEEDBACK JSON DATA STORE API ====================
@app.route('/api/reviews', methods=['GET'])
def get_reviews_json():
    reviews = load_reviews_from_json()
    return jsonify(reviews)

@app.route('/api/reviews', methods=['POST'])
def save_new_review_json():
    data = request.get_json() or {}
    if not data:
        return jsonify({'success': False, 'error': 'No review data'}), 400

    name = data.get('name', 'Valued Customer').strip()
    text = data.get('text', '').strip()
    rating = int(data.get('rating') or 5)
    location = data.get('location', '').strip() or 'Tamil Nadu'
    product = data.get('product', '').strip()

    if not text:
        return jsonify({'success': False, 'error': 'Review text is required'}), 400

    reviews = load_reviews_from_json()
    new_review = {
        'id': data.get('id') or f"rv_{int(datetime.now().timestamp())}",
        'name': name,
        'location': location,
        'rating': rating,
        'text': text,
        'product': product,
        'user_id': data.get('user_id') or data.get('userId'),
        'created_at': datetime.now().isoformat() + 'Z'
    }

    reviews.insert(0, new_review)
    save_reviews_to_json(reviews)
    print(f"⭐ New Customer Review added from {name} ({location}) - {rating} Stars")
    return jsonify({'success': True, 'review': new_review, 'count': len(reviews)}), 201

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

        # ---- Auto-save user to users.json and order to orders.json ----
        try:
            explicit_user_id = data.get('userId') or data.get('user_id') or customer.get('userId') or customer.get('user_id')
            user = get_or_create_user(customer, explicit_user_id=explicit_user_id)
            assigned_user_id = user['id']

            order_record = {
                'order_id': order_id,
                'user_id': assigned_user_id,
                'customer': {
                    'user_id': assigned_user_id,
                    'name': customer.get('name', 'Valued Customer'),
                    'email': customer.get('email', ''),
                    'phone': customer.get('phone', ''),
                    'address': f"{customer.get('address', '')}, {customer.get('city', '')} - {customer.get('pin', '')}".strip(', -'),
                    'city': customer.get('city', ''),
                    'state': 'Tamil Nadu'
                },
                'items': items,
                'subtotal': subtotal,
                'shipping': shipping,
                'total': total,
                'payment_method': data.get('paymentMethod', 'Cash on Delivery (COD)'),
                'payment_status': 'Pending' if 'cod' in str(data.get('paymentMethod', '')).lower() or not data.get('paymentMethod') else 'Paid',
                'order_status': 'Processing',
                'created_at': datetime.now().isoformat() + 'Z'
            }
            current_orders = load_orders_from_json()
            if not any(o.get('order_id') == order_id for o in current_orders):
                current_orders.insert(0, order_record)
                save_orders_to_json(current_orders)
                print(f"📦 Order {order_id} (User: {assigned_user_id}) automatically saved to orders.json!")
        except Exception as save_err:
            print(f"Warning: Could not auto-save order to orders.json: {save_err}")

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

/**
 * ============================================================================
 * SECURE AUTHENTICATION & SHA-256 JSON DATA STORE + ADMIN SALES & ORDERS
 * ============================================================================
 */

(function () {
    'use strict';

    // Permanent Admin and Seed User Database
    const DEFAULT_USERS = [
        {
            id: "admin_001",
            name: "Priya",
            email: "priya4029657@gmail.com",
            phone: "917708520530",
            password_hash: "d2d7ee432cadd28b49fd341b5048e3a01ada43cfa8bb765eef146750efd19e0b", // "priya2004"
            hash_algorithm: "SHA-256",
            role: "admin",
            created_at: "2026-09-30T00:00:00Z",
            last_login: "2026-09-30T13:45:00Z",
            remember_me: true
        },
        {
            id: "usr_001",
            name: "Demo User",
            email: "demo@example.com",
            phone: "+91 98765 43210",
            password_hash: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f", // "password123"
            hash_algorithm: "SHA-256",
            role: "customer",
            created_at: "2026-09-30T12:00:00Z",
            last_login: "2026-09-30T12:30:00Z",
            remember_me: true
        },
        {
            id: "usr_siva_001",
            name: "Siva Prakash",
            email: "sivaprakash2004@zohomail.in",
            phone: "9344709406",
            role: "customer",
            created_at: "2026-09-30T10:50:56.408Z",
            last_login: "2026-09-30T14:10:45.781Z"
        },
        {
            id: "usr_ananya_001",
            name: "Ananya Sharma",
            email: "ananya.sharma@gmail.com",
            phone: "+91 98410 23456",
            role: "customer",
            created_at: "2026-09-28T10:15:30Z",
            last_login: "2026-09-28T10:15:30Z"
        },
        {
            id: "usr_rajesh_001",
            name: "Rajesh Kumar",
            email: "rajesh.kumar92@yahoo.com",
            phone: "+91 94432 78901",
            role: "customer",
            created_at: "2026-09-29T14:22:10Z",
            last_login: "2026-09-29T14:22:10Z"
        },
        {
            id: "usr_meera_001",
            name: "Meera Venkat",
            email: "meera.v@outlook.com",
            phone: "+91 97890 12345",
            role: "customer",
            created_at: "2026-09-30T09:40:00Z",
            last_login: "2026-09-30T09:40:00Z"
        },
        {
            id: "usr_suresh_001",
            name: "Suresh Raina",
            email: "suresh.r@gmail.com",
            phone: "+91 91234 56789",
            role: "customer",
            created_at: "2026-09-30T11:18:45Z",
            last_login: "2026-09-30T11:18:45Z"
        },
        {
            id: "usr_deepa_001",
            name: "Deepa Krishnan",
            email: "deepa.krishnan@gmail.com",
            phone: "9876543210",
            role: "customer",
            created_at: "2026-09-27T08:30:00Z",
            last_login: "2026-09-27T08:30:00Z"
        }
    ];

    // Seed Orders Database
    const DEFAULT_ORDERS = [
        {
            order_id: "ORD-2026-8801",
            user_id: "usr_ananya_001",
            customer: {
                user_id: "usr_ananya_001",
                name: "Ananya Sharma",
                email: "ananya.sharma@gmail.com",
                phone: "+91 98410 23456",
                address: "42, Gandhi Road, T. Nagar, Chennai - 600017",
                city: "Chennai",
                state: "Tamil Nadu"
            },
            items: [
                {
                    id: 13,
                    name: "Kanchipuram Pure Silk Bridal Saree",
                    category: "saree",
                    size: "Free Size",
                    qty: 1,
                    price: 6499,
                    image: "images/saree_1.png"
                },
                {
                    id: 17,
                    name: "Apex Pro Luxury Smartwatch",
                    category: "accessories",
                    size: "One Size",
                    qty: 1,
                    price: 4499,
                    image: "images/watch.png"
                }
            ],
            subtotal: 10998,
            shipping: 0,
            total: 10998,
            payment_method: "UPI / GPay",
            payment_status: "Paid",
            order_status: "Delivered",
            created_at: "2026-09-28T10:15:30Z"
        },
        {
            order_id: "ORD-2026-8802",
            customer: {
                name: "Rajesh Kumar",
                email: "rajesh.kumar92@yahoo.com",
                phone: "+91 94432 78901",
                address: "15, Cross Cut Road, Gandhipuram, Coimbatore - 641012",
                city: "Coimbatore",
                state: "Tamil Nadu"
            },
            items: [
                {
                    id: 16,
                    name: "Golden Temple Kanchi Pattu Saree",
                    category: "saree",
                    size: "Free Size",
                    qty: 1,
                    price: 7999,
                    image: "images/saree_4.png"
                }
            ],
            subtotal: 7999,
            shipping: 0,
            total: 7999,
            payment_method: "Credit Card",
            payment_status: "Paid",
            order_status: "Shipped",
            created_at: "2026-09-29T14:22:10Z"
        },
        {
            order_id: "ORD-2026-8803",
            customer: {
                name: "Meera Venkat",
                email: "meera.v@outlook.com",
                phone: "+91 97890 12345",
                address: "88, West Masi Street, Madurai - 625001",
                city: "Madurai",
                state: "Tamil Nadu"
            },
            items: [
                {
                    id: 14,
                    name: "Madurai Sungudi Peacock Blue Saree",
                    category: "saree",
                    size: "Free Size",
                    qty: 2,
                    price: 2499,
                    image: "images/saree_2.png"
                },
                {
                    id: 12,
                    name: "Classic Navy Stripe Tee",
                    category: "tshirt",
                    size: "L",
                    qty: 1,
                    price: 749,
                    image: "images/tshirt_4.png"
                }
            ],
            subtotal: 5747,
            shipping: 0,
            total: 5747,
            payment_method: "Cash on Delivery",
            payment_status: "Pending",
            order_status: "Processing",
            created_at: "2026-09-30T09:40:00Z"
        },
        {
            order_id: "ORD-2026-8804",
            customer: {
                name: "Suresh Raina",
                email: "suresh.r@gmail.com",
                phone: "+91 91234 56789",
                address: "12, 100 Feet Road, Indiranagar, Bengaluru - 560038",
                city: "Bengaluru",
                state: "Karnataka"
            },
            items: [
                {
                    id: 15,
                    name: "Chettinad Heritage Cotton Saree",
                    category: "saree",
                    size: "Free Size",
                    qty: 1,
                    price: 1999,
                    image: "images/saree_3.png"
                }
            ],
            subtotal: 1999,
            shipping: 99,
            total: 2098,
            payment_method: "UPI / PhonePe",
            payment_status: "Paid",
            order_status: "Processing",
            created_at: "2026-09-30T11:18:45Z"
        }
    ];

    const STORAGE_KEY = 'users_json_db';
    const ORDERS_KEY = 'orders_json_db';
    const SESSION_KEY = 'current_logged_in_user';
    const REMEMBER_KEY = 'remembered_user_email';

    // State - Pre-populated with defaults for 100% offline & file:// resilience
    let isRegisterMode = false;
    let showLiveHash = false;
    let usersDatabase = JSON.parse(JSON.stringify(DEFAULT_USERS));
    let ordersDatabase = JSON.parse(JSON.stringify(DEFAULT_ORDERS));
    let currentFilter = 'all';
    let searchQuery = '';
    let ordersSyncTimer = null;

    // DOM Elements
    const mainWrapper = document.getElementById('mainWrapper');
    const glassCard = document.getElementById('glassCard');
    const authForm = document.getElementById('authForm');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const passwordToggleBtn = document.getElementById('passwordToggleBtn');
    const lockIcon = document.getElementById('lockIcon');
    const rememberMeCheckbox = document.getElementById('rememberMeCheckbox');
    const rememberMeContainer = document.getElementById('rememberMeContainer');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const switchPrompt = document.getElementById('switchPrompt');
    const switchModeLink = document.getElementById('switchModeLink');
    const cardAlert = document.getElementById('cardAlert');

    // Live Hash Elements
    const hashPreviewBox = document.getElementById('hashPreviewBox');
    const liveHashText = document.getElementById('liveHashText');
    const hashStatus = document.getElementById('hashStatus');

    // Customer Logged In Elements
    const loggedInView = document.getElementById('loggedInView');
    const userGreeting = document.getElementById('userGreeting');
    const sessionHashDisplay = document.getElementById('sessionHashDisplay');
    const userRoleBadge = document.getElementById('userRoleBadge');
    const customerLogoutBtn = document.getElementById('customerLogoutBtn');

    // Logout Confirmation Modal Elements
    const logoutConfirmModal = document.getElementById('logoutConfirmModal');
    const logoutModalMessage = document.getElementById('logoutModalMessage');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

    // Admin Dashboard Elements
    const adminDashboard = document.getElementById('adminDashboard');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const exportOrdersBtn = document.getElementById('exportOrdersBtn');
    const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');
    const refreshOrdersIcon = document.getElementById('refreshOrdersIcon');
    const kpiRevenue = document.getElementById('kpiRevenue');
    const kpiOrders = document.getElementById('kpiOrders');
    const kpiItemsSold = document.getElementById('kpiItemsSold');
    const kpiAov = document.getElementById('kpiAov');
    const kpiPendingCount = document.getElementById('kpiPendingCount');
    const orderCounterBadge = document.getElementById('orderCounterBadge');
    const orderSearchInput = document.getElementById('orderSearchInput');
    const statusFilterPills = document.getElementById('statusFilterPills');
    const ordersListContainer = document.getElementById('ordersListContainer');

    // ==========================================
    // 1. SHA-256 CRYPTOGRAPHIC HASH FUNCTION
    // ==========================================
    async function computeSHA256(message) {
        if (!message) return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
        
        try {
            if (window.crypto && crypto.subtle && crypto.subtle.digest) {
                const msgBuffer = new TextEncoder().encode(message);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            }
        } catch (err) {
            console.warn('Web Crypto SHA-256 fallback triggered:', err);
        }

        return jsSHA256Fallback(message);
    }

    function jsSHA256Fallback(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }
        
        const mathPow = Math.pow;
        const maxWord = mathPow(2, 32);
        let result = '';

        const words = [];
        const asciiBitLength = ascii.length * 8;
        
        const hash = [];
        const k = [];
        let primeCounter = 0;

        const isPrime = {};
        for (let candidate = 2; primeCounter < 64; candidate++) {
            if (!isPrime[candidate]) {
                for (let i = 0; i < 313; i += candidate) {
                    isPrime[i] = true;
                }
                hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
                k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            }
        }
        
        ascii += '\x80';
        while (ascii.length % 64 - 56) ascii += '\x00';
        for (let i = 0; i < ascii.length; i++) {
            const j = ascii.charCodeAt(i);
            words[i >> 2] |= j << ((3 - i % 4) * 8);
        }
        words[words.length] = ((asciiBitLength / maxWord) | 0);
        words[words.length] = (asciiBitLength | 0);
        
        for (let j = 0; j < words.length;) {
            const w = words.slice(j, j += 16);
            const oldHash = hash.slice(0);
            
            for (let i = 0; i < 64; i++) {
                const w15 = w[i - 15], w2 = w[i - 2];
                const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
                const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
                w[i] = i < 16 ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0;
                
                const s1_ = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
                const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
                const temp1 = (hash[7] + s1_ + ch + k[i] + w[i]) | 0;
                const s0_ = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
                const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
                const temp2 = (s0_ + maj) | 0;
                
                hash[7] = hash[6];
                hash[6] = hash[5];
                hash[5] = hash[4];
                hash[4] = (hash[3] + temp1) | 0;
                hash[3] = hash[2];
                hash[2] = hash[1];
                hash[1] = hash[0];
                hash[0] = (temp1 + temp2) | 0;
            }
            
            for (let i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i]) | 0;
            }
        }
        
        for (let i = 0; i < 8; i++) {
            for (let j = 3; j >= 0; j--) {
                const b = (hash[i] >> (8 * j)) & 255;
                result += ((b < 16) ? '0' : '') + b.toString(16);
            }
        }
        return result;
    }

    // ==========================================
    // 2. DATABASE STORAGE ENGINES (USERS & ORDERS)
    // ==========================================
    async function initDatabase() {
        // Users DB
        try {
            const localUsers = localStorage.getItem(STORAGE_KEY);
            if (localUsers) {
                try {
                    usersDatabase = JSON.parse(localUsers);
                } catch (e) {
                    usersDatabase = DEFAULT_USERS;
                }
            } else {
                usersDatabase = DEFAULT_USERS;
            }

            // Always fetch latest users.json / API to merge newly stored user IDs
            try {
                const response = await fetch('users.json?_=' + Date.now());
                if (response.ok) {
                    const serverUsers = await response.json();
                    if (Array.isArray(serverUsers)) {
                        serverUsers.forEach(su => {
                            const idx = usersDatabase.findIndex(u => u.id === su.id || (u.email && su.email && u.email.toLowerCase() === su.email.toLowerCase()));
                            if (idx >= 0) {
                                usersDatabase[idx] = { ...usersDatabase[idx], ...su };
                            } else {
                                usersDatabase.push(su);
                            }
                        });
                    }
                }
            } catch (e) {}

            ensurePermanentAdmin();
            saveUsersDatabase();
        } catch (err) {
            console.error('Failed to load users DB:', err);
            usersDatabase = DEFAULT_USERS;
        }

        // Orders DB
        try {
            const localOrders = localStorage.getItem(ORDERS_KEY);
            if (localOrders) {
                try {
                    ordersDatabase = JSON.parse(localOrders);
                } catch (e) {
                    ordersDatabase = DEFAULT_ORDERS;
                }
            } else {
                ordersDatabase = DEFAULT_ORDERS;
            }

            try {
                const resOrders = await fetch('orders.json?_=' + Date.now());
                if (resOrders.ok) {
                    const jsonOrders = await resOrders.json();
                    if (Array.isArray(jsonOrders) && jsonOrders.length > 0) {
                        const ordMap = new Map();
                        ordersDatabase.forEach(o => { const id = o.order_id || o.orderId || o.id; if (id) ordMap.set(id, o); });
                        jsonOrders.forEach(o => { const id = o.order_id || o.orderId || o.id; if (id) ordMap.set(id, o); });
                        ordersDatabase = Array.from(ordMap.values());
                    }
                }
            } catch (e) {}

            saveOrdersDatabase();
        } catch (err) {
            console.error('Failed to load orders DB:', err);
            ordersDatabase = DEFAULT_ORDERS;
        }

        updateUserCount();
        checkRememberedUser();
        checkSession();
    }

    function ensurePermanentAdmin() {
        const adminEmail = "priya4029657@gmail.com";
        const adminHash = "d2d7ee432cadd28b49fd341b5048e3a01ada43cfa8bb765eef146750efd19e0b"; // "priya2004"
        const existingAdmin = usersDatabase.find(u => u.email.toLowerCase() === adminEmail);
        
        if (!existingAdmin) {
            usersDatabase.unshift({
                id: "admin_001",
                name: "Priya",
                email: adminEmail,
                password_hash: adminHash,
                hash_algorithm: "SHA-256",
                role: "admin",
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
                remember_me: true
            });
        } else {
            // Guarantee admin password hash and role
            existingAdmin.role = "admin";
            existingAdmin.password_hash = adminHash;
        }
    }

    async function saveUsersDatabase() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(usersDatabase, null, 2));
            updateUserCount();

            // Background sync with Flask
            fetch('/api/sync-users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usersDatabase)
            }).catch(() => {});
        } catch (err) {
            console.error('Error saving users DB:', err);
        }
    }

    function saveOrdersDatabase() {
        try {
            localStorage.setItem(ORDERS_KEY, JSON.stringify(ordersDatabase, null, 2));

            // Background sync with Flask server
            fetch('/api/sync-orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ordersDatabase)
            }).catch(() => {});
        } catch (err) {
            console.error('Error saving orders DB:', err);
        }
    }

    async function syncOrders(showSpinner = false) {
        if (showSpinner && refreshOrdersIcon) {
            refreshOrdersIcon.classList.add('fa-spin');
        }

        try {
            let latestOrders = [];

            // 1. Fetch from server first
            try {
                const res = await fetch('/api/orders?_=' + Date.now());
                if (res.ok) {
                    const serverOrders = await res.json();
                    if (Array.isArray(serverOrders) && serverOrders.length > 0) {
                        latestOrders = serverOrders;
                    }
                }
            } catch (err) {
                // Flask not reachable or static host fallback
            }

            // Fallback to orders.json if empty
            if (latestOrders.length === 0) {
                try {
                    const resJson = await fetch('orders.json?_=' + Date.now());
                    if (resJson.ok) {
                        const jsonOrders = await resJson.json();
                        if (Array.isArray(jsonOrders) && jsonOrders.length > 0) {
                            latestOrders = jsonOrders;
                        }
                    }
                } catch (e) {}
            }

            // Also check localStorage
            let localOrders = [];
            try {
                const localStr = localStorage.getItem(ORDERS_KEY);
                if (localStr) {
                    localOrders = JSON.parse(localStr);
                }
            } catch (e) {}

            // Merge server and local orders, deduplicating by order_id
            const orderMap = new Map();
            // Start with local
            (localOrders || []).forEach(o => {
                const id = o.order_id || o.orderId || o.id;
                if (id) orderMap.set(id, o);
            });
            // Overwrite/enrich with server orders
            (latestOrders || []).forEach(o => {
                const id = o.order_id || o.orderId || o.id;
                if (id) orderMap.set(id, o);
            });

            if (orderMap.size > 0) {
                ordersDatabase = Array.from(orderMap.values());
                localStorage.setItem(ORDERS_KEY, JSON.stringify(ordersDatabase, null, 2));
            }

            calculateSalesReport();
            renderOrderItems();
        } catch (err) {
            console.warn('Orders sync error:', err);
        } finally {
            if (showSpinner && refreshOrdersIcon) {
                setTimeout(() => {
                    refreshOrdersIcon.classList.remove('fa-spin');
                }, 400);
            }
        }
    }

    function updateUserCount() {
        if (userCountBadge) {
            userCountBadge.textContent = usersDatabase.length;
        }
    }

    // ==========================================
    // 3. UI STATE & INTERACTION HANDLERS
    // ==========================================
    function showAlert(message, type = 'error') {
        cardAlert.className = `card-alert show alert-${type}`;
        const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' :
                     type === 'info' ? '<i class="fa-solid fa-circle-info"></i>' :
                     '<i class="fa-solid fa-circle-exclamation"></i>';
        cardAlert.innerHTML = `${icon} <span>${message}</span>`;
    }

    function hideAlert() {
        cardAlert.className = 'card-alert';
        cardAlert.innerHTML = '';
    }

    function setMode(register) {
        isRegisterMode = register;
        hideAlert();

        if (isRegisterMode) {
            formTitle.textContent = 'Register';
            formSubtitle.textContent = 'Create a secure SHA-256 account';
            btnText.textContent = 'Create Account';
            switchPrompt.textContent = 'Already have an account?';
            switchModeLink.textContent = 'Login';
            rememberMeContainer.style.display = 'none';
            if (adminFillBtn) adminFillBtn.style.display = 'none';
        } else {
            formTitle.textContent = 'Login';
            formSubtitle.textContent = 'Sign in to your account';
            btnText.textContent = 'Login';
            switchPrompt.textContent = "Don't have an account?";
            switchModeLink.textContent = 'Register';
            rememberMeContainer.style.display = 'flex';
        }
    }

    // Toggle Password Visibility
    passwordToggleBtn.addEventListener('click', function () {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        if (isPassword) {
            lockIcon.className = 'fa-solid fa-lock-open';
            lockIcon.style.color = '#c4b5fd';
        } else {
            lockIcon.className = 'fa-solid fa-lock';
            lockIcon.style.color = '';
        }
    });

    // Real-time SHA-256 live preview
    passwordInput.addEventListener('input', async function () {
        const val = passwordInput.value;
        const hash = await computeSHA256(val);
        liveHashText.textContent = hash;
        
        if (val.length > 0) {
            hashStatus.textContent = `${hash.length * 4}-bit (${hash.substring(0, 10)}...)`;
            hashStatus.style.color = '#a7f3d0';
        } else {
            hashStatus.textContent = 'Awaiting input';
            hashStatus.style.color = '#93c5fd';
        }
    });

    switchModeLink.addEventListener('click', function () {
        setMode(!isRegisterMode);
    });

    forgotPasswordLink.addEventListener('click', async function () {
        const inputVal = (emailInput.value || '').trim().toLowerCase();
        if (!inputVal) {
            showAlert('Enter your User ID or Email address above to reset password.', 'info');
            emailInput.focus();
            return;
        }

        const user = usersDatabase.find(u => 
            (u.id && u.id.toLowerCase() === inputVal) || 
            (u.email && u.email.toLowerCase() === inputVal)
        );
        if (!user) {
            showAlert(`No account found in users.json with ID/email: ${inputVal}`, 'error');
            return;
        }

        const newPass = prompt(`Reset Password for ${user.name} (${user.id}):\nEnter your new password (will be SHA-256 hashed):`, 'newpass123');
        if (newPass) {
            const newHash = await computeSHA256(newPass);
            user.password_hash = newHash;
            user.last_password_change = new Date().toISOString();
            await saveUsersDatabase();
            showAlert(`Password reset! New SHA-256 hash saved to users.json.`, 'success');
        }
    });

    // ==========================================
    // 4. FORM SUBMISSION (STRICT USERS.JSON VERIFICATION)
    // ==========================================
    authForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        hideAlert();

        const rawInput = (emailInput.value || '').trim();
        const inputVal = rawInput.toLowerCase();
        const password = (passwordInput.value || '').trim();

        if (!rawInput) {
            showAlert('Please enter your User ID or Email address.');
            emailInput.classList.add('input-error');
            emailInput.focus();
            return;
        }
        emailInput.classList.remove('input-error');

        if (!password || password.length < 3) {
            showAlert('Password must be at least 3 characters long.');
            passwordInput.classList.add('input-error');
            passwordInput.focus();
            return;
        }
        passwordInput.classList.remove('input-error');

        // Look up user in users.json (by user ID or by email)
        const user = usersDatabase.find(u => 
            (u.id && u.id.toLowerCase() === inputVal) || 
            (u.email && u.email.toLowerCase() === inputVal)
        );

        // Detect Admin
        const isAdmin = (
            inputVal === 'priya4029657@gmail.com' ||
            inputVal === 'priya4029657' ||
            inputVal === 'admin_001' ||
            inputVal === 'admin' ||
            inputVal === 'admin@gmail.com' ||
            (user && user.role === 'admin')
        );

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const passwordHash = await computeSHA256(password);

            // 1. ADMIN LOGIN FLOW
            if (isAdmin) {
                const adminHash = "d2d7ee432cadd28b49fd341b5048e3a01ada43cfa8bb765eef146750efd19e0b"; // "priya2004"
                
                if (password === 'priya2004' || passwordHash === adminHash) {
                    const adminUser = user || {
                        id: "admin_001",
                        name: "Priya",
                        email: "priya4029657@gmail.com",
                        password_hash: adminHash,
                        hash_algorithm: "SHA-256",
                        role: "admin",
                        last_login: new Date().toISOString()
                    };
                    sessionStorage.setItem(SESSION_KEY, JSON.stringify(adminUser));
                    if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                        localStorage.setItem(REMEMBER_KEY, 'priya4029657@gmail.com');
                    }
                    renderAdminDashboard();
                    return;
                } else {
                    showAlert('Incorrect password for Admin. (Password: priya2004)');
                    passwordInput.classList.add('input-error');
                    passwordInput.focus();
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    return;
                }
            }

            // 2. REGISTER MODE
            if (isRegisterMode) {
                if (user) {
                    showAlert(`Account already exists in users.json with ID/Email: "${rawInput}". Please login.`, 'error');
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    return;
                }

                const rawName = (nameInput?.value || '').trim();
                const newUserId = `usr_${Date.now().toString(36)}`;
                const newUser = {
                    id: newUserId,
                    name: rawName || (rawInput.includes('@') ? rawInput.split('@')[0] : rawInput),
                    email: rawInput.includes('@') ? inputVal : `${newUserId}@store.local`,
                    password_hash: passwordHash,
                    hash_algorithm: "SHA-256",
                    role: "customer",
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                    remember_me: rememberMeCheckbox ? rememberMeCheckbox.checked : true
                };

                usersDatabase.push(newUser);
                await saveUsersDatabase();

                sessionStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
                showAlert(`Account created with User ID: ${newUserId}! Entering store...`, 'success');
                setTimeout(() => { window.location.href = 'index.html'; }, 600);
                return;
            }

            // 3. STRICT LOGIN MODE — ONLY ALLOW IF USER IS IN USERS.JSON!
            if (!user) {
                // NOT in users.json -> DENY LOGIN!
                showAlert(`Access Denied: "${rawInput}" is not found in users.json. Only users stored in users.json can log in.`, 'error');
                emailInput.classList.add('input-error');
                emailInput.focus();
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                return;
            }

            // Verify password if user has a password_hash set
            if (user.password_hash) {
                if (user.password_hash !== passwordHash) {
                    showAlert(`Incorrect password for ${user.id} (${user.name}).`, 'error');
                    passwordInput.classList.add('input-error');
                    passwordInput.focus();
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    return;
                }
            } else {
                // First-time customer login: save their password hash
                user.password_hash = passwordHash;
                user.hash_algorithm = 'SHA-256';
            }

            // User is verified in users.json!
            user.last_login = new Date().toISOString();
            if (rememberMeCheckbox) user.remember_me = rememberMeCheckbox.checked;

            await saveUsersDatabase();

            if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                localStorage.setItem(REMEMBER_KEY, rawInput);
            } else {
                localStorage.removeItem(REMEMBER_KEY);
            }

            sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));

            showAlert(`Login verified! Welcome, ${user.name} (${user.id}). Entering store...`, 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);

        } catch (err) {
            console.error('Authentication error:', err);
            showAlert('Login error. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // ==========================================
    // 5. LOGIN SUCCESS ROUTER (ADMIN VS CUSTOMER)
    // ==========================================
    function handleLoginSuccess(user, hash) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));

        if (user.role === 'admin' || (user.email && user.email.toLowerCase() === 'priya4029657@gmail.com')) {
            renderAdminDashboard();
        } else {
            window.location.href = 'index.html';
        }
    }

    function renderAdminDashboard() {
        try {
            console.log('Opening Admin Dashboard...');
            if (glassCard) glassCard.style.display = 'none';
            if (loggedInView) loggedInView.classList.add('hidden');
            if (mainWrapper) mainWrapper.classList.add('admin-active');
            if (adminDashboard) {
                adminDashboard.classList.remove('hidden');
                adminDashboard.style.display = 'flex';
            }

            // Ensure ordersDatabase is populated
            if (!ordersDatabase || !Array.isArray(ordersDatabase) || ordersDatabase.length === 0) {
                ordersDatabase = JSON.parse(JSON.stringify(DEFAULT_ORDERS));
            }

            // Calculate and display live Sales Report
            calculateSalesReport();
            // Render customer order items
            renderOrderItems();
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Immediately sync latest live orders from backend / localStorage
            syncOrders(false);

            // Establish real-time auto-polling every 4 seconds
            if (!ordersSyncTimer) {
                ordersSyncTimer = setInterval(() => {
                    syncOrders(false);
                }, 4000);
            }
        } catch (err) {
            console.error('Error rendering admin dashboard:', err);
            if (adminDashboard) {
                adminDashboard.classList.remove('hidden');
                adminDashboard.style.display = 'flex';
            }
        }
    }

    function renderCustomerPortal(user, hash) {
        window.location.href = 'index.html';
    }

    function checkSession() {
        try {
            const session = sessionStorage.getItem(SESSION_KEY);
            if (session) {
                const user = JSON.parse(session);
                if (user.role === 'admin' || (user.email && user.email.toLowerCase() === 'priya4029657@gmail.com')) {
                    renderAdminDashboard();
                }
            }
        } catch (e) {
            console.warn('Session check warning:', e);
        }
    }

    function checkRememberedUser() {
        const remembered = localStorage.getItem(REMEMBER_KEY);
        if (remembered && emailInput) {
            emailInput.value = remembered;
            rememberMeCheckbox.checked = true;
            const existing = usersDatabase.find(u => u.email.toLowerCase() === remembered.toLowerCase());
            if (existing && existing.name && nameInput) {
                nameInput.value = existing.name;
            }
        }
    }

    // Auto-populate Name if existing user email is entered
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            const typed = this.value.trim().toLowerCase();
            const existing = usersDatabase.find(u => u.email.toLowerCase() === typed);
            if (existing && existing.name && nameInput && !nameInput.value) {
                nameInput.value = existing.name;
            }
        });
    }

    // Logout Modal Handlers
    function askLogout() {
        let userName = 'Customer';
        try {
            const session = sessionStorage.getItem(SESSION_KEY);
            if (session) {
                const u = JSON.parse(session);
                if (u.name) userName = u.name;
            }
        } catch (e) {}

        if (logoutModalMessage) {
            logoutModalMessage.textContent = `Are you sure you want to log out from your account, ${userName}?`;
        }
        if (logoutConfirmModal) {
            logoutConfirmModal.classList.remove('hidden');
        }
    }

    function closeLogoutModal() {
        if (logoutConfirmModal) {
            logoutConfirmModal.classList.add('hidden');
        }
    }

    function handleLogout() {
        closeLogoutModal();
        if (ordersSyncTimer) {
            clearInterval(ordersSyncTimer);
            ordersSyncTimer = null;
        }
        sessionStorage.removeItem(SESSION_KEY);
        adminDashboard.classList.add('hidden');
        loggedInView.classList.add('hidden');
        mainWrapper.classList.remove('admin-active');
        glassCard.style.display = 'block';
        authForm.style.display = 'flex';
        passwordInput.value = '';
        setMode(false);
        showAlert('Logged out successfully.', 'info');
    }

    if (customerLogoutBtn) customerLogoutBtn.addEventListener('click', askLogout);
    if (adminLogoutBtn) adminLogoutBtn.addEventListener('click', askLogout);
    if (cancelLogoutBtn) cancelLogoutBtn.addEventListener('click', closeLogoutModal);
    if (confirmLogoutBtn) confirmLogoutBtn.addEventListener('click', handleLogout);
    if (logoutConfirmModal) {
        logoutConfirmModal.addEventListener('click', function (e) {
            if (e.target === logoutConfirmModal) closeLogoutModal();
        });
    }

    // ==========================================
    // 6. ADMIN SALES REPORT & ORDER ITEMS LOGIC
    // ==========================================
    function calculateSalesReport() {
        const totalRevenue = ordersDatabase.reduce((sum, ord) => sum + (Number(ord.total) || 0), 0);
        const totalOrdersCount = ordersDatabase.length;
        
        let totalItemsCount = 0;
        ordersDatabase.forEach(ord => {
            if (Array.isArray(ord.items)) {
                ord.items.forEach(item => {
                    totalItemsCount += (Number(item.qty) || 1);
                });
            }
        });

        const aov = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
        const processingOrders = ordersDatabase.filter(o => {
            const st = (o.order_status || o.status || 'Processing').toLowerCase();
            return st === 'processing' || st === 'confirmed' || st === 'pending';
        }).length;

        if (kpiRevenue) kpiRevenue.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
        if (kpiOrders) kpiOrders.textContent = totalOrdersCount;
        if (kpiItemsSold) kpiItemsSold.textContent = `${totalItemsCount} pcs`;
        if (kpiAov) kpiAov.textContent = `₹${aov.toLocaleString('en-IN')}`;
        if (kpiPendingCount) kpiPendingCount.textContent = `${processingOrders} Pending / Processing`;
        if (orderCounterBadge) orderCounterBadge.textContent = `${totalOrdersCount} Total Orders`;
    }

    function renderOrderItems() {
        if (!ordersListContainer) return;

        let filtered = [...ordersDatabase];

        // Apply Status Filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(o => {
                const st = (o.order_status || o.status || 'Processing').toLowerCase();
                return st === currentFilter.toLowerCase();
            });
        }

        // Apply Search Filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(o => {
                const name = (o.customer?.name || '').toLowerCase();
                const email = (o.customer?.email || '').toLowerCase();
                const id = (o.order_id || o.orderId || '').toLowerCase();
                const city = (o.customer?.city || '').toLowerCase();
                return name.includes(q) || email.includes(q) || id.includes(q) || city.includes(q);
            });
        }

        if (filtered.length === 0) {
            ordersListContainer.innerHTML = `
                <div class="empty-orders-view">
                    <i class="fa-solid fa-box-open" style="font-size: 2.5rem; color: #a78bfa; margin-bottom: 10px;"></i>
                    <p>No customer orders match your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        ordersListContainer.innerHTML = filtered.map(order => {
            const orderId = order.order_id || order.orderId || 'ORD-0000';
            const orderStatus = order.order_status || order.status || 'Processing';
            const statusClass = orderStatus === 'Delivered' ? 'status-delivered' :
                                orderStatus === 'Shipped' ? 'status-shipped' : 'status-processing';
            
            const itemsHtml = (order.items || []).map(item => `
                <div class="order-item-row">
                    <div class="item-left">
                        <img src="${item.image || 'images/saree_1.png'}" alt="${item.name}" class="item-thumb" onerror="this.src='images/saree_1.png'">
                        <div class="item-details">
                            <span class="item-name">${item.name}</span>
                            <span class="item-meta">Size: <strong>${item.size || 'Free Size'}</strong> &bull; Qty: <strong>${item.qty || 1}</strong> &bull; Unit: ₹${(Number(item.price) || 0).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <div class="item-price-calc">₹${((Number(item.price) || 0) * (Number(item.qty) || 1)).toLocaleString('en-IN')}</div>
                </div>
            `).join('');

            const dateStr = order.created_at || order.date ? (order.created_at ? new Date(order.created_at).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }) : order.date) : 'Recent';

            return `
                <div class="order-card" data-order-id="${orderId}">
                    <div class="order-card-header">
                        <div class="order-main-info">
                            <div class="order-id-badge">
                                <i class="fa-solid fa-receipt"></i> ${orderId}
                            </div>
                            <span class="order-timestamp"><i class="fa-regular fa-clock"></i> Placed on ${dateStr}</span>
                        </div>
                        <div class="order-status-control">
                            <span class="status-badge ${statusClass}">
                                <i class="fa-solid fa-circle-dot"></i> ${orderStatus}
                            </span>
                            <select class="status-select" data-id="${orderId}" title="Update status">
                                <option value="Processing" ${orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
                                <option value="Shipped" ${orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                <option value="Delivered" ${orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            </select>
                        </div>
                    </div>

                    <div class="order-customer-bar">
                        <div class="cust-item" title="Customer User ID in users.json">
                            <i class="fa-solid fa-id-card-clip" style="color:#38bdf8;"></i>
                            <span>User ID: <strong style="color:#38bdf8; font-family:'Space Mono', monospace; font-size:12px; background:rgba(56,189,248,0.12); padding:2px 7px; border-radius:4px;">${order.user_id || order.customer?.user_id || 'usr_guest'}</strong></span>
                        </div>
                        <div class="cust-item">
                            <i class="fa-solid fa-user"></i>
                            <span>Customer: <strong>${order.customer?.name || 'Valued Client'}</strong></span>
                        </div>
                        <div class="cust-item">
                            <i class="fa-solid fa-envelope"></i>
                            <span>${order.customer?.email || 'N/A'}</span>
                        </div>
                        <div class="cust-item">
                            <i class="fa-solid fa-phone"></i>
                            <span>${order.customer?.phone || 'N/A'}</span>
                        </div>
                        <div class="cust-item">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>${order.customer?.address || 'Tamil Nadu, India'}</span>
                        </div>
                    </div>

                    <div class="order-items-grid">
                        ${itemsHtml}
                    </div>

                    <div class="order-card-footer">
                        <div class="order-pay-info">
                            <span><i class="fa-solid fa-credit-card"></i> Payment: <strong>${order.payment_method || order.paymentMethod || 'Cash on Delivery (COD)'}</strong> (${order.payment_status || order.paymentStatus || 'Pending'})</span>
                        </div>
                        <div class="order-total-display">
                            <span>Total Amount:</span>
                            <span>₹${(Number(order.total) || 0).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach Status Change Event Listeners
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function () {
                const orderId = this.dataset.id;
                const newStatus = this.value;
                const targetOrder = ordersDatabase.find(o => (o.order_id === orderId || o.orderId === orderId));
                if (targetOrder) {
                    targetOrder.order_status = newStatus;
                    targetOrder.orderStatus = newStatus;
                    saveOrdersDatabase();
                    calculateSalesReport();
                    renderOrderItems();
                }
            });
        });
    }

    // Search and Filter Listeners
    if (orderSearchInput) {
        orderSearchInput.addEventListener('input', function () {
            searchQuery = this.value.trim();
            renderOrderItems();
        });
    }

    if (statusFilterPills) {
        statusFilterPills.addEventListener('click', function (e) {
            const pill = e.target.closest('.filter-pill');
            if (!pill) return;

            statusFilterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.dataset.filter;
            renderOrderItems();
        });
    }

    // Export Orders JSON
    if (exportOrdersBtn) {
        exportOrdersBtn.addEventListener('click', function () {
            const jsonStr = JSON.stringify(ordersDatabase, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'orders.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Export Users JSON
    const exportUsersBtn = document.getElementById('exportUsersBtn');
    if (exportUsersBtn) {
        exportUsersBtn.addEventListener('click', function () {
            const jsonStr = JSON.stringify(usersDatabase, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Refresh / Live Sync Orders Button
    if (refreshOrdersBtn) {
        refreshOrdersBtn.addEventListener('click', function () {
            syncOrders(true);
        });
    }

    // Initialize Database on Startup
    initDatabase();

})();

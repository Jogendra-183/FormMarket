# 🚀 Quick Start Guide - OTP System

## Start Backend & Frontend (2 Commands)

### Terminal 1: Backend
```bash
cd "D:\full stack\final project\backend"
.\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
```

Wait for: **"Started FarmMarketApplication"**

### Terminal 2: Frontend  
```bash
cd "D:\full stack\final project\Frontend"
npm run dev
```

Open: **http://localhost:5173**

---

## 🧪 Test OTP Login (3 Ways)

### Method 1: Standalone OTP Page (Recommended)
1. Navigate to: **http://localhost:5173/otp-login**
2. Enter email: `jogendrasai780@gmail.com`
3. Click "Send OTP"
4. Check Gmail inbox
5. Enter 6-digit OTP
6. Click "Verify & Login"
7. ✅ Logged in with JWT!

### Method 2: From Login Page
1. Go to: **http://localhost:5173/login**
2. Scroll down and click "Passwordless OTP Login →"
3. Follow steps from Method 1

### Method 3: Embedded OTP in Login
1. Go to: **http://localhost:5173/login**
2. Enter your email
3. Click "Use OTP Instead" button
4. Click "Send OTP"
5. Enter OTP received
6. Click "Sign In"

---

## ✅ What's Working

### Backend (Spring Boot)
- ✅ **Port:** 8080
- ✅ **Database:** MySQL (farmmarket_db)
- ✅ **SMTP:** Gmail (jogendrasai780@gmail.com)
- ✅ **Endpoints:**
  - `POST /api/auth/send-otp`
  - `POST /api/auth/verify-otp`
  - `POST /api/auth/resend-otp`

### Frontend (React + Vite)
- ✅ **Port:** 5173
- ✅ **Routes:**
  - `/otp-login` - Standalone OTP page
  - `/login` - Login with embedded OTP
  - `/register` - Registration

### Features
- ✅ 6-digit secure OTP
- ✅ 5-minute expiry
- ✅ 30-second resend cooldown
- ✅ 3 attempt limit
- ✅ Beautiful HTML email
- ✅ JWT authentication
- ✅ Toast notifications
- ✅ Real-time countdown timers
- ✅ Animated UI with Framer Motion

---

## 📧 Email Format

**Subject:** Your OTP for Login - FarmMarket

**From:** jogendrasai780@gmail.com

**Content:**
```
Hello [Name],

You requested to log in to your FarmMarket account.

Your OTP Code:
  1 2 3 4 5 6

⏱️ This OTP will expire in 5 minutes

🛡️ Security Tip: Never share your OTP with anyone.
```

---

## 🔑 Test Credentials

### Register New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "jogendrasai780@gmail.com",
    "password": "Test@123",
    "role": "BUYER"
  }'
```

### Use OTP Login
- **Email:** jogendrasai780@gmail.com
- **OTP:** (Check Gmail)

---

## 🐛 Troubleshooting

### Issue: Email not received
**Solution:**
1. Check spam folder
2. Verify backend logs: `tail -f backend/boot-run.log`
3. Confirm SMTP settings in `application.properties`

### Issue: OTP invalid
**Solution:**
1. Check if OTP expired (5 min)
2. Verify email address matches
3. Request new OTP

### Issue: Rate limit error
**Solution:**
Wait 30 seconds before requesting new OTP

### Issue: Max attempts exceeded
**Solution:**
Request a new OTP (old one is invalidated)

### Issue: Backend not starting
**Solution:**
1. Check if MySQL is running
2. Verify database credentials in `application.properties`
3. Check port 8080 is free: `netstat -ano | findstr :8080`

### Issue: Frontend not starting
**Solution:**
1. Run `npm install` first
2. Check port 5173 is free
3. Verify `.env` has correct API URL

---

## 📊 Database Check

```sql
-- Connect to MySQL
mysql -u root -p9493 farmmarket_db

-- Check OTP status
SELECT id, email, name, otp, otp_expiry, otp_attempts, last_otp_sent 
FROM users 
WHERE email = 'jogendrasai780@gmail.com';
```

---

## 🎯 API Testing with Curl

### Send OTP
```bash
curl -X POST http://localhost:8080/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"jogendrasai780@gmail.com"}'
```

### Verify OTP
```bash
curl -X POST http://localhost:8080/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"jogendrasai780@gmail.com","otp":"123456"}'
```

### Resend OTP
```bash
curl -X POST http://localhost:8080/api/auth/resend-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"jogendrasai780@gmail.com"}'
```

---

## 🎉 Success!

If you see this, your OTP system is **WORKING**:

1. ✅ Backend running on http://localhost:8080
2. ✅ Frontend running on http://localhost:5173
3. ✅ Email received with OTP
4. ✅ OTP verification successful
5. ✅ JWT token received
6. ✅ User logged in

---

## 📁 File Locations

```
D:\full stack\final project\
├── backend/
│   ├── src/main/java/com/farmmarket/
│   │   ├── controller/AuthController.java       # OTP endpoints
│   │   ├── service/OtpService.java              # OTP logic
│   │   ├── service/EmailService.java            # Email sender
│   │   └── entity/User.java                     # OTP fields
│   └── src/main/resources/
│       └── application.properties                # SMTP config
│
└── Frontend/
    ├── src/app/
    │   ├── pages/
    │   │   ├── OTPLogin.jsx                      # Standalone OTP page
    │   │   └── Login.jsx                         # Login with OTP option
    │   ├── utils/
    │   │   └── authService.js                    # API calls
    │   └── routes.jsx                            # Routes config
    │
    ├── OTP_PRODUCTION_SYSTEM.md                  # Full documentation
    ├── TEST_OTP_FLOW.md                          # Testing guide
    └── QUICK_START.md                            # This file
```

---

## 🔗 Useful Links

- **Frontend:** http://localhost:5173
- **OTP Login:** http://localhost:5173/otp-login
- **Regular Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register
- **Backend API:** http://localhost:8080/api
- **Gmail:** https://mail.google.com

---

## 💡 Pro Tips

1. **Keep both terminals open** while testing
2. **Check backend logs** for debugging
3. **Use Chrome DevTools** to see network requests
4. **Test in incognito mode** to avoid cache issues
5. **Clear localStorage** if login state is weird:
   ```javascript
   localStorage.clear()
   ```

---

## 🎊 That's It!

Your production-ready OTP system is **fully functional**! 

Test it now:
1. Open http://localhost:5173/otp-login
2. Enter jogendrasai780@gmail.com
3. Click "Send OTP"
4. Check Gmail
5. Enter OTP
6. You're in! 🚀

**Questions?** Check the other documentation files:
- `OTP_PRODUCTION_SYSTEM.md` - Complete feature list
- `TEST_OTP_FLOW.md` - Detailed testing scenarios

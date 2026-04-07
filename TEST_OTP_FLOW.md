# 🧪 OTP System Testing Guide

## Quick Test (3 Steps)

### Step 1: Start Backend
```bash
cd backend
./apache-maven-3.9.6/bin/mvn.cmd spring-boot:run
```

Wait for: `Started FarmMarketApplication in X seconds`

---

### Step 2: Start Frontend
```bash
cd Frontend
npm run dev
```

Open: http://localhost:5173

---

### Step 3: Test OTP Flow

#### A. Register a Test User First (if needed)
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

#### B. Send OTP
```bash
curl -X POST http://localhost:8080/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jogendrasai780@gmail.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully to jogendrasai780@gmail.com",
  "data": null
}
```

#### C. Check Email
1. Open Gmail: https://mail.google.com
2. Look for email from "jogendrasai780@gmail.com"
3. Subject: "Your OTP for Login - FarmMarket"
4. Copy the 6-digit OTP (e.g., 456789)

#### D. Verify OTP
```bash
curl -X POST http://localhost:8080/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jogendrasai780@gmail.com",
    "otp": "YOUR_OTP_HERE"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "jogendrasai780@gmail.com",
      "name": "Test User",
      "role": "BUYER"
    }
  }
}
```

---

## Frontend Testing

### Option 1: Direct Access
Navigate to: http://localhost:5173/otp-login

### Option 2: From Login Page
1. Go to: http://localhost:5173/login
2. Look for "Login with OTP" button
3. Click to go to OTP login page

---

## Test Scenarios

### ✅ Scenario 1: Happy Path
1. Enter valid email
2. Click "Send OTP"
3. Check email for OTP
4. Enter correct OTP
5. ✅ Successfully logged in with JWT token

### ✅ Scenario 2: Invalid Email
1. Enter invalid email (e.g., "test@")
2. Click "Send OTP"
3. ❌ See error: "Please enter a valid email address"

### ✅ Scenario 3: Email Not Registered
1. Enter email not in database
2. Click "Send OTP"
3. ❌ See error: "No account found with this email address"

### ✅ Scenario 4: Wrong OTP
1. Send OTP successfully
2. Enter wrong OTP (e.g., 000000)
3. ❌ See error: "Invalid OTP. 2 attempt(s) remaining"
4. Try wrong OTP again
5. ❌ See error: "Invalid OTP. 1 attempt(s) remaining"
6. Try wrong OTP third time
7. ❌ See error: "Maximum OTP verification attempts exceeded"

### ✅ Scenario 5: Expired OTP
1. Send OTP successfully
2. Wait 6 minutes (OTP expires after 5 minutes)
3. Enter OTP
4. ❌ See error: "OTP has expired. Please request a new OTP"

### ✅ Scenario 6: Resend OTP (Too Soon)
1. Send OTP successfully
2. Immediately click "Resend OTP"
3. ❌ See error: "Please wait 30 seconds before requesting a new OTP"
4. Wait for countdown: "Resend OTP in 29s... 28s... 27s..."
5. After 30s, button becomes active

### ✅ Scenario 7: Resend OTP (Success)
1. Send OTP successfully
2. Wait 30 seconds
3. Click "Resend OTP"
4. ✅ New OTP sent
5. Old OTP no longer works
6. Use new OTP to login

### ✅ Scenario 8: Change Email
1. Send OTP to email A
2. Realize wrong email
3. Click "Change" button
4. Enter correct email B
5. Send new OTP
6. ✅ OTP sent to email B

---

## Database Verification

Check OTP data in database:

```sql
-- Connect to MySQL
mysql -u root -p9493 farmmarket_db

-- Check user's OTP data
SELECT 
    id,
    email,
    name,
    otp,
    otp_expiry,
    otp_attempts,
    last_otp_sent,
    is_active
FROM users 
WHERE email = 'jogendrasai780@gmail.com';
```

**Expected After Sending OTP:**
```
+----+---------------------------+-----------+--------+---------------------+---------------+---------------------+-----------+
| id | email                     | name      | otp    | otp_expiry          | otp_attempts  | last_otp_sent       | is_active |
+----+---------------------------+-----------+--------+---------------------+---------------+---------------------+-----------+
|  1 | jogendrasai780@gmail.com  | Test User | 456789 | 2026-04-07 16:35:00 |             0 | 2026-04-07 16:30:00 |         1 |
+----+---------------------------+-----------+--------+---------------------+---------------+---------------------+-----------+
```

**Expected After Successful Verification:**
```
+----+---------------------------+-----------+------+------------+--------------+---------------------+-----------+
| id | email                     | name      | otp  | otp_expiry | otp_attempts | last_otp_sent       | is_active |
+----+---------------------------+-----------+------+------------+--------------+---------------------+-----------+
|  1 | jogendrasai780@gmail.com  | Test User | NULL | NULL       |            0 | 2026-04-07 16:30:00 |         1 |
+----+---------------------------+-----------+------+------------+--------------+---------------------+-----------+
```

---

## Common Issues & Solutions

### Issue 1: Email Not Received
**Symptoms:** OTP sent successfully but no email in inbox

**Solutions:**
1. Check spam/junk folder
2. Verify Gmail app password in application.properties
3. Check backend logs:
   ```bash
   tail -f backend/boot-run.log
   ```
4. Test SMTP manually:
   ```bash
   curl smtp://smtp.gmail.com:587 --user "jogendrasai780@gmail.com:xkkhegyuvicdxsyb"
   ```

### Issue 2: 401 Unauthorized
**Symptoms:** API returns 401 error

**Solutions:**
1. Check SecurityConfig.java allows `/api/auth/**`
2. Verify CORS is configured for frontend origin
3. Check if endpoint is protected by authentication

### Issue 3: Connection Refused
**Symptoms:** Frontend can't connect to backend

**Solutions:**
1. Verify backend is running on port 8080
2. Check firewall isn't blocking port
3. Verify frontend API URL is correct:
   ```javascript
   // In authService.js
   const API_BASE_URL = 'http://localhost:8080/api';
   ```

### Issue 4: OTP Always Invalid
**Symptoms:** Correct OTP shows as invalid

**Solutions:**
1. Check time sync between email arrival and verification
2. Verify OTP hasn't expired (5 minutes)
3. Check database to see stored OTP value
4. Ensure no whitespace in OTP input

---

## Performance Testing

### Load Test: Multiple OTP Requests
```bash
# Send 10 OTP requests (should rate limit after first one)
for i in {1..10}; do
  curl -X POST http://localhost:8080/api/auth/send-otp \
    -H "Content-Type: application/json" \
    -d '{"email": "jogendrasai780@gmail.com"}'
  echo "\nRequest $i completed"
  sleep 5
done
```

**Expected:** First request succeeds, next 5 requests fail with rate limit error, then after 30s succeeds again.

---

## Security Testing

### Test 1: Brute Force Protection
Try wrong OTP multiple times:
```bash
# Should fail after 3 attempts
for i in {1..5}; do
  curl -X POST http://localhost:8080/api/auth/verify-otp \
    -H "Content-Type: application/json" \
    -d '{"email": "jogendrasai780@gmail.com", "otp": "000000"}'
  echo "\nAttempt $i"
done
```

### Test 2: OTP Reuse Prevention
```bash
# 1. Send OTP
curl -X POST http://localhost:8080/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "jogendrasai780@gmail.com"}'

# 2. Get OTP from email (e.g., 123456)

# 3. Verify successfully
curl -X POST http://localhost:8080/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "jogendrasai780@gmail.com", "otp": "123456"}'

# 4. Try same OTP again (should fail)
curl -X POST http://localhost:8080/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "jogendrasai780@gmail.com", "otp": "123456"}'
```

**Expected:** Second verification fails with "No active OTP found"

---

## Monitoring

### Check Backend Logs
```bash
# Real-time logs
cd backend
tail -f boot-run.log

# Filter OTP-related logs
grep "OTP" boot-run.log
```

### Check Email Sending
```bash
# Look for email service logs
grep "email sent" boot-run.log
```

---

## Success Criteria ✅

Your OTP system is working correctly if:

1. ✅ Email received within 5 seconds
2. ✅ OTP format is 6 digits
3. ✅ Correct OTP logs you in
4. ✅ Wrong OTP shows error with attempts remaining
5. ✅ Rate limiting works (30s cooldown)
6. ✅ Max attempts lock works (3 tries)
7. ✅ OTP expires after 5 minutes
8. ✅ JWT token received after verification
9. ✅ Beautiful email template displays correctly
10. ✅ Frontend UI is responsive and smooth

---

## Quick Debug Commands

```bash
# Check if backend is running
netstat -ano | findstr :8080

# Check if frontend is running
netstat -ano | findstr :5173

# Check MySQL connection
mysql -u root -p9493 -e "SELECT 1"

# Test email configuration
cd backend
./apache-maven-3.9.6/bin/mvn.cmd spring-boot:run -Dspring-boot.run.arguments="--logging.level.org.springframework.mail=DEBUG"
```

---

## 🎉 Congratulations!

If all tests pass, your production-ready OTP system is fully functional! 🚀

**Features Working:**
- ✅ Secure OTP generation
- ✅ Email delivery
- ✅ Database persistence
- ✅ Rate limiting
- ✅ Attempt limiting
- ✅ Auto-expiry
- ✅ JWT authentication
- ✅ Beautiful UI
- ✅ Error handling

**Ready for Production!** 🔥

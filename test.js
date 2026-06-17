const http = require('http');

const API_URL = 'http://localhost:5000/api/auth';
const testUser = {
  fullName: 'Test User',
  email: `test${Date.now()}@example.com`,
  password: 'securePassword123'
};

let cookie = '';

async function fetchJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      
      // Capture cookies
      if (res.headers['set-cookie']) {
        cookie = res.headers['set-cookie'][0].split(';')[0];
      }

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting Authentication API Tests ---\n');

  // 1. Test Signup
  console.log('1. Testing POST /signup...');
  const signupRes = await fetchJSON(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testUser)
  });
  console.log(`Status: ${signupRes.status}`);
  console.log('Response:', signupRes.data);
  console.log(signupRes.status === 201 ? '✅ Signup Passed\n' : '❌ Signup Failed\n');

  // 2. Test Login & Get Cookie
  console.log('2. Testing POST /login...');
  const loginRes = await fetchJSON(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testUser.email, password: testUser.password })
  });
  console.log(`Status: ${loginRes.status}`);
  console.log('Response:', loginRes.data);
  console.log(`Cookie Received: ${cookie ? 'Yes (httpOnly)' : 'No'}`);
  console.log(loginRes.status === 200 && cookie ? '✅ Login Passed\n' : '❌ Login Failed\n');

  // 3. Test Protected Route without Cookie
  console.log('3. Testing GET /dashboard (Without Cookie)...');
  const unauthRes = await fetchJSON(`${API_URL}/dashboard`, { method: 'GET' });
  console.log(`Status: ${unauthRes.status}`);
  console.log('Response:', unauthRes.data);
  console.log(unauthRes.status === 401 ? '✅ Unauthorized Access Blocked Passed\n' : '❌ Unauthorized Access Failed\n');

  // 4. Test Protected Route with Cookie
  console.log('4. Testing GET /dashboard (With Cookie)...');
  const authRes = await fetchJSON(`${API_URL}/dashboard`, {
    method: 'GET',
    headers: { 'Cookie': cookie }
  });
  console.log(`Status: ${authRes.status}`);
  console.log('Response:', authRes.data);
  console.log(authRes.status === 200 ? '✅ Authenticated Access Passed\n' : '❌ Authenticated Access Failed\n');

  console.log('--- All Tests Completed ---');
}

runTests().catch(console.error);

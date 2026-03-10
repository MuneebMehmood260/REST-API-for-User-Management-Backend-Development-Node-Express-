const http = require('http');
const BASE_URL = 'http://localhost:3000';
const makeRequest = (method, path, data = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};
async function runTests() {
  console.log('=== Testing User Management API ===\n');
  console.log('1. GET /api/users - Get all users');
  const users = await makeRequest('GET', '/api/users');
  console.log(users);
  console.log();
  console.log('2. GET /api/users/1 - Get user by ID');
  const user = await makeRequest('GET', '/api/users/1');
  console.log(user);
  console.log();
  console.log('3. POST /api/users - Create new user');
  const newUser = await makeRequest('POST', '/api/users', {
    name: 'Alice Brown',
    email: 'alice@example.com',
    age: 30
  });
  console.log(newUser);
  console.log();
  console.log('4. PUT /api/users/1 - Update user');
  const updatedUser = await makeRequest('PUT', '/api/users/1', {
    name: 'John Updated',
    age: 29
  });
  console.log(updatedUser);
  console.log();
  console.log('5. DELETE /api/users/2 - Delete user');
  const deletedUser = await makeRequest('DELETE', '/api/users/2');
  console.log(deletedUser);
  console.log();
  console.log('6. GET /api/users - Verify final state');
  const finalUsers = await makeRequest('GET', '/api/users');
  console.log(finalUsers);
  console.log();
  console.log('=== All tests completed ===');
}
runTests().catch(console.error);
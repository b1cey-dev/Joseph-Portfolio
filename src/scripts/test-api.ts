import fetch from 'node-fetch';
import crypto from 'crypto';

const BASE_URL = 'http://localhost:3000';
let authToken: string | null = null;
let userId: string | null = null;

const generateTestEmail = () => {
  const random = crypto.randomBytes(4).toString('hex');
  return `test.${random}@example.com`;
};

const log = {
  info: (message: string) => console.log('\x1b[36m%s\x1b[0m', `[INFO] ${message}`),
  success: (message: string) => console.log('\x1b[32m%s\x1b[0m', `[SUCCESS] ${message}`),
  error: (message: string) => console.log('\x1b[31m%s\x1b[0m', `[ERROR] ${message}`),
  warning: (message: string) => console.log('\x1b[33m%s\x1b[0m', `[WARNING] ${message}`),
};

async function testRegistration() {
  try {
    const email = generateTestEmail();
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email,
        password: 'Test123!@#',
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      log.success('Registration successful');
      return email;
    } else {
      log.error(`Registration failed: ${data.error}`);
      return null;
    }
  } catch (error) {
    log.error(`Registration error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

async function testLogin(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'Test123!@#',
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      authToken = data.token;
      log.success('Login successful');
      return true;
    } else {
      log.error(`Login failed: ${data.error}`);
      return false;
    }
  } catch (error) {
    log.error(`Login error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

async function testProtectedUserRoute() {
  if (!authToken) {
    log.warning('No auth token available');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/protected/user`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      userId = data.id;
      log.success('Protected user route accessible');
      return true;
    } else {
      log.error(`Protected route failed: ${data.error}`);
      return false;
    }
  } catch (error) {
    log.error(`Protected route error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

async function testProfileUpdate() {
  if (!authToken) {
    log.warning('No auth token available');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/protected/user/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Updated Test User',
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      log.success('Profile update successful');
      return true;
    } else {
      log.error(`Profile update failed: ${data.error}`);
      return false;
    }
  } catch (error) {
    log.error(`Profile update error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

async function runTests() {
  log.info('Starting API tests...');
  
  // Test registration
  const testEmail = await testRegistration();
  if (!testEmail) {
    log.error('Tests stopped due to registration failure');
    return;
  }

  // Test login
  const loginSuccess = await testLogin(testEmail);
  if (!loginSuccess) {
    log.error('Tests stopped due to login failure');
    return;
  }

  // Test protected route
  const protectedRouteSuccess = await testProtectedUserRoute();
  if (!protectedRouteSuccess) {
    log.error('Tests stopped due to protected route failure');
    return;
  }

  // Test profile update
  const profileUpdateSuccess = await testProfileUpdate();
  if (!profileUpdateSuccess) {
    log.error('Tests stopped due to profile update failure');
    return;
  }

  log.success('All tests completed successfully!');
}

// Run the tests
runTests().catch(error => {
  log.error(`Test suite error: ${error instanceof Error ? error.message : 'Unknown error'}`);
}); 
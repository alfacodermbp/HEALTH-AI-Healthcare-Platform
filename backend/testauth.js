async function test() {
  try {
    console.log('Testing login...');
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'tester@example.com', password: 'password123' })
    });
    const data = await res.json();
    console.log('Login response:', data);
  } catch (err) {
    if (err.response) {
      console.log('Register error data:', err.response.data);
      console.log('Register error status:', err.response.status);
    } else {
      console.log('Register error:', err.message);
    }
  }
}
test();

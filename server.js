const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
// Middleware
app.use(cors());
app.options('*', cors())
app.use(bodyParser.json())
// Secret key for JWT
const SECRET_KEY = 'my_secret_key';

// Sample user (in a real application, you would fetch this from a database)
const user = {
  id: 1,
  username: 'testuser',
  password: 'password123' // Store hashed passwords in production!
};

// Route to authenticate user and generate JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check user credentials
  if (username === user.username && password === user.password) {
    // Create a token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h', // Token valid for 1 hour
    });

    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});


// Protected route
app.get('/verify', (req, res) => {

    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
    });
    
    res.json({ message: 'Authorized', userId: req.userId });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//dsqfdqs
// ❯ curl -X GET http://localhost:3000/verify \
// -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTcyODg2MDk1NCwiZXhwIjoxNzI4ODY0NTU0fQ.oI0QWq7swtoJu9csAt-6Ylx0fw3mOeDa3cjKgfGeMf0"
// {"message":"Welcome to the protected route!","userId":1}%                                                                                          
// ❯ curl -X POST http://localhost:3000/login \
// -H "Content-Type: application/json" \
// -d '{
//   "username": "testuser",
//   "password": "password123"
// }'
// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTcyODg2MTEzNiwiZXhwIjoxNzI4ODY0NzM2fQ.Jar-RWckePSZNVF2aVNndidaZ1OMzlzHu2Dp17SO25s"}%                                                                                                                  

// ~/fyc                      
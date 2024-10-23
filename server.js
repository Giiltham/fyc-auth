const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json())

// Secret key for JWT
const SECRET_KEY = 'my_secret_key';

const user = {
  id: 1,
  username: 'testuser',
  password: 'password123'
};

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
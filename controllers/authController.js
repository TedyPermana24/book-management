const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { handleError } = require('../utils/errorHandler'); 

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Authorization header is missing!' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey');

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register users!' });
    }

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Allowed roles are admin and user.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    handleError(res, error, 'Failed to register user.');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials!' });

    const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    handleError(res, error, 'Failed to log in.');
  }
};

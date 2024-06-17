import User from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).send('User already exists');
      }
      
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).send('User registered');
  } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Error registering user');
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send('Invalid credentials');
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send('Invalid credentials');
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Error logging in');
  }
};

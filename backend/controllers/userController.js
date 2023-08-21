import User from '../models/user.js';

export const signUp = async (req, res) => {
  //console.log(req.body);
  const { fullName, email, age, password, confirmPassword } = req.body;
  //console.log(req.body);

  // Check if the email already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  if (password === confirmPassword) {
    const newUser = await User.create({ fullName, email, age, password });
  } 
  else {
    return res.status(409).json({ error: 'Passwords do not match' });
  }

  res.status(201).json({ message: 'User created successfully' });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ where: { email } });

  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Sign in successful' });
};

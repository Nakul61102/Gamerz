import Gamer from '../models/gamerSchema.js'; // Import the Gamer model
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWT tokens


export const registerGamer = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    if( !username || !email || !password){
      return res.status(400).json({message: 'All field required.'});
    }

    const existingUsername = await Gamer.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already registered.' });
    }


    // Check if the email is already registered
    const existingGamer = await Gamer.findOne({ email });
    if (existingGamer) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new gamer
    const newGamer = new Gamer({ username, email, password: hashedPassword });
    await newGamer.save();

    res.status(201).json({ message: 'Gamer registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering gamer.', error });
  }
};




export const loginGamer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the gamer by email
    const gamer = await Gamer.findOne({ email });
    if (!gamer) {
      return res.status(404).json({ message: 'Gamer not found.' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, gamer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: gamer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ 
      token, 
      user: { 
        id: gamer._id, 
        name: gamer.username, 
        avatar: gamer.avatar || "/default-avatar.png" 
      },
      message: 'Login successful!'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error });
  }
};

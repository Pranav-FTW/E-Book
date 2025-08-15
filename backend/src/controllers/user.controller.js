import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Book from '../models/book.model.js';

const cookieOptions = {
  httpOnly: true,
  secure: true,  // Ensure this works locally in dev
  sameSite: 'none',  // Required for cross-site cookies
  path: '/',  // Cookie available across the whole site
  maxAge: 24 * 60 * 60 * 1000,  //
};

// Generate Access and Refresh Tokens
const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error('Something went wrong while generating tokens');
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  try {

    const { username, fullName, email, password } = req.body;

    console.log(username , fullName , email ,password);
    

    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log("line 38");

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: 'Please provide a valid email address.' });
    }

    console.log("line 48");


    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username or email already exists.' });
    }


   
    

    const user = await User.create({
      username,
      fullName,
      email,
      password,
    });


    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user._id
    );


    res
      .status(201)
      .cookie('accessToken', accessToken,  cookieOptions)
      .cookie('refreshToken', refreshToken,  cookieOptions)
      .json({
        message: 'User registered successfully.',
        user: { _id : user._id, username, fullName, email },
      });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user._id
    );

    res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .cookie('refreshToken', refreshToken, cookieOptions)
      .json({
        message: 'Login successful.',
        user: {
          _id : user._id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


export const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie('accessToken', cookieOptions)
      .clearCookie('refreshToken', cookieOptions)
      .status(200)
      .json({ message: 'Logout successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


export const getCurrentUser = async(req, res)=>{
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
}


export const getAllBooksByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    // Await the database query to get the actual data
    const books = await Book.find({ author: userId });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (
      !(
        email === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASS
      )
    ) {
      return res.json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    const token = jwt.sign(email + password, process.env.ACCESS_TOKEN_SECRET);
    
    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true, // Set to true only if using HTTPS
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message: 'Login successful',
      });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // destructure id properly

    let user = await User.findById(id);
    console.log(user);

    if (!user) {
      return res.status(401).json({
        message: "Invalid user ID"
      });
    }

    res.json({ user });

  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

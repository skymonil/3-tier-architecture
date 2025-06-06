import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

export const generateToken = (userID, res) => {
  let token;
  try {
    console.log("SECRET_KEY:", process.env.SECRET_KEY); // Debugging line
    token = jwt.sign({ userID }, process.env.SECRET_KEY, { expiresIn: '7d' });
  } catch (err) {
    console.error('Error generating token:', err);
    return; // Return early if token generation fails
  }

  // Ensure secure is a boolean, converting from the environment variable
  const secureCookie = process.env.HTTPS === 'true';

  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'strict',
    secure: secureCookie,
  });

  return token;
};

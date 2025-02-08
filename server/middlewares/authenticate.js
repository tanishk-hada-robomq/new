import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {    
  const accessToken = req.cookies.access_token;
  
  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' });
  }
  
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: 'Invalid or expired token'})
  } 
};

export default authenticate
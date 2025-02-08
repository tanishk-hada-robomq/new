import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/user.model.js'

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const [user] = await userModel.getUserByEmail(email)

    if (user.length !== 0) {
      return res.status(401).json({ success: false, message: 'User with this email already exists.' })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    await userModel.createUser(name, email, hashPassword)
    return res.status(200).json({ success: true, message: 'User created.' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Error in creating user.' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const [user] = await userModel.getUserByEmail(email)

    if (user.length === 0) {
      return res.status(401).json({ success: false, message: 'User with this email doesn\'t exists.' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Wrong password.' })
    }

    const payload = {
      userId: user[0].id,
      username: user[0].name
    }

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })

    res.cookie('access_token', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000 * 30
    })

    return res.status(200).json({ success: true, message: 'User logged in.' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Error logging in.' })
  }
}

const logout = (req, res) => {
  res.clearCookie('access_token')
  res.clearCookie('refresh_token')
  return res.status(200).json({ success: true, message: 'logged out' })
}

const validateToken = (req, res) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is missing' });
  }

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
      return res.status(200).json({ success: true, user: decoded })
    } catch (error) {
      console.log(error)
    }
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
    const user = { userId: decoded.userId, username: decoded.username }

    const newAccessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.cookie('access_token', newAccessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({ success: true, accessToken: newAccessToken, user: decoded });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid refresh token' })
  }
};

const authControllersModel = {
  login,
  register,
  logout,
  validateToken
}

export default authControllersModel
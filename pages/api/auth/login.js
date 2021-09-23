import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ err: "Invalid Credentials." });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ err: "User Doesn't Exists." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: "Incorrect Password." });
    }
    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
        fullName: user.fullName,
        userName: user.userName,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

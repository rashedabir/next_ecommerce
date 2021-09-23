import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import jwt from "jsonwebtoken";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) {
      return res.status(400).json({ err: "Please Login or Register." });
    }
    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result) {
      return res.status(400).json({ err: "Invalid User." });
    }
    const user = await User.findById(result.id);
    if (!user) {
      return res.status(400).json({ err: "User Doesn't Exists." });
    }
    const access_token = createAccessToken({ id: user._id });
    res.json({
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

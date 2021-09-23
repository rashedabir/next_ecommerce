import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { fullName, userName, password, rePassword } = req.body;
    if (!fullName || !userName || !password || !rePassword) {
      return res.status(400).json({ err: "Invalid Credentials." });
    }
    if (password.length < 4) {
      return res.status(400).json({ err: "Password Must be 4 Lengths Long." });
    }
    if (password !== rePassword) {
      return res.status(400).json({ err: "Password Doesn't Match." });
    }
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ err: "User Already Exists." });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, userName, password: passwordHash });
    await newUser.save();
    res.json({ msg: "Register Success!" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

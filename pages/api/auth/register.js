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
      return res.status(400).json({ msg: "Invalid Credentials." });
    }
    if (password.length < 4) {
      return res.status(400).json({ msg: "Password Must be 4 Lengths Long." });
    }
    if (password !== rePassword) {
      return res.status(400).json({ msg: "Password Doesn't Match." });
    }
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists." });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, userName, password, rePassword });
    console.log(newUser);
    res.json({ msg: "Register Success!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

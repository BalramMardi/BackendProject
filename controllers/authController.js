import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Register user
export const register = async (req, res) => {
  const { username, password, roleName } = req.body;

  if (!username || !password || !roleName) {
    return res
      .status(400)
      .json({ message: "Username, password, and role name are required" });
  }

  const role = await Role.findOne({ name: roleName });
  if (!role) return res.status(404).json({ message: "Role not found" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role: role._id });

  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

// Login user
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

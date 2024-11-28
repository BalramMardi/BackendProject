import jwt from "jsonwebtoken";
import Role from "../models/roleModel.js";
import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Authenticate JWT
export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Authorize by Permission
export const authorizePermission = (requiredPermission) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id).populate("role");
    const role = user.role;

    if (!role.permissions.includes(requiredPermission)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions" });
    }
    next();
  };
};

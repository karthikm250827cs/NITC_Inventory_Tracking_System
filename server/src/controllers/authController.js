import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Audit from "../models/Audit.js";

/* ===========================
   🔹 REGISTER CONTROLLER
=========================== */
export const register = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role, lab } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      // Restrict admin role assignment
      let assignedRole = role;
      const admins = (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((s) => s.trim());
      if (!admins.includes(email) && role === "admin") assignedRole = "user";

      user = new User({
        name,
        email,
        password: hashed,
        role: assignedRole,
        lab,
      });
      await user.save();

      // Log in audit trail
      await Audit.create({
        action: "User Registered",
        actor: email,
        entity: "User",
        entityId: user._id,
      });

      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        token,
        user: { name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).send("Server error");
    }
  },
];

/* ===========================
   🔹 LOGIN CONTROLLER
=========================== */
export const login = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").exists().withMessage("Password is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      // Log login event
      await Audit.create({
        action: "User Login",
        actor: email,
        entity: "User",
        entityId: user._id,
      });

      res.json({
        token,
        user: { name: user.name, email: user.email, role: user.role,lab:user.lab },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).send("Server error");
    }
  },
];

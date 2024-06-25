const { User } = require("../models/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const maxAge = 2 * 24 * 60 * 60;
const mySecretKey = process.env.SECRET_KEY;

function getToken(userID) {
  return jwt.sign({ userID }, mySecretKey, {
    expiresIn: maxAge,
  });
}

const handleErrors = (err) => {
  const errors = { email: "", password: "" };

  // error code
  if (err.code == 11000) {
    errors["email"] = "Email is already in use. Please choose a different email.";
  }

  // invalid email OR password - login
  if (err.message == "Invalid email") {
    errors.email = "Invalid email";
  }
  if (err.message == "Invalid password") {
    errors.password = "Invalid password";
  }

  // validation of email & password - signup
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("Signing up");

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    console.log("existing user", existingUser);
    if (existingUser) {
      // User with the same email already exists
      return res.status(400).json({
        errors: {
          email: "Email is already in use. Please choose a different email.",
        },
      });
    } else {
      // Create a new user
      const user = await User.create({ fullName, email, password });

      // You may want to generate a JWT token and send it in the response for user authentication
      console.log("new user", user);
      res.status(201).json({ success: "Signed up successfully" });
    }
  } catch (err) {
    console.error("Error signing up", err);

    // Handle other errors
    const errors = handleErrors(err); // You need to define the handleErrors function
    res.status(500).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Logging in");
  try {
    const user = await User.login(email, password);

    if (!user) {
      // User not found or invalid credentials
      throw new Error("Invalid credentials");
    }

    // Authentication successful
    res.status(200).json({ success: user._id });
    console.log("Logged data", user);
  } catch (err) {
    console.error("Error logging in:", err.message);
    const errors = handleErrors(err);
    res.status(401).json({ errors, message: err.message }); // Include the error message in the response
  }
};

module.exports.deleteUserProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const deletedUserProfile = await User.findOneAndDelete({ email });
    if (!deletedUserProfile) {
      return res.status(404).json({ success: false, error: "User profile not found" });
    }
    res.status(200).json({
      success: true,
      message: "User profile deleted successfully",
      data: deletedUserProfile,
    });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

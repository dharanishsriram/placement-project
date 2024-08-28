const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const PetModel = require("./models/PetAdoptation");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/PetAdoptation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Signup endpoint
app.post('/signup', (req, res) => {
  const { name, email, cpf, cellphone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    PetModel.create({ name, email, cpf, cellphone, password: hashedPassword })
      .then(signup => res.json(signup))
      .catch(err => res.status(500).json({ error: err.message }));
  });
});

// Sign-in endpoint
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  PetModel.findOne({ email: email })
    .then(user => {
      if (!user) {
        // If email does not exist in the database
        return res.status(404).json({ message: "The email provided is not registered. Please sign up first." });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!isMatch) {
          // If password does not match
          return res.status(401).json({ message: "Incorrect password." });
        }

        // If both email and password match
        res.json({ message: "Sign-in successful!", token: "mocked_jwt_token" });
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

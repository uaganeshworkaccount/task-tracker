var jwt = require("jsonwebtoken");
const Users = require("../model/Users.js");
const { sign } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

exports.logout = async (req, res) => {
  res.redirect("/index.html");
};

//Login Using JWT
exports.login = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const usernamecheck = await Users.findOne({ username }).lean();
    const useremail = await Users.findOne({ email }).lean();

    if (!usernamecheck && !useremail) {
      return res.status(404).send("Invalid credentials");
    } else if (usernamecheck) {
      const user = usernamecheck;
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }
      const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
      return res.status(200).json({
        token,
        user: { ...user, password: null },
        role: user.role,
        username: user._id,
      });
    } else if (useremail) {
      // console.log(useremail);
      const user = useremail;
      const isMatch = await compare(password, user.password);
      if (!isMatch) return res.status(400).send("Invalid credentials");
      const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
      return res.status(200).json({
        token,
        user: { ...user, password: null },
        role: user.role,
        username: user._id,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//---------------------------------------------------------------------//
//Register
exports.register = async (req, res, next) => {
  const { name, email, username, password } = req.body;
  console.log(name, email, username, password);
  if (!name || !email || !username || !password)
    return res.status(400).send("Please fill in all the required fields!");
  try {
    const userObj = { name, email, username, password };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new Users(userObj).save();
    const token = sign({ userObj }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(201)
      .json({ token, user: { ...user._doc, password: null }, name: name });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.checkUser = async (req, res, next) => {
  res.status(200).send({ message: "hello" });
};

exports.userExist = async (req, res, next) => {
  const username = req.body.username;
  console.log("username", username);
  const usernamecheck = await Users.findOne({ username }).lean();
  if (usernamecheck) {
    res.status(200).send({ message: "exist" });
  } else {
    res.status(200).send({ message: "available" });
  }
};

exports.emailExist = async (req, res, next) => {
  const email = req.body.email;
  console.log("email", email);
  const emailcheck = await Users.findOne({ email });
  if (emailcheck) {
    res.status(200).send({ message: "exist" });
  } else {
    res.status(200).send({ message: "available" });
  }
};

// ------------------User List-----------------------------------//

exports.userList = async (req, res) => {
  try {
    const users = await Users.find({});

    let onlyusers = [];
    for (i = 0; i < users.length; i++) {
      if (users[i].role == "user") {
        onlyusers.push(users[i]);
      }
    }
    res.status(200).json(onlyusers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

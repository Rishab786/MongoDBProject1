const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// SHOWING ALL EXPENSES
exports.getUserDashboard = (request, response, next) => {
  response.sendFile("addExpense.html", { root: "views" });
};

// SINGUP NEW USER
exports.signup = async (request, response, next) => {
  console.log(request.body);
  const { Name, userName, password } = request.body;
  try {
    let userExist = await User.findOne({ email: userName });
    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: Name,
        email: userName,
        password: hashedPassword,
      });
      const { _id } = await user.save();
      const userId = _id.toString();
      const token = jwt.sign({ userId: userId }, secretKey, {
        expiresIn: "1h",
      });
      response.status(200).send({ token: token, user: user });
    } else {
      response.status(401).send(userExist);
    }
  } catch (error) {
    console.log(error);
  }
};

//USER LOGIN
exports.login = async (request, response, next) => {
  try {
    const { userName, password } = request.body;
    let userExist = await User.findOne({ email: userName });
    if (!userExist) {
      response.status(404).send("User not found");
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        userExist.password
      );
      if (isPasswordValid) {
        const userId = userExist._id.toString();
        const token = jwt.sign({ userId: userId }, secretKey, {
          expiresIn: "1h",
        });
        response.status(200).json({ token: token, user: userExist });
      } else {
        response.status(401).send("Authentication failed");
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500).send("error occurred in Sign in");
  }
};

//REGISTERED SUCCESSFULLY
exports.getRegisteredSuccessfully = (request, response, next) => {
  response.sendFile("registeredSuccessfully.html", { root: "views" });
};

//CHECKING WHETHER USER IS PREMIUM USER OR NOT
exports.getUserStatus = async (request, response, next) => {
  let user = request.user;

  try {
    if (user.ispremiumuser) {
      response.status(200).send("success");
    } else {
      response.status(401).send("failed");
    }
  } catch (error) {
    console.log(error);
  }
};

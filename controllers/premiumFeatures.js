const User = require("../models/users");
const Expenses = require("../models/expenses");
const Awsservice = require("../services/awsServices");

//SHOWING LEADERBOARD DATA TO PREMIUM USERS
exports.getLeaderboard = async (request, response, next) => {
  try {
    const leaderboard = await User.find({})
      .select("name totalexpenses")
      .sort({ totalexpenses: -1 })
      .limit(15);
    return response.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message:  "please relogin" });
  }
};

//GENERATING FILE LINK SO THAT USER CAN DOWNLOAD THEIR EXPENSES FILE
exports.getDownloadURL = async (request, response, next) => {
  try {
    const { user } = request;
    const expenses = await Expenses.find({ userId: user._id });
    const formattedExpenses = expenses.map((expense) => {
      return `Category: ${expense.category}
Product : ${expense.product}
Amount: ${expense.amount}

`;
    });
    const textData = formattedExpenses.join("\n");
    const filename = `expense-data/user${user._Id}/${
      user.name
    }${new Date()}.txt`;
    const URL = await Awsservice.uploadToS3(textData, filename);
    user.downloadUrl.push({
      url: URL,
      createdAt: new Date(),
    });
    await user.save();
    response.status(200).json({ URL, success: true });
  } catch (error) {
    console.log("Error while creating download link: " + error);
    response.status(500).json({ message: "Unable to generate URL" });
  }
};

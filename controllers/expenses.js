const Expenses = require("../models/expenses");

//Saving NEW Expenses
exports.addExpenses = async (request, response, next) => {
  try {
    let { user } = request;
    const { category, price, product } = request.body;
    const ID = Math.floor(Math.random() * 10);
    const expense = new Expenses({
      category: category,
      amount: price,
      userId: user,
      product: product,
      expenseId: ID,
    });
    await expense.save();
    const val = user.totalexpenses;
    const updatedTotalExpenses = Number(val) + Number(price);
    user.totalexpenses = updatedTotalExpenses;
    user.save();

    response.status(200).json({ message: "expense Added" });
  } catch (error) {
    console.log(error);
  }
};

//GETTING ALL THE EXPENSES
exports.getAllExpenses = async (request, response, next) => {
  try {
    const page = request.query.page;
    const user = request.user;
    const limit = Number(request.query.noitem);
    const offset = (page - 1) * limit;
    const expenses = await Expenses.find({ userId: user._id })
      .skip(offset)
      .limit(limit);
    return response.status(200).json({
      expenses: expenses,
      hasMoreExpenses: expenses.length === limit,
      hasPreviousExpenses: page > 1,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(401)
      .json({ message: "Please Relogin" });
  }
};

//DELETE EXPENSES
exports.deletebyId = async (request, response, next) => {
  try {
    const ID = request.params.expenseId;
    const user = request.user;
    const expense = await Expenses.findByIdAndDelete(ID);
    const val = user.totalexpenses;
    user.totalexpenses = val - expense.amount;
    user.save();
    return response.status(200).json({ message: "deleted" });
    
  } catch (error) {
    console.log(error);
  }
};

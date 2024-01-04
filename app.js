const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
 dotenv.config();
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.w3eayvu.mongodb.net/?retryWrites=true&w=majority`;

const homePageRouter = require("./routes/homePage");
const errorPageRouter = require("./routes/errorPage");
const userRouter = require("./routes/users");
const expenseRouter = require("./routes/expenses");
const purchaseRouter = require("./routes/purchaseMembership");
const premiumRouter = require("./routes/premiumFeatures");


const path = require("path");
const app= express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("", homePageRouter);
app.use("/user", userRouter);
app.use("/purchase", purchaseRouter);
app.use("/premium", premiumRouter);
app.use("/expenses", expenseRouter);
app.use("/*", errorPageRouter);


async function runServer(){
    try {
          await mongoose.connect(uri)
        app.listen(3000,()=>{
            console.log(`Server is running at 3000`);
        });       
    } catch (error) {
        console.log(error);
    }
}

runServer();


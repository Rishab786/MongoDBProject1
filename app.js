const express = require("express");
const cors = require("cors");
const mongoConnect = require("./utils/database").mongoConnect;
const userRouter = require("./routes/user");
const path = require("path");
const app= express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("",(req,res,next)=>{
    res.sendFile(path.join(__dirname, "views","home.html"));
})
app.use("/user",userRouter);
 mongoConnect();
app.listen(3000);


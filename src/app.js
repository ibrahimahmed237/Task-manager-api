const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require("./db/mongoose.js");
const app = express();
const port = process.env.PORT;


const userRouter = require("./routers/user.js").router;
const taskRouter = require("./routers/task.js").router;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;


const express = require("express");

const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const studentRouter = require("./routes/student");

app.use(cors({
    origin:"*",
    allowedHeaders:"Content-Type"
}))

app.use(express.json());

app.use(studentRouter);

// app.post("/addStudent");


mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.kpq9o.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`)
.then((result) => {
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
})
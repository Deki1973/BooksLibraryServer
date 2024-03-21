// import biblioteka
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// import kontrolera
const { getAllBooks, addNewBook,deleteBook, updateBook, getBookByTitle } = require("./controllers/books");
const { getSingleBook } = require("./middleware/books");



const app = express();

/*
mongoose.connect(
  `mongodb+srv://konidek37:${process.env.MONGO_PASSWORD}@main.thzu7wd.mongodb.net/Store`
);
*/
mongoose.connect(
  `mongodb+srv://konidek37:${process.env.MONGO_PASSWORD}@main.thzu7wd.mongodb.net/Store`
);
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("connection error;", err);
});
db.once("open", () => {
  console.log("Successfully connected!");
});

// pre rutiranja, pozovi cors funkciju koju si importovao

app.use(cors());

// jos jedna bitna stavka. Omogucava serveru da cita informacije iz bodyja requesta kao json.
app.use(bodyParser.json());

// postavljamo headere za odobravanje odredjenih radnji na nasem serveru
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/
// rutiranje
//app.get("/", controller);
app.get("/books", getAllBooks);
app.post("/books/create", addNewBook);
app.delete("/books/:id", getSingleBook,deleteBook);
app.patch("/books/:id", getSingleBook,updateBook);
app.post("/books/find",getBookByTitle);



app.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});

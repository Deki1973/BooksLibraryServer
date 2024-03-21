const Book = require("../models/books.model");

// treba da napravimo funkciju koja nalazi jednu knjigu
//

// cim funkcija radi sa bazom, doda joj async
async function getSingleBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Zadate knjige nema u bazi." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
}

module.exports = { getSingleBook };

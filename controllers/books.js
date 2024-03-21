// ovde se nalaze svi kontoleri vezani za knjige

const Book = require("../models/books.model");

async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//14.03.2024
async function getSingleBook(req, res) {
  try {
    const books = await Book.findOne();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 2.3.2024.
async function addNewBook(req, res) {
  // parametar request za zahtev informacija
  // parametar response sluzi za vracanje informacij

  // 02.3.2024
  const book = await new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    image: req.body.image,
  });

  // ako gornje informacije zadovoljavaju model, book ce biti sacuvana bazi

  // model je nacrt jednog itema iz baze gde kazes koji je tip podatka i da li je required
  // ako se slaze odradice kako treba, ako ne, nece

  // provera
  //console.log(book);
  try {
    const newBook = await book.save();

    // javljamo frontendu da je sve u redu
    res.status(201).json({ message: "Knjiga je dodata." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//

async function deleteBook(req, res) {
  try {
    await res.book.deleteOne();
    //res.json({ message: "Knjiga je obrisana" });
    res.status(200).json({ message: "Knjiga je obrisana. " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateBook(req, res) {
  if (req.body) {
    res.book.title = req.body.title;
    res.book.author = req.body.author;
    res.book.description = req.body.description;
    res.book.image = req.body.image;
  }
  try {
    //const await= await res.book.save();
    await res.book.save();
    //res.json(updatedBook);
    res.status(200).json({ message: "Knjiga je azurirana." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// funkcija za pronalazenje jedne knjige po naslovu

async function getBookByTitle(req, res) {
  const inputTitle = req.body.title;

  let book;
  try {
    const query = { title: { $regex: inputTitle, $options: "i" } }; // 'i' option makes the search case-insensitive

    book = await Book.findOne(query)
    
    /*
    if (!book) {
      return res.status(404).json({ message: "Zadate knjige nema u bazi." });
      
    }
    */
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ovako se exportuje funkcija iz nodea
module.exports = {
  getAllBooks,
  addNewBook,
  deleteBook,
  updateBook,
  getSingleBook,
  getBookByTitle,
};

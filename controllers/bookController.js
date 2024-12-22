const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found!' });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, author, year, genre } = req.body;
  const newBook = await Book.create({ title, author, year, genre });
  res.status(201).json(newBook);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found!' });

  const updatedBook = await book.update(req.body);
  res.json(updatedBook);
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found!' });

  await book.destroy();
  res.json({ message: 'Book deleted!' });
};

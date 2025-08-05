import Book from '../models/book.model.js';

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { name, category, content, summery } = req.body;
    const author = req.user._id; // Get the authenticated user's ID

    if (!name || !category || !summery || !content) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newBook = await Book.create({
      name,
      author,
      summery,
      category,
      content,
    });

    res.status(201).json({
      message: 'Book created successfully.',
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get all books
// Get all authorized books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ isAuthorizedByAdmin: true }).populate(
      'author',
      'username fullName'
    );
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate(
      'author',
      'username fullName'
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Update a book (only the author can update)
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, content, summery } = req.body;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    // Check if the logged-in user is the author
    if (book.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to update this book.' });
    }

    book.name = name || book.name;
    book.category = category || book.category;
    book.content = content || book.content;
    book.summery = summery || book.summery;

    await book.save();

    res.status(200).json({ message: 'Book updated successfully.', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Delete a book (only the author can delete)
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    // Check if the logged-in user is the author
    if (book.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this book.' });
    }

    await book.deleteOne();

    res.status(200).json({ message: 'Book deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

export const getAllBooksForAdmin = async (req, res) => {
  try {
    const books = await Book.find({ isAuthorizedByAdmin: false });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

export const makePublic = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required.' });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    book.isAuthorizedByAdmin = true;
    await book.save();

    res.status(200).json({ message: 'Book is now public.' });
  } catch (e) {
    console.error('Error making book public:', e);
    res.status(500).json({ message: 'Server error.', error: e.message });
  }
};

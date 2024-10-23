const express = require('express');
const { getAllBooks, getBookById } = require('./controllers');

const app = express();

app.use(express.json());

app.get('/books', async (req, res) => {
  let books = await getAllBooks();
  res.json({ books });
});

app.get("/books/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let book = await getBookById(id);
  res.json({ book });
});


module.exports = {app};
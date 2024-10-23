let request = require('supertest');
let { getAllBooks } = require('../controllers');
let { app } = require('../index.js');
let http = require('http');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllBooks: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controller Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all books', async () => {
    let mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction'
    },
    {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian'
    },
    {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic'
    },
    ];

    getAllBooks.mockReturnValue(mockBooks);

    let result = await getAllBooks();
    expect(result).toEqual(mockBooks);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoint tests', () => {
  it('GET /books should get all books', async () => {
    let res = await request(server).get('/books');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      books: [
        {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction'
      },
      {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian'
      },
      {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic'
      },
      ],
    });
    expect(res.body.books.length).toBe(3);
  });

  it('GET /books/details/:id should get a book by ID', async () => {
    let res = await request(server).get('/books/details/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
    });
  });
});

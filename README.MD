# 📚 Bookstore API

A comprehensive RESTful API for managing books, authors, and publishers using Node.js, Express, and MongoDB.

## 🚀 Features

- Complete CRUD operations for books, authors, and publishers
- Advanced search functionality with multiple parameters
- Data validation using Joi
- Error handling middleware with meaningful messages
- MongoDB Atlas integration
- MVC architecture
- Basic testing using Jest
- API documentation using OpenAPI 3.0

## 🛠️ Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Jest** - Testing framework
- **Joi** - Data validation
- **OpenAPI 3.0** - API documentation

## 📁 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── docs/          # API documentation
├── errors/        # Custom error classes
├── middleware/    # Express middleware
├── mockdata/      # Test data
├── models/        # Mongoose models
├── routes/        # Express routes
├── tests/         # Test suites
├── utils/         # Utility functions
└── validations/   # Joi validation schemas
```

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/235471/BookStoreAPI.git
```

2. Install dependencies
```bash
cd bookstore-api
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
```
DB_CONNECTION_STRING=your_mongodb_atlas_connection_string
```

4. Start the server
```bash
npm run dev
```

## 📝 API Endpoints

### Books
- `GET /books` - Get all books
- `POST /books` - Create new book(s)
- `GET /books/{id}` - Get a specific book
- `PUT /books/{id}` - Update a book
- `DELETE /books/{id}` - Delete a book
- `GET /books/search` - Search books by title, author, or publisher

### Authors
- `GET /author` - Get all authors
- `POST /author` - Create new author(s)
- `GET /author/{id}` - Get a specific author
- `PUT /author/{id}` - Update an author
- `DELETE /author/{id}` - Delete an author
- `GET /author/search` - Search authors by name or nationality

### Publishers
- `GET /publisher` - Get all publishers
- `POST /publisher` - Create new publisher(s)
- `GET /publisher/{id}` - Get a specific publisher
- `PUT /publisher/{id}` - Update a publisher
- `DELETE /publisher/{id}` - Delete a publisher
- `GET /publisher/search` - Search publishers by company name or CNPJ

## 🧪 Testing

The project includes comprehensive test suites using Jest:

```bash
# Run tests with coverage
npm run test
```

## 🔍 Error Handling

The API implements a centralized error handling system that provides meaningful error messages. Common error responses include:

- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side errors

## 📖 API Documentation

The API is documented using OpenAPI 3.0 specification. You can access the documentation at:

```
http://localhost:3000/api-docs
```

## 🔐 Data Validation

Input validation is implemented using Joi schemas for all endpoints, ensuring data integrity and providing clear validation error messages.
Some custom validations with utils functions.

## 👥 Authors

- Israel - [Your GitHub Profile](https://github.com/235471)
- Project Link: https://github.com/235471/BookStoreAPI
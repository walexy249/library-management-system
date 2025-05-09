# 📚 Library Management System API

A simple RESTful API built with **Node.js**, **Express.js**, and **MongoDB** (via **Mongoose**) that allows users to manage a collection of books. This app supports:

- Viewing all books
- Adding a book
- Borrowing a book
- Returning a book
- Viewing all available books

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Setup Instructions

### Clone the repository

```
git clone https://github.com/walexy249/library-management-system.git
cd library-management-system
```

Install dependencies

```
npm install
```

Install nodemon

```
npm install -g nodemon
```

Configure Environment Variables
Create a .env file in the root of your project with the following content

```
PORT=3000
NODE_ENV=development
DATABASE=mongodb://localhost:27017/lbs
```

Install MongoDB

Follow the Mongodb installation instruction for mac or windows depending on your machine

Start Mongo Shell
Ensure MongoDB is running locally.

```
mongosh
```

Run the application

```
npm start dev
```

API Endpoints
3000

🧾 API Endpoints

Base URL for Local testing

```
127.0.0.1:3000/
```

Base URL for Live API Server

```
https://library-management-system-eight-phi.vercel.app/
```

➕ Add a Book
POST api/books

Request Body

```
{
    "title": "The jaguar",
    "author": "Ade Tamiu",
    "description": "A book about a jaguar"
}
```

Response

```
{
    "status": "success",
    "data": {
        "book": {
            "title": "The jaguar",
            "author": "Ade Tamiu",
            "description": "A book about a jaguar",
            "isBorrowed": false,
            "borrower": null,
            "borrowedAt": null,
            "_id": "681d426d637a6a04674b107f",
            "__v": 0
        }
    }
}
```

Borrow a Book
POST api/books/:id/borrow

Request Body

```
{
    "borrower": "Adeyemi lasisi"
}
```

Response

```
{
    "status": "success",
    "data": {
        "book": {
            "_id": "681d426d637a6a04674b107f",
            "title": "The jaguar",
            "author": "Ade Tamiu",
            "description": "A book about a jaguar",
            "isBorrowed": true,
            "borrower": "Adeyemi lasisi",
            "borrowedAt": "2025-05-08T23:47:17.622Z",
            "__v": 0
        }
    }
}
```

Return a Book
POST api/books/:id/return

Response

```
{
"status": "success",
"data": {
"book": {
"\_id": "681d426d637a6a04674b107f",
"title": "The jaguar",
"author": "Ade Tamiu",
"description": "A book about a jaguar",
"isBorrowed": false,
"borrower": null,
"borrowedAt": null,
"\_\_v": 0
}
}
}
```

View All Available Books
GET api/books/available

Response

```
{
    "status": "success",
    "results": 3,
    "data": {
        "books": [
            {
                "_id": "681d256fca366ae5f3ddbee3",
                "title": "Yellow Jacket",
                "author": "Lawal Olawale",
                "description": "A very nice book",
                "isBorrowed": false,
                "borrower": null,
                "borrowedAt": null,
                "__v": 0
            },
            {
                "_id": "681d29b249ecf256b41e6192",
                "title": "A mountain king",
                "author": "Alje Takon",
                "description": "A book about a king struggle",
                "isBorrowed": false,
                "borrower": null,
                "borrowedAt": null,
                "__v": 0
            },
            {
                "_id": "681d426d637a6a04674b107f",
                "title": "The jaguar",
                "author": "Ade Tamiu",
                "description": "A book about a jaguar",
                "isBorrowed": false,
                "borrower": null,
                "borrowedAt": null,
                "__v": 0
            }
        ]
    }
}
```

View All Books
GET api/books

Response

```
{
    "status": "success",
    "results": 3,
    "data": {
        "books": [
            {
                "_id": "681d256fca366ae5f3ddbee3",
                "title": "Yellow Jacket",
                "author": "Lawal Olawale",
                "description": "A very nice book",
                "isBorrowed": false,
                "borrower": null,
                "borrowedAt": null,
                "__v": 0
            },
            {
                "_id": "681d29b249ecf256b41e6192",
                "title": "A mountain king",
                "author": "Alje Takon",
                "description": "A book about a king struggle",
                "isBorrowed": false,
                "borrower": null,
                "borrowedAt": null,
                "__v": 0
            },
            {
                "_id": "681d426d637a6a04674b107f",
                "title": "The jaguar",
                "author": "Ade Tamiu",
                "description": "A book about a jaguar",
                "isBorrowed": true,
                "borrower": "Adeyemi lasisi",
                "borrowedAt": "2025-05-08T23:47:17.622Z",
                "__v": 0
            }
        ]
    }
}
```

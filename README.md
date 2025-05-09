# 📚 Library Management System API

A simple RESTful API built with **Node.js**, **Express.js**, and **MongoDB** (via **Mongoose**) that allows users to manage a collection of books. This app supports:

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

### 1. Clone the repository

```
git clone https://github.com/walexy249/library-management-system.git
cd library-management-system
```

Install dependencies

```
npm install
```

Configure Environment Variables
Create a .env file in the root of your project with the following content

```
PORT=3000
NODE_ENV=development
DATABASE=mongodb://localhost:27017/library
```

Install MongoDB

Start MongoDB
Ensure MongoDB is running locally.

```
mongod
```

Run the application

```
npm start
```

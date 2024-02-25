# Blog API

This is a blog API built using Node.js, Express, JWT for authentication, and Mongoose for interacting with a MongoDB database. It follows the REST API standard and was created as part of The Odin Project's Node.js course.

[Frontend repository of this API can be found here](https://github.com/pndmhs/blog-client/)

## Features

- **CRUD operations**: Create, Read, Update, and Delete blog posts
- **Authentication**: Secure access to specific functionalities using JSON Web Tokens (JWT).
- **MongoDB Integration**: Utilize Mongoose's ORM for interacting with MongoDB
- **RESTful API design**: Adheres to RESTful API standards for consistency and ease of use.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- Git installed

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pndmhs/blog-api.git
```

2. Navigate to the project directory:

```bash
cd blog-api
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   ACCESS_TOKEN_SECRET=your-jwt-secret
   ```

   Replace `your-mongodb-connection-string` and `your-jwt-secret` with your MongoDB connection string and a secret key for JWT.

5. Run the application:

```bash
npm start
```

The API will be accessible at `http://localhost:3000`.

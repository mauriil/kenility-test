### README

# E-Commerce Project with NestJS and MongoDB

This project is designed to fulfill the requirements of a new e-commerce company. The project involves creating a Node API using NestJS and connecting it to MongoDB using `@nestjs/mongoose`. JWT is used as an authentication strategy, and the API supports operations for products and orders. The project is dockerized to simplify deployment and management.

## Requirements

- Docker and Docker Compose
- Node.js (if running without Docker)

## Setup and Installation

### Step 1: Clone the Repository

```sh
git clone https://github.com/mauriil/kenility-test.git
cd kenility-test
```

### Step 2: Environment Variables

Create a `.env` file in the root directory:

```env
# .env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=*

# MongoDB connection
MONGO_URI=mongodb://root:exampleSuperSecretPassword@mongodb:27017/nest?authSource=admin

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### Step 3: Docker Compose

Ensure you have Docker and Docker Compose installed on your machine. Use the following command to start the services:

```sh
docker-compose up --build
```

This command will:

1. Build the Docker image for the NestJS application.
2. Pull and run the MongoDB Docker image.
3. Start both services and link them together.

### Step 4: Access the Application

Once the Docker containers are up and running, you can access the API at `http://localhost:3000`.

## Endpoints

### Authentication

- **Sign Up**: `POST /auth/signup`
- **Sign In**: `POST /auth/signin`

### Users

- **Get All Users**: `GET /users`
- **Get User by ID**: `GET /users/:id`
- **Update User**: `PUT /users/:id`
- **Delete User**: `DELETE /users/:id`

### Products

- **Create a Product**: `POST /products`
- **Request a Product**: `GET /products/:id`
- **Get All Products**: `GET /products`
- **Update a Product**: `PUT /products/:id`

### Orders

- **Create an Order**: `POST /orders`
- **Update an Order**: `PUT /orders/:id`
- **Get All Orders**: `GET /orders`
- **Get Order by ID**: `GET /orders/:id`

### Reports
- **Get Total Sold Price in Last Month**: `GET /reports/total-sold`
- **Get Higher Amount Order**: `GET /reports/highest-amount-order`


## Conclusion

This project fulfills the e-commerce company's requirements for storing and managing products and orders, implementing JWT authentication, and deploying the API and MongoDB using Docker. The provided endpoints allow for creating and managing products and orders, retrieving sales data, and identifying the highest amount order.

Feel free to contribute or reach out if you have any questions or suggestions.
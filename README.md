# 🍽️ Restaurant Service - Food Delivery App

This is the **Restaurant Service** for the Food Delivery App backend, built with **Node.js**, **Express**, and **Prisma**. It handles restaurant registration, menu management, order processing, and communication with the Delivery Agent Service for assigning delivery personnel.

---

## 📁 Project Structure

restaurant-service/
├── prisma/ # Prisma schema and migration files
├── src/
│ ├── controllers/ # Route handler logic
│ ├── routes/ # Route definitions
│ ├── services/ # Business logic
│ ├── utils/ # Helper functions
│ ├── app.ts # Express app
│ └── server.ts # Entry point
├── .env # Environment variables
├── package.json
└── tsconfig.json


## 🧪 Features

- Register and manage restaurants
- Toggle restaurant online/offline status
- Add, update, and retrieve menu items
- Create and manage orders
- Assign delivery agents by calling the Delivery Service

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js >= 18.x
- PostgreSQL database
- Prisma installed globally (`npm install -g prisma`)

### 📥 Clone and Setup

git clone https://github.com/shivamkumarrai1/Food-Delivery-App-Restaurant-Service.git
cd Food-Delivery-App-Restaurant-Service
npm install
⚙️ Environment Variables
Create a .env file in the root:

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db_name>
DELIVERY_SERVICE_URL=http://<delivery-service-host>/api/assign
PORT=5001
🔃 Run Migrations

npx prisma generate
npx prisma migrate deploy
🏁 Start the Server

#production
npm run build
node dist/server.js

# For development(locally)
npm run dev
📡 API Endpoints
📍 Health Check

GET /api/health

🍽️ Restaurant Management
✅ Create Restaurant

POST /api/restaurant
Body:
{
  "name": "KFC",
  "address": "New York",
  "phone": "1234567890"
}
🔄 Toggle Online Status

PUT /api/restaurant/:restaurantId/status

📜 Get All Online Restaurants

GET /api/restaurant/online
🧾 Menu Management
➕ Add Menu Item

POST /api/restaurant/:restaurantId/menu
Body:
{
  "name": "Burger",
  "description": "Delicious chicken burger",
  "price": 150
}
📋 Get Restaurant Menu

GET /api/restaurant/:restaurantId/menu
🛒 Order Management
🆕 Create Order

POST /api/restaurant/:restaurantId/order
Body:
{
  "items": [1, 2, 3],  // MenuItem IDs
  "userId": 101
}
📈 Update Order Status

PUT /api/order/:orderId/status
Body:
{
  "status": "PREPARING" | "READY_FOR_PICKUP" | "COMPLETED"
}
🧪 Testing (Optional)
Use Postman or cURL to test the endpoints. You can also integrate with Jest or Supertest for automated tests.

📦 Deployment (Render Example)
Set the following in Render dashboard:

Build Command: npm run build

Start Command: node dist/server.js

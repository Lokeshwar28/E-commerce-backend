# 🛍️ E-commerce Backend

This is the backend of the **E-commerce Application**, built with **Node.js**, **Express**, and **PostgreSQL**. It provides APIs for user authentication, product management, cart operations, and order processing.

---

## 🚀 Features

- 👤 User Authentication (Register/Login)
- 🛒 Product CRUD operations
- 🛍️ Cart management (Add/Remove/Update items)
- 📦 Order creation and history tracking
- 🧑‍💼 Admin-specific APIs

---

## 🧰 Tech Stack

- **Node.js** + **Express** – Server & routing  
- **PostgreSQL** – Database  
- **Sequelize / pg** – PostgreSQL interaction  
- **JWT** – Authentication  
- **bcryptjs** – Password hashing  
- **CORS** – Cross-Origin Resource Sharing  
- **dotenv** – Environment variable handling  

---



## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5001
POSTGRES_URL=postgres://<username>:<password>@localhost:5432/ecommerce
JWT_SECRET=your_jwt_secret
```
---

## 🧪 Getting Started


1. Install dependencies
```
npm install
```
2. Start the server
```
node server.js
```
Your server will be running at http://localhost:5001.

---

## 🌐 Deployment

This backend is deployed on an AWS EC2 instance and proxied using Nginx with HTTPS via Let’s Encrypt and DuckDNS.

Example base URL for production:
```
https://shopease.duckdns.org/api
```

---

## 🛡️ Security Notes
	•	Make sure your .env file is not committed to version control.
	•	CORS is configured to only allow trusted frontend domains.
	•	HTTPS is enforced in production using a reverse proxy (Nginx).
 ----

## 🧾 License

This project is licensed under the MIT License.



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();
console.log("ENV Loaded:", process.env.POSTGRES_URL);
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-frontend-three-psi.vercel.app",
  "https://71eb-18-118-2-28.ngrok-free.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce backend is running ✅");
});

const PORT = process.env.PORT || 5001;
connectDB().then(() =>
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  }
));

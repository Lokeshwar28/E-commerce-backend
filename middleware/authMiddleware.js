import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded;
      next();
    } catch (err) {
      
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    console.warn("⚠️ No token found in header");
    return res.status(401).json({ message: "No token provided" });
  }
};
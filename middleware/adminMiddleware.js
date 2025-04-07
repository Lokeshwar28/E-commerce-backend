export const adminOnly = (req, res, next) => {
    console.log("🔍 req.user:", req.user);
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Admin access required" });
    }
  };
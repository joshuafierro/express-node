import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.satus(401).json({ message: "Token Missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invlaid Token" });
    }
    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware;

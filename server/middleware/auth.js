import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header(Authorization);
    if (!token) {
      return res.status(403).send({ message: "No token provided" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

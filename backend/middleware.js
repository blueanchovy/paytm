const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const jw_token = token.split(" ")[1];

  if (!jw_token || !token.startsWith("Bearer")) {
    res.status(403).json({ msg: "Invalid token format!" });
  }

  try {
    jwt.verify(jw_token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(411).json({ msg: "Unauthorized user!" });
      } else {
        req.userId = user.userId;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ msg: "Not found." });
  }
}

module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token.startsWith("Bearer")) {
    res.status(403).json({ msg: "Invalid token format!" });
  }
  const jw_token = token.split(" ")[1];
  if (!jw_token) {
    res.status(403).json({ msg: "Invalid token format!" });
  }

  try {
    jwt.verify(jw_token, process.env.JWT_SECRET, (err, user) => {
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

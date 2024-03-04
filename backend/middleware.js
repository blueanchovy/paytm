import { jwtVerify } from "jose/jwt/verify";
import { decode } from "jose/util/base64url";
import { Buffer } from "buffer";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer")) {
    res.status(403).json({ msg: "Invalid token format!" });
    return;
  }
  const jwt = token.split(" ")[1];
  if (!jwt) {
    res.status(403).json({ msg: "Invalid token format!" });
    return;
  }

  try {
    const { payload } = jwtVerify(
      jwt,
      Buffer.from(process.env.JWT_SECRET, "base64")
    );
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ msg: "Unauthorized user!" });
  }
}

export default authMiddleware;

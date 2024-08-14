import crypto from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function setCookies(req, res, fingerprint, refresh) {
  // fingerprint is used in pair with jwt token to securely identify the user (see OWASP recommendation)
  res.cookie("fingerprint", fingerprint, {
    httpOnly: true,
    secure: true,
    // sameSite: "Strict",
    maxAge: 1000 * 60 * 15, // 15 minutes (same as JWT token)
  });
  // refresh token is used to get a new jwt token
  res.cookie("refresh", refresh, {
    httpOnly: true,
    secure: true,
    // sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    path: req.baseUrl + "/refresh-token", // only the current path can access the refresh cookie
  });
}

function generateTokens(userId) {
  // follow OWASP recommendation
  // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
  const fingerprint = uuidv4();
  const refresh = uuidv4();
  const hashedFingerprint = hashToken(fingerprint);
  const hashedRefresh = hashToken(refresh);
  const token = jwt.sign(
    { id: userId, fingerprint: hashedFingerprint, refresh: hashedRefresh },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return { token, fingerprint, refresh };
}

export { generateTokens, hashToken, setCookies };

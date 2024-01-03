import { validateToken } from "../utils/jwt.util.js";

const nonAuthUrls = ["/auth"];

export default async (req, res, next) => {
  try {
    if (
      req.url === "/" ||
      nonAuthUrls.filter((ele) => req.url.startsWith(ele)).length
    ) {
      console.log("No Authorization needed for Request - ", req.url);
      next();
    } else {
      console.log("Authorization needed for Request - ", req.url);

      const bearerToken =
        req.headers.authorization ||
        req.headers.Authorization ||
        req.query.token;

      if (!bearerToken) {
        const error = new Error("No Authorization passed: Bearer {token}");
        error.statusCode = 400;
        throw error;
      }

      const accessToken = bearerToken.split(" ")[1];
      if (!accessToken) {
        const error = new Error("Access Token Missing");
        error.statusCode = 400;
        throw error;
      }

      const data = validateToken(accessToken);
      if (!(data && data.userId)) {
        const error = new Error("Unauthorized (Token expired or Invalid)");
        error.statusCode = 400;
        throw error;
      }

      req.userId = data.userId;
      next();
    }
  } catch (err) {
    next(err);
  }
};

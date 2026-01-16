import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import jwt from  "jsonwebtoken"

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header("token");

  if (!token) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    await next();
  } catch (error) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
});
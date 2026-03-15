import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/http";

function isPrismaError(e: unknown): boolean {
  return e != null && typeof e === "object" && "code" in e;
}

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  next(new HttpError(404, "Route not found"));
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: error.issues[0]?.message || "Validation error",
      details: error.issues,
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (isPrismaError(error)) {
    const prismaErr = error as { code?: string; message?: string };
    const code = prismaErr.code;
    const msg = prismaErr.message ?? "Database error";
    console.error("[error-handler] Prisma:", code, msg);
    if (code === "P2002") {
      res.status(409).json({ error: "User with this email already exists" });
      return;
    }
    if (code === "P1001" || code === "P1002" || msg.includes("connect") || msg.includes("Connection")) {
      res.status(503).json({ error: "Database connection failed. Check DATABASE_URL and that PostgreSQL is running." });
      return;
    }
  }

  const message =
    error instanceof Error ? error.message : "Internal server error";
  console.error("[error-handler] 500:", error);
  res.status(500).json({ error: message });
}

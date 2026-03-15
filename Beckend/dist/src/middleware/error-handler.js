"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const http_1 = require("../utils/http");
function isPrismaError(e) {
    return e != null && typeof e === "object" && "code" in e;
}
function notFoundHandler(_req, _res, next) {
    next(new http_1.HttpError(404, "Route not found"));
}
function errorHandler(error, _req, res, _next) {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            error: error.issues[0]?.message || "Validation error",
            details: error.issues,
        });
        return;
    }
    if (error instanceof http_1.HttpError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }
    if (isPrismaError(error)) {
        const prismaErr = error;
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
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[error-handler] 500:", error);
    res.status(500).json({ error: message });
}

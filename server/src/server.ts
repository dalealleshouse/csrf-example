import express from "express";
import cors from "cors";
import { doubleCsrf } from "csrf-csrf";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "some-secret-key", // Change this to a real secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in production if using HTTPS
  })
);

app.use(cookieParser());

const {
  invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
  generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
  validateRequest, // Also a convenience if you plan on making your own middleware.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => {
    return "123456789";
  },
  cookieName: "monkey_punch",
});

app.use(doubleCsrfProtection);

// Send CSRF Token to Client
app.get("/csrf-token", (req, res) => {
  if (req.csrfToken === undefined) {
    return res.status(500).json({ error: "CSRF Token not found" });
  }
  res.json({ csrfToken: generateToken(req, res) });
});

app.post("/data", (req, res) => {
  res.json({ status: "Success" });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

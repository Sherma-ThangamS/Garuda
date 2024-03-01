import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

app.use(
  cors({
    origin: "http://192.168.67.146:3000",
    credentials: true, 
  })
);

app.use(cookieParser());

app.use((req, res, next) => {
  const token = req.cookies.accessToken;
  res.cookie('accessToken', token, { 
    httpOnly: false, 
    secure: true, 
    sameSite: 'None', 
  });
  next();
});
app.use("/api/auth", authRoutes);
const port=8800
app.listen(port, '192.168.67.146', () => {
  console.log(`API working! ${port}`);
});
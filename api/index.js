import express from "express";
import authRoutes from "./routes/auth.js";
import patentRoutes from "./routes/patents.js";
import projectRoutes from "./routes/projects.js"
import publicationRoutes from "./routes/publication.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
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


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


app.use("/api/auth", authRoutes);
app.use("/api/patent",upload.single('file'), patentRoutes);
app.use("/api/project",projectRoutes);
app.use("/api/publication",publicationRoutes);

const port=8800;
app.listen(port, () => {
  console.log(`API working! ${port}`);
});
import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const addPublication = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const q = "INSERT INTO publication(`author`, `dept`, `title`, `journal`, `date`, `ISSN`,`userId`) VALUES (?)";
      const values = [
        req.body.author,
        req.body.dept,
        req.body.title,
        req.body.journal,
        req.body.date,
        req.body.ISSN,
        req.body.userId,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Publication has been created.");
      });
    });
  }
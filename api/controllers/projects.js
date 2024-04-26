import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const addProject = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const q = "INSERT INTO project(`name`, `desig`, `type`, `title`, `fundagen`, `stats`, `amount`, `submission`, `duration`, `complition`,`userId` ) VALUES (?)";
      const values = [
        req.body.name,
        req.body.desig,
        req.body.type,
        req.body.title,
        req.body.fundagen,
        req.body.stats,
        req.body.amount,
        req.body.submission,
        req.body.duration,
        req.body.complition,
        req.body.userId
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Patent has been created.");
      });
    });
  }
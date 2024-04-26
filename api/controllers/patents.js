import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const addPatent = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        let file="";
        if (!req.file || !req.file.buffer) {
          file=req.file.encoding;
        }

        const q = "INSERT INTO patent(`title`, `appnum`, `invtname`, `patent`, `status`, `applied`, `granted`, `userId`, `applicant`,`file`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.appnum,
            req.body.invtname,
            req.body.patent,
            req.body.status,
            req.body.applied,
            req.body.granted,
            req.body.userId,
            req.body.applicant,
            file
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Patent has been created.");
        });
    });
};

import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import Cookies from 'universal-cookie';

export const register = (req, res) => {

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`userid`,`username`,`password`) VALUE (?)";

    const values = [
      req.body.email,
      req.body.name,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login=(req,res)=>{
  const q="select * from users where username=?";
  db.query(q,[req.body.username],(err,data)=>{
    if (err) return res.status(500).json(err);
    if(data.length===0) return res.status(404).json("user not found")
    const checkPassword=bcrypt.compareSync(req.body.password,data[0].password)
    if(!checkPassword) return res.status(400).json("Wrong Password")
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];
    res.cookie("accessToken", token, { httpOnly: true,secure: true,sameSite: 'None',}).status(200).json(others);
  });
};


export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};
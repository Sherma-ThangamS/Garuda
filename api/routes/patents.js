import  Express from "express"
import { addPatent } from "../controllers/patents.js";

const router=Express.Router();
router.post("/",addPatent);
export default router;
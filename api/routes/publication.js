import  Express from "express"
import { addPublication } from "../controllers/publication.js";

const router=Express.Router();
router.post("/",addPublication);
export default router;
import  Express from "express"
import { addProject } from "../controllers/projects.js";

const router=Express.Router();
router.post("/",addProject);
export default router;
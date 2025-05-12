import express from 'express'
import { SeekerProfile, EditSeekerProfile, updatePass, getOtp, checkOtp, changePass } from '../controllers/SeekerProfileController.js';

let routes = express.Router();

routes.get("/", SeekerProfile);
routes.put("/", EditSeekerProfile)
routes.post("/updatepass", updatePass);
routes.post("/getotp", getOtp);
routes.post("/checkotp", checkOtp);
routes.post("/changepass", changePass);

export default routes;
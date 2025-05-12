import express from 'express';
import { saveMessage, getAllMsgByPropertyId, rzpyOrder } from '../controllers/MessageController.js';
let routes = express.Router();

routes.post("/", saveMessage);
routes.post("/order", rzpyOrder);
routes.get("/getmessages/:pid", getAllMsgByPropertyId)

export default routes;
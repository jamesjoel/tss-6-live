import express from 'express';
import { SaveProperty, getAllProperty, getAllPropertyByOwnerAdmin, getAllPropertyById, getAllPropertyByOwner, getAllPropertyWithOwner } from '../controllers/PropertyController.js';
let routes = express.Router();

routes.post("/", SaveProperty);

routes.get("/", getAllProperty);

routes.get("/owner", getAllPropertyByOwner)

routes.get("/withowner", getAllPropertyWithOwner)

routes.get("/find/:id", getAllPropertyById);

routes.get("/admin/:id", getAllPropertyByOwnerAdmin);

// localhost:3000/api/v1/property/admin/123

export default routes;
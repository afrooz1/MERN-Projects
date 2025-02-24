import express from "express";
import { submitContactForm, getAllContacts } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", submitContactForm); // POST request to submit a message
router.get("/", getAllContacts); // GET request to retrieve messages

export default router;

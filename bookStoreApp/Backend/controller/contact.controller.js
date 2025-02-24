import Contact from "../model/contact.model.js";

// @desc  Submit a contact message
// @route POST /contact
export const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save contact message
    const newContact = new Contact({ fullName, email, message });
    await newContact.save();

    res.status(201).json({ message: "Your message has been received!" });
  } catch (error) {
    console.error("Contact Form Submission Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc  Get all contact messages
// @route GET /contact
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Fetch Contacts Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

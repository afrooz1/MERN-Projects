import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, trim: true },
        image: { type: String, required: true }, // Consider storing URL paths
        title: { type: String, required: true, trim: true },
    },
    { timestamps: true } // Adds createdAt & updatedAt fields
);

const Book = mongoose.model("Book", bookSchema);

export default Book;

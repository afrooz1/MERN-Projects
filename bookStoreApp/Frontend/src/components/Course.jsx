import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]); // Ensure book starts as an array

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log("API Response:", res.data);
        setBook(Array.isArray(res.data) ? res.data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching books:", error);
        setBook([]); // Prevent crashes
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      {/* Heading Section */}
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          We're delighted to have you{" "}
          <span className="text-indigo-600">Here! :)</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Welcome to our bookstore! Browse our collection of amazing books.
        </p>
        <Link to="/">
          <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      {/* Book Grid Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {book?.map((item) => (
          <Cards key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Course;
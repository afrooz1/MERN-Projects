import React from "react";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 text-center">
          About Us
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">BookStoreApp</span>,
          your go-to destination for discovering and exploring a wide range of
          books. We are passionate about connecting readers with their next
          favorite book.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our mission is to make reading accessible and enjoyable for
              everyone. We strive to provide a diverse collection of books across
              all genres, ensuring there's something for every reader.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Our Story
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Founded in 2024, BookStoreApp started as a small project to help
              book lovers discover new reads. Over time, we've grown into a
              platform that connects readers with authors and publishers
              worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Why Choose Us?
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>Wide selection of books across all genres</li>
              <li>User-friendly platform for seamless browsing</li>
              <li>Affordable prices and exclusive deals</li>
              <li>Dedicated customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
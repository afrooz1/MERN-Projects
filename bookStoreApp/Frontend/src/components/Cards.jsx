import React from "react";

function Cards({ item }) {
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border dark:border-gray-700">
          {/* Book Image */}
          <figure>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
          </figure>

          {/* Card Body */}
          <div className="card-body">
            {/* Book Title and Category */}
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>

            {/* Book Description */}
            <p className="text-gray-600 dark:text-gray-300">{item.title}</p>

            {/* Price and Buy Now Button */}
            <div className="card-actions justify-between items-center mt-4">
              <div className="badge badge-outline text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400">
                ${item.price}
              </div>
              <button className="px-4 py-2 rounded-full border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-white transition duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
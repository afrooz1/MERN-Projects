import React, { useState } from "react";

function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponseMessage("");

    const formData = { fullName, email, message };

    try {
      const response = await fetch("http://localhost:4001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setFullName("");
        setEmail("");
        setMessage("");
      } else {
        setResponseMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setResponseMessage("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Have questions or feedback? Fill out the form below, and we'll get back to you soon.
        </p>

        {responseMessage && (
          <div className="mb-4 text-center text-green-600 dark:text-green-400">
            {responseMessage}
          </div>
        )}

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:text-white dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:text-white dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
            <textarea
              placeholder="Enter your message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:text-white dark:border-gray-700"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;

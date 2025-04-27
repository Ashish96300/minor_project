
// components/Contact/Contact.jsx
// components/Contact/Contact.jsx
import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4 py-12">
      <div className="bg-[#1f1f1f] w-full max-w-lg rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Contact Us 🐾</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          We'd love to hear from you. Whether it's a question, suggestion, or a warm hello!
        </p>
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

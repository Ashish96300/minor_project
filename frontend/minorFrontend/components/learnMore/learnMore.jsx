
// components/LearnMore/LearnMore.jsx
import React from 'react';

function LearnMore() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to bg-gray-800 px-4 py-10">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-orange-700 mb-4">Learn More About Little Paws 🐶</h1>
        <p className="text-lg text-gray-50 mb-6">
          At Little Paws, we're committed to giving every stray and abandoned animal a second chance. We believe love and care can change lives. Learn how we rescue, rehabilitate, and rehome animals — and how you can help!
        </p>
        <a
          href="/contact"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-xl transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default LearnMore;

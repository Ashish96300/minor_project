import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-700 py-8">
      <div className="container mx-auto px-4 text-center">
        
        {/* Copyright */}
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} Little Paw's. All rights reserved.
        </p>

        {/* Navigation Links */}
        <div className="mb-4">
          <Link to="/about" className="text-gray-400 hover:text-white mx-2">
            About
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-white mx-2">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-4 mt-4">
          {[
            { href: "https://www.youtube.com", img: "/youtube.png", label: "YouTube" },
            { href: "https://www.twitter.com", img: "/twitter.png", label: "Twitter" },
            { href: "https://www.whatsapp.com", img: "/whatsapp.png", label: "WhatsApp" },
            { href: "https://www.instagram.com", img: "/instagram.png", label: "Instagram" },
          ].map(({ href, img, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition duration-300"
            >
              <img src={img} alt={label} className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

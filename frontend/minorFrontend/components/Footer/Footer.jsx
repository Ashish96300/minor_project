import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-700 text-center py-6 h-26">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Little Paw's .All rights reserved.
        </p>
        <div className="mt-2">
          <Link to="/about" className="text-gray-400 hover:text-white mx-2">About</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white mx-2">Contact</Link>
          
        </div>
      </div>
    </footer>
  );
}


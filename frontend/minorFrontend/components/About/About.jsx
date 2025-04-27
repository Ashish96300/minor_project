
import React from "react";

export default function About() {
  return (
    <section className="bg-slate-800 text-slate-100 min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 border-b border-gray-600 pb-2">About Little Paws</h1>
        <p className="text-slate-300 leading-relaxed mb-6">
          Little Paws is a platform dedicated to bridging the gap between animals in need and kind-hearted people who want to help. Whether it's through adoption, donations, or volunteering — we're building a compassionate community for animal welfare.
        </p>
        <p className="text-slate-400 leading-relaxed">
          We believe in transparency, love, and second chances. Our mission is to make it easier for everyone to contribute toward a better world for animals — one paw at a time.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Our Vision</h2>
          <p className="text-slate-300">
            A world where every animal has a home, is treated with care, and lives without cruelty.
          </p>
        </div>
      </div>
    </section>
  );
}

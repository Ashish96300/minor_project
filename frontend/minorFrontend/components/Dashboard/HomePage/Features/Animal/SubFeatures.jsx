import React from "react";

export function PutForAdoption() {
  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Put for Adoption</h1>
      <form className="bg-gray-800 p-6 rounded-xl space-y-4 max-w-xl mx-auto">
        <input placeholder="Animal Name" className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="number" placeholder="Age" className="w-full p-2 rounded bg-gray-700 text-white" />
        <input placeholder="Species (Dog/Cat etc.)" className="w-full p-2 rounded bg-gray-700 text-white" />
        <input placeholder="Location" className="w-full p-2 rounded bg-gray-700 text-white" />
        <textarea placeholder="Description" className="w-full p-2 rounded bg-gray-700 text-white"></textarea>
        <input type="file" className="w-full text-white" />
        <button className="bg-pink-500 hover:bg-pink-600 w-full p-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export function AdoptPet() {
  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Adopt a Pet</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        <input placeholder="Species" className="bg-gray-800 p-2 rounded" />
        <input placeholder="Age" className="bg-gray-800 p-2 rounded" />
        <input placeholder="Location" className="bg-gray-800 p-2 rounded" />
        <button className="bg-pink-500 px-4 py-2 rounded">Filter</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Sample cards */}
        <div className="bg-gray-800 p-4 rounded shadow text-center">
          <img src="/dog.jpg" alt="Dog" className="rounded mb-2" />
          <h2 className="text-lg font-bold">Bruno</h2>
          <p className="text-sm">3 years, Dog, Delhi</p>
        </div>
      </div>
    </div>
  );
}
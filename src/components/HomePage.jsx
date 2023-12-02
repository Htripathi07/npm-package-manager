import React, { useState } from "react";

import { Button, Label } from "./Reusable";
import { useThrottle } from "./throttle";

const Homepage = () => {
  const [query, setQuery] = useState("");
  const throttle = useThrottle(query);
  const [selectPKG, setSelectPKG] = useState("");
  const [favReason, setFavReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSubmit = () => {
    if (!selectPKG) {
      setErrorMessage("Please select a package from the list.");
      return;
    }
    if (!favReason.trim()) {
      setErrorMessage("Please enter a reason why this is your favorite.");
      return;
    }
    setErrorMessage("");
    setShowConfirmationModal(true);
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmationModal(false);
    if (confirmed) {
      const existingFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const newFavorite = { result: selectPKG, reason: favReason };
      existingFavorites.push(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(existingFavorites));
      alert("Package added to favorites!");

      // Reset form data
      setQuery("");
      setSelectPKG("");
      setFavReason("");
    }
  };

  return (
    <div className="w-4/5 m-auto py-10">
      <div className="mb-4">
        <Label text={"Search For NPM Packages"} />
        <input
          type="text"
          className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm"
          placeholder="Search here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <Label text={"Results"} />
        <div className="h-52 overflow-y-auto border border-gray-200 rounded-md">
          {throttle?.map((pkg, i) => (
            <label key={i} className="block p-2 hover:bg-gray-50">
              <input
                type="radio"
                name="package"
                value={pkg.package.name}
                className="mr-1.5"
                onChange={(e) => setSelectPKG(e.target.value)}
                checked={selectPKG === pkg.package.name}
              />
              {pkg.package.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Label text={"Why is this your favorite?"} />
        <textarea
          rows={4}
          className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm"
          placeholder="Enter your reason here..."
          value={favReason}
          onChange={(e) => setFavReason(e.target.value)}
        />
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>

      <div className="flex justify-end mt-5 gap-2">
        <Button
          classname="w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
          text={"Submit"}
          handleSubmit={handleSubmit}
        />
      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="mb-4">Are you sure you want to submit?</p>
            <div className="flex justify-between gap-2">
              <Button
                text="No"
                classname="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                handleSubmit={() => handleConfirmation(false)}
              />
              <Button
                text="Yes"
                classname="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                handleSubmit={() => handleConfirmation(true)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;

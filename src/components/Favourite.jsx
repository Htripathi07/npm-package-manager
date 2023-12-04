import { faEdit, faEye, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "./Reusable";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedReason, setUpdatedReason] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [viewDescriptionIndex, setViewDescriptionIndex] = useState(null); // New state for description visibility
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const handleToggleEditing = (index) => {
    setEditingIndex(index);
    setUpdatedReason(favorites[index].reason);
  };

  const handleEditConfirm = () => {
    const updatedFavorites = [...favorites];
    updatedFavorites[editingIndex].reason = updatedReason;
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setEditingIndex(null);
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
  };

  const handleConfirmation = (confirmed) => {
    setShowDeleteConfirmation(false);
    if (confirmed) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(deleteIndex, 1);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setDeleteIndex(null);
    }
  };

  const handleSubmit = () => {
    navigate("/");
  };

  const toggleDescriptionVisibility = (index) => {
    setViewDescriptionIndex(viewDescriptionIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Favourite NPM Packages</h1>
        <Button
          classname="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          text="Add Fav"
          handleSubmit={handleSubmit}
        />
      </div>
      <ul className="border border-gray-300 rounded shadow">
        <li className="grid grid-cols-4 bg-gray-100 p-2 font-bold">
          <div>Sr. No.</div>
          <div style={{ marginLeft: '-100px' }}>Package Name</div>
          <div>Why Favourite?</div>
          <div className="flex items-center justify-center space-x-2">
            Actions
          </div>
        </li>
        {favorites.map((fav, index) => (
          <li key={index} className="grid grid-cols-4 items-center p-2 border-t">
            <div>{index + 1}</div>
            <div style={{ marginLeft: '-100px' }}>{fav.result}</div>
            <div>
              {viewDescriptionIndex === index && <div>{fav.reason || "No description"}</div>}
            </div>
            <div className="flex items-center justify-center space-x-2">
            <FontAwesomeIcon
                icon={faEye}
                onClick={() => toggleDescriptionVisibility(index)}
                className="cursor-pointer"
                title="View Description"
              />
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleToggleEditing(index)}
                className="cursor-pointer"
                title="Edit Reason"
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDelete(index)}
                className="cursor-pointer"
                title="Delete"
              />
          
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Reason Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white p-4 rounded shadow-lg"
            style={{ width: "400px", height: "180px" }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold flex items-center">
                Edit <span className="ml-2"><FontAwesomeIcon icon={faEdit} /></span>
              </h3>
              <FontAwesomeIcon
                icon={faTimes}
                onClick={handleEditCancel}
                className="cursor-pointer"
              />
            </div>
            <input
              type="text"
              value={updatedReason}
              onChange={(e) => setUpdatedReason(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full mt-3"
            />
            <div className="flex justify-between space-x-2 mt-5">
              <Button
                text="Cancel"
                classname="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                handleSubmit={handleEditCancel}
              />
              <Button
                text="Confirm"
                classname="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                handleSubmit={handleEditConfirm}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">
              Are you sure you want to delete this package?
            </p>
            <div className="flex justify-between">
              <Button
                text="No"
                classname="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                handleSubmit={() => handleConfirmation(false)}
              />
              <Button
                text="Yes"
                classname="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                handleSubmit={() => handleConfirmation(true)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;

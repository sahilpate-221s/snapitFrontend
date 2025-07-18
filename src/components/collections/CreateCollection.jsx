import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Createcollection } from "../../services/operations/CollectionAPI"; // Ensure this is correct path

const CreateCollection = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Collection name is required.");
      return;
    }

    try {
      setLoading(true);
      const requestData = { name, description };

      // Dispatch the action and wait for the response
      const response = await dispatch(Createcollection(requestData));
      console.log("API response: ", response);
      console.log("success check kar rha hu ",response.response.data.success);

      // Check if the response is successful
      if (response.response.data.success && response.response.data.collection?._id) {
        // toast.success("Collection created successfully!");

        // Close the modal if needed
        if (onClose) onClose();

        // Navigate to the collection's posts page
        navigate(`/collection/${response.response.data.collection._id}/posts`);
      } else {
        console.error("Error: Response not as expected", response.response.data.message);
        toast.error(response.response.data.message || "Failed to create collection.");
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 w-full mx-auto">
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md p-6 md:p-8">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl transition-all"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Create Collection
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Collection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter collection name"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black"
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full mt-6 py-3 rounded-lg text-white font-medium transition-all ${name.trim() && !loading ? "bg-black hover:bg-gray-900" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!name.trim() || loading}
          >
            {loading ? "Creating..." : "Create Collection"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCollection;

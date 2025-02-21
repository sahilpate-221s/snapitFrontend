import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addPostCollection } from "../../services/operations/CollectionAPI"; // Ensure correct import path
import camera from "../../assets/camera.png"; // Ensure correct import path
import { useNavigate, useParams } from "react-router-dom";

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const AddPost = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection and image preview
  const handleFileChange = async (e) => {
    const filesList = e.target.files;
    const newFiles = Array.from(filesList);
    const newPreviews = [];

    for (const file of newFiles) {
      const dataUrl = await readFileAsDataURL(file);
      newPreviews.push(dataUrl);
    }

    setFiles([...files, ...newFiles]);
    setImagePreview([...imagePreview, ...newPreviews]);
  };

  // Remove image from the preview and file list
  const handleRemoveImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = imagePreview.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setImagePreview(updatedPreviews);
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    setLoading(true);

    try {
      // Create FormData object to send files
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file); // Ensure the field name matches the backend
      });

      // Dispatch the action to upload the files
      const response = await dispatch(addPostCollection(collectionId, formData));

      if (response?.success) {
        // toast.success("Images uploaded successfully!");
        setFiles([]);
        setImagePreview([]);
        navigate("/collection/all-Collections");
      } else {
        toast.error(response?.message || "Failed to upload images.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white flex flex-col items-center justify-center p-6 space-y-10">
      {/* Header Section */}
      <h1 className="text-4xl font-diphylleia text-gray-800 text-center">
        Add Images to Your Collection
      </h1>
      <p className="text-xl text-gray-600 text-center">Upload images to your collection.</p>

      {/* Image Upload Section */}
      {imagePreview.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <img
            src={camera}
            alt="Add Images"
            className="w-64 h-64 object-cover rounded-md shadow-xl"
          />
          <p className="text-lg text-gray-600">No images yet! Add some to get started.</p>
          <label className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-700">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            + Add Image
          </label>
        </div>
      ) : (
        <>
          {/* Image Preview */}
          <div className="mt-8 w-full flex flex-wrap justify-center gap-4 p-4">
            {imagePreview.map((url, index) => (
              <div key={index} className="relative group transform transition-all duration-300 hover:scale-105">
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-md shadow-lg"
                />
                {/* Remove Image Button */}
                <button
                  className="absolute top-1 right-1 text-gray-300 hover:text-gray-600 text-md"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <form className="mt-6 w-full flex items-center justify-center" onSubmit={handleSubmit}>
            <button
              type="submit"
              className={`bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading} // Disable while loading
            >
              {loading ? "Uploading..." : "Upload Images"}
            </button>
          </form>
        </>
      )}

      {/* Floating Add Image Button */}
      <label className="fixed bottom-8 right-8 bg-black text-white p-5 rounded-full shadow-xl cursor-pointer hover:bg-gray-700">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <FaPlus size={25} />
      </label>
    </div>
  );
};

export default AddPost;

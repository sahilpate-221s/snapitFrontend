import React, { useState, useRef } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../services/operations/PostAPI";

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.posts);

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

  const handleRemoveImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = imagePreview.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setImagePreview(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !tag || files.length === 0) {
      toast.error("Please fill all fields and select images.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tag", tag);

      files.forEach((file) => formData.append("images", file));

      const response = await dispatch(createPost(formData, posts));

      if (response?.success) {
        navigate("/");
      } else {
        toast.error(response?.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container w-full max-w-4xl bg-white border p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-diphylleia text-gray-800 text-center mb-8">
          Create a Post
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Image Upload Section */}
          <div className="flex flex-col items-center w-full md:w-1/2 p-6 bg-gray-50 rounded-lg shadow-md">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-48 bg-gray-200 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              <FaPlus size={24} className="text-gray-500 mb-2" />
              <p className="text-gray-600 font-diphylleia">Click to upload</p>
              <p className="mt-1 text-sm text-gray-400">
                High-quality .jpg files, less than 10MB.
              </p>
            </label>
            {imagePreview.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-4 w-full">
                {imagePreview.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Fields Section */}
          <div className="flex flex-col w-full md:w-1/2 space-y-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none font-caveat focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none font-caveat focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
            <input
              type="text"
              placeholder="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none font-caveat focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className={`p-3 text-white rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-400 via-gray-600 to-gray-700 hover:from-gray-700 hover:via-gray-500 hover:to-gray-600"
              }`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

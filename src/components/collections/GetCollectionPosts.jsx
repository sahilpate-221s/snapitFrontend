import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../common/Loading";
import { toast } from "react-toastify";
import TiltedCard from '../../AnimationsFile/TiltedCard';
import { FaPlus, FaTrash } from "react-icons/fa";
import { addPostCollection } from "../../services/operations/CollectionAPI"; // Ensure correct import path
import camera from "../../assets/camera.png"; // Ensure correct import path

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const GetCollectionPosts = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const [collection, setCollection] = useState(null);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const { collections, loading: collectionsLoading, error } = useSelector((state) => state.collections);

  useEffect(() => {
    const selectedCollection = collections.find((coll) => coll._id === collectionId);
    setCollection(selectedCollection);
  }, [collectionId, collections]);

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
        toast.success("Images uploaded successfully!");
        setFiles([]);
        setImagePreview([]);
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

  if (!collection) {
    return <p className="text-gray-500 text-lg">Collection not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-16 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4 font-diphylleia">
        {collection.name} - Images
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-10 font-caveat">
        All images in this collection.
      </p>

      {/* Show Loading State */}
      {collectionsLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-lg">{toast.error(error)}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {collection.posts.map((post) => {
            return post.images.map((image, index) => (
              <div key={index} className="relative">
                <TiltedCard
                  imageSrc={image.url}
                  altText={`Image ${index + 1}`}
                  captionText={`${collection.name}`}
                  containerHeight="300px"
                  containerWidth="280px"
                  imageHeight="300px"
                  imageWidth="280px"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </div>
            ));
          })}
        </div>
      )}

      {/* Image Upload Section */}
      <div className="mt-8 w-full flex flex-wrap justify-center gap-4 p-4">
        {imagePreview.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            
            {/* <label className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-700">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              + Add Image
            </label>
             */}

             <></>
          </div>
        ) : (
          <div>
            {/* Image Preview */}
            <div className="flex flex-wrap justify-center gap-4 p-4">
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
          </div>
        )}
      </div>

      {/* Floating Add Image Button */}
      <label className="fixed bottom-8 right-8 bg-black text-white p-5 rounded-full shadow-xl cursor-pointer hover:bg-gray-700
      
      ">
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

export default GetCollectionPosts;

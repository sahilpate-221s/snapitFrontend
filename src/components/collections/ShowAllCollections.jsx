import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCollection } from "../../services/operations/CollectionAPI.js"; // Ensure correct path
import { Loading } from "../common/Loading"; // Ensure this exists
import { toast } from "react-toastify";

const ShowAllCollections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get collections & user data from Redux
  const { collections, loading, error } = useSelector((state) => state.collections);
  const { user } = useSelector((state) => state.profile); // Ensure this slice exists in Redux

  // Fetch collections on component mount
  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  // 🔥 Debugging: Check user data in console
  console.log("User:", user);
  console.log("Collections:", collections);

  // **Ensure user is available before filtering**
  const userCollections = user
    ? collections.filter((collection) => collection.createdBy === user._id)
    : [];

  // Handle Card Click to redirect to a page showing all images
  const handleCardClick = (collectionId) => {
    navigate(`/collection/${collectionId}/images`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-16 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
        Your Collections
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-10">
        Handpicked by you for those who appreciate design at its finest.
      </p>

      {/* Show Loading State */}
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-lg">{toast.error(error)}</p>
      ) : userCollections.length === 0 ? (
        <p className="text-gray-500 text-lg">You have not created any collections yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {userCollections.map((collection) => {
            // Extract first image from posts array for collection thumbnail
            const collectionImage =
              collection.posts?.[0]?.images?.[0]?.url ||
              "https://via.placeholder.com/600x400/000000/FFFFFF?text=No+Image";

            return (
              <div
                key={collection._id}
                onClick={() => handleCardClick(collection._id)}
                className="group bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative w-full h-60">
                  <img
                    src={collectionImage}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold">
                    {collection.name}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5">
                  <p className="text-gray-700 text-sm">{collection.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowAllCollections;

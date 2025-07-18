import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/operations/ProfileAPI";

const ProfileUpdate = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    password: "",
    oldPassword: "",
    profilePicture: null,
  });

  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("bio", formData.bio);
      data.append("password", formData.password);
      data.append("oldPassword", formData.oldPassword);
      if (formData.profilePicture) {
        data.append("profilePicture", formData.profilePicture);
      }
      const result = await dispatch(updateProfile(data));
      console.log("Update profile result:", result);
      if (result.success) {
        // Update local formData with updated user data to reflect changes immediately
        setFormData({
          name: result.user.name || "",
          email: result.user.email || "",
          bio: result.user.bio || "",
          password: "",
          oldPassword: "",
          profilePicture: null,
        });
        onClose();
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleDeleteAccount = () => {
    setIsDeleteConfirmVisible(true);
  };

  const confirmDeleteAccount = () => {
    // Handle account deletion logic here
    console.log("Account deleted");
    onClose(); // Close the modal after deletion
  };

  const cancelDeleteAccount = () => {
    setIsDeleteConfirmVisible(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Card */}
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-lg md:max-w-2xl lg:max-w-3xl overflow-hidden my-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-transparent text-gray-600 hover:text-gray-800 rounded-full p-2 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Update Your Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-36 h-36 rounded-full border-2 border-gray-300 bg-gray-100 overflow-hidden shadow-lg transition-all hover:shadow-2xl">
              {formData.profilePicture ? (
                <img
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm font-medium">
                  No Image
                </div>
              )}
              <label
                htmlFor="profilePicture"
                className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-800 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 11l5 5m2-12H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-.586-1.414l-2-2A2 2 0 0014 5H9z"
                  />
                </svg>
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-600">Upload a new profile picture</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Tell us a bit about yourself"
              ></textarea>
            </div>

            {/* Old Password */}
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your old password"
              />
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter a new password"
              />
            </div>

            {/* Save Changes Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gradient-to-r hover:from-gray-800 hover:via-gray-600 hover:to-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="text-center mt-6">
          <button
            onClick={handleDeleteAccount}
            className="w-full py-3 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation */}
      {isDeleteConfirmVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xs">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
            <p className="text-sm text-gray-600 mb-4">This action cannot be undone.</p>
            <div className="flex space-x-4">
              <button
                onClick={confirmDeleteAccount}
                className="w-1/2 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDeleteAccount}
                className="w-1/2 py-2 bg-gray-300 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfileUpdate;

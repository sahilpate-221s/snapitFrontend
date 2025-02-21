// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   fetchAllPosts,
//   deletePost,
//   fetchSinglePost,
//   deleteComment,
//   addComment,
// } from "../../../services/operations/PostAPI";
// import UserPostCard from "./UserPostCard"; // Modal for post details
// import { setSelectedPost } from "../../../slices/postSlice"; // Redux action to set the selected post
// import { Loading } from "../../common/Loading"; // Loading spinner
// import Footer from "../../common/Footer";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.profile.user); // User profile
//   const posts = useSelector((state) => state.posts.posts || []); // Posts list
//   const selectedPost = useSelector((state) => state.posts.selectedPost); // Selected post for modal
//   const [loading, setLoading] = useState(false); // Loading state

//   // Fetch posts on mount
//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         setLoading(true);
//         await dispatch(fetchAllPosts());
//       } catch (error) {
//         toast.error("Failed to load posts. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPosts();
//   }, [dispatch]);

//   // Filter posts created by the user
//   const userPosts = posts.filter((post) => post.createdBy === user._id);

//   // Open post details in a modal
//   const handlePostClick = async (post) => {
//     try {
//       await dispatch(fetchSinglePost(post._id));
//       dispatch(setSelectedPost(post));
//     } catch (error) {
//       toast.error("Failed to load post details.");
//     }
//   };

//   // Close the modal
//   const closeModal = () => {
//     dispatch(setSelectedPost(null));
//   };

//   // Handle delete post
//   const handleDeletePost = async (postId) => {
//     try {
//       await dispatch(deletePost(postId));
//       toast.success("Post deleted successfully.");
//       closeModal(); // Close modal after deletion
//     } catch (error) {
//       toast.error("Failed to delete post. Please try again.");
//     }
//   };

//    const handleAddComment = (postId, commentText) => {
//       dispatch(addComment(postId, commentText,posts)); // Dispatch addComment action
//       // toast.success("comment addded successfully.");
//     };

//     const handleDeleteComment = (postId, commentId) => {
//         dispatch(deleteComment(postId, commentId,posts)); // Dispatch deleteComment action
//       };

//   return (
//     <div className="min-h-screen bg-gray-50 w-11/12 mx-auto p-6">
//       {/* Profile Header */}
//       <div className="bg-white shadow-lg rounded-b-2xl mb-6">
//         <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-8">
//           {/* User Info */}
//           <div className="flex items-center space-x-6">
//             <img
//               src={user.profilePicture || "/placeholder-profile.png"}
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-4 border-gray-300"
//             />
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-800">
//                 {user.name}
//               </h1>
//               <p className="text-gray-600">@{user.name}</p>
//               <p className="mt-2 text-lg text-gray-700">{user.bio}</p>
//               <Link
//                 to="/edit-profile"
//                 className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg hover:from-gray-500 hover:to-gray-700 transition"
//               >
//                 Edit Profile
//               </Link>
//             </div>
//           </div>

//           {/* User Stats */}
//           <div className="flex space-x-8">
//             <div className="text-center">
//               <p className="text-xl font-bold text-gray-800">
//                 {user.followers > 0 ? user.followers : 0}
//               </p>
//               <p className="text-sm text-gray-500">Followers</p>
//             </div>
//             <div className="text-center">
//               <p className="text-xl font-bold text-gray-800">
//                 {user.following > 0 ? user.following : 0}
//               </p>
//               <p className="text-sm text-gray-500">Following</p>
//             </div>
//             <div className="text-center">
//               <p className="text-xl font-bold text-gray-800">
//                 {userPosts.length}
//               </p>
//               <p className="text-sm text-gray-500">Posts</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Posts Section */}
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Posts</h2>

//         {loading ? (
//           <Loading />
//         ) : userPosts.length === 0 ? (
//           <p className="text-center text-lg text-gray-600">
//             You have no posts yet!
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
//             {userPosts.map((post) => (
//               <div
//                 key={post._id}
//                 className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
//                 onClick={() => handlePostClick(post)}
//               >
//                 <img
//                   src={post.images[0]?.url || "/placeholder.png"}
//                   alt={post.title}
//                   className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
//                   <p className="text-white text-lg font-semibold">
//                     {post.title}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal for Post Details */}
//       {selectedPost && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-30 "
//           onClick={closeModal} // Close modal on click outside
//         >
//           <div
//             className="bg-white sm:p-0 h-[85%] md:h-96 lg:h-[31rem] xl:h-[44rem]  p-4 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg flex lg:my-auto md:overflow-hidden"
//             onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
//           >
//             <UserPostCard
//               post={selectedPost}
//               onDeletePost={handleDeletePost}
//               onDeleteComment={handleDeleteComment}
//               onAddComment ={handleAddComment}
//               onClose={closeModal}
//             />
            

//           </div>
//         </div>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchAllPosts,
  deletePost,
  fetchSinglePost,
  deleteComment,
  addComment,
} from "../../../services/operations/PostAPI";
import UserPostCard from "./UserPostCard"; // Modal for post details
import { setSelectedPost } from "../../../slices/postSlice"; // Redux action to set the selected post
import { Loading } from "../../common/Loading"; // Loading spinner
import Footer from "../../common/Footer";
import ProfileUpdate from "../../../pages/ProfileUpdate"; // Profile Update Modal

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user); // User profile
  const posts = useSelector((state) => state.posts.posts || []); // Posts list
  const selectedPost = useSelector((state) => state.posts.selectedPost); // Selected post for modal
  const [loading, setLoading] = useState(false); // Loading state
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit profile modal

  // Fetch posts on mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        await dispatch(fetchAllPosts());
      } catch (error) {
        toast.error("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [dispatch]);

  // Filter posts created by the user
  const userPosts = posts.filter((post) => post.createdBy === user._id);

  // Open post details in a modal
  const handlePostClick = async (post) => {
    try {
      await dispatch(fetchSinglePost(post._id));
      dispatch(setSelectedPost(post));
    } catch (error) {
      toast.error("Failed to load post details.");
    }
  };

  // Close the post modal
  const closePostModal = () => {
    dispatch(setSelectedPost(null));
  };

  // Handle delete post
  const handleDeletePost = async (postId) => {
    try {
      await dispatch(deletePost(postId));
      toast.success("Post deleted successfully.");
      closePostModal(); // Close modal after deletion
    } catch (error) {
      toast.error("Failed to delete post. Please try again.");
    }
  };

  const handleAddComment = (postId, commentText) => {
    dispatch(addComment(postId, commentText, posts)); // Dispatch addComment action
  };

  const handleDeleteComment = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId, posts)); // Dispatch deleteComment action
  };

  return (
    <div className="min-h-screen bg-gray-50 w-11/12 mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-b-2xl mb-6">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-8">
          {/* User Info */}
          <div className="flex items-center space-x-6">
            <img
              src={user.profilePicture || "/placeholder-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-300"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h1>
              <p className="text-gray-600">@{user.name}</p>
              <p className="mt-2 text-lg text-gray-700">{user.bio}</p>
              <button
                onClick={() => setEditModalOpen(true)} // Open the ProfileUpdateModal
                className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-lg hover:from-gray-500 hover:to-gray-700 transition"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Stats */}
          <div className="flex space-x-8">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">
                {user.followers > 0 ? user.followers : 0}
              </p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">
                {user.following > 0 ? user.following : 0}
              </p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">
                {userPosts.length}
              </p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Posts</h2>

        {loading ? (
          <Loading />
        ) : userPosts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            You have no posts yet!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
            {userPosts.map((post) => (
              <div
                key={post._id}
                className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                onClick={() => handlePostClick(post)}
              >
                <img
                  src={post.images[0]?.url || "/placeholder.png"}
                  alt={post.title}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">
                    {post.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Post Details */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-30"
          onClick={closePostModal} // Close modal on click outside
        >
          <div
            className="bg-white sm:p-0 h-[85%] md:h-96 lg:h-[31rem] xxl:h-[44rem] p-4 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg flex lg:my-auto md:overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <UserPostCard
              post={selectedPost}
              onDeletePost={handleDeletePost}
              onDeleteComment={handleDeleteComment}
              onAddComment={handleAddComment}
              onClose={closePostModal}
            />
          </div>
        </div>
      )}

      {/* Profile Update Modal */}
      {editModalOpen && (
        <ProfileUpdate
          isOpen={editModalOpen} // Pass isOpen prop as the state value
          onClose={() => setEditModalOpen(false)} // Close modal on button click
        />
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;

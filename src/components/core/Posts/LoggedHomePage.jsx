import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  fetchAllPosts,
  likePost,
  addComment,
  deleteComment,
  deletePost,
  fetchSinglePost,
} from "../../../services/operations/PostAPI";
import { Loading } from "../../common/Loading";
import Masonry from "react-masonry-css";
import PostCard from "./PostCard";
import { setSelectedPost } from "../../../slices/postSlice";
import { clearToken } from "../../../slices/authSlice";
import { motion } from "framer-motion";

const LoggedHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize Redux state selectors to prevent unnecessary re-renders
  const user = useSelector((state) => state.profile.user, shallowEqual);
  const posts = useSelector((state) => state.posts.posts || [], shallowEqual);
  const selectedPost = useSelector((state) => state.posts.selectedPost, shallowEqual);
  const token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(false);

  // Memoized token expiry check
  const isTokenExpired = useMemo(() => {
    return token && token.expiry < Date.now();
  }, [token]);

  useEffect(() => {
    if (isTokenExpired) {
      dispatch(clearToken());
      toast.error("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [dispatch, isTokenExpired, navigate]);

  // Load posts when the component mounts
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        await dispatch(fetchAllPosts());
      } catch (error) {
        toast.error("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [dispatch]);

  // Open modal with post details
  const handleImageClick = useCallback(async (post) => {
    await dispatch(fetchSinglePost(post._id));
    dispatch(setSelectedPost(post));
  }, [dispatch]);

  // Close the modal
  const closeModal = useCallback(() => {
    dispatch(setSelectedPost(null));
  }, [dispatch]);

  // Handle like action
  const handleLike = useCallback(async (postId, isLiked) => {
    try {
      await dispatch(likePost(postId, isLiked, posts, user._id));
    } catch (error) {
      console.error("Error in handleLike:", error);
    }
  }, [dispatch, posts, user]);

  // Handle adding a comment
  const handleAddComment = useCallback((postId, commentText) => {
    dispatch(addComment(postId, commentText, posts));
  }, [dispatch, posts]);

  // Handle deleting a comment
  const handleDeleteComment = useCallback((postId, commentId) => {
    dispatch(deleteComment(postId, commentId, posts));
  }, [dispatch, posts]);

  // Handle deleting a post
  const handleDeletePost = useCallback((postId) => {
    dispatch(deletePost(postId));
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      {/* Content Section */}
      <div className="container min-h-screen w-11/12 max-w-screen-lg mx-auto">
        {loading ? (
          <Loading />
        ) : posts.length > 0 ? (
          <Masonry
            breakpointCols={{ default: 5, 1100: 3, 700: 2, 500: 1 }}
            className="my-masonry-grid mx-auto"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post) => (
              <div key={post._id} className="bg-white shadow-lg rounded-lg mb-6">
                {post.images?.length > 0 && (
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    onClick={() => handleImageClick(post)}
                  >
                    <img
                      src={post.images[0].url}
                      alt={post.title}
                      className="w-full object-cover rounded-lg cursor-pointer"
                    />
                    {post.images.length > 1 && (
                      <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                        {post.images.length} images
                      </span>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </Masonry>
        ) : (
          <p className="text-center text-gray-600">No posts available at the moment.</p>
        )}
      </div>

      {/* Modal for Full Post Details */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto z-30"
          onClick={closeModal}
        >
          <div
            className="bg-white sm:p-0 h-[85%] md:h-96 lg:h-[31rem] xxl:h-[44rem]  p-4 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg flex lg:my-auto md:overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <PostCard
              post={selectedPost}
              onLike={handleLike}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              onDeletePost={handleDeletePost}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedHomePage;

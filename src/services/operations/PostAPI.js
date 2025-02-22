import { useSelector } from "react-redux";
import { postEndpoints } from "../apis";
import { toast } from "react-toastify";
import axios from "axios";
import { setSelectedPost, setPosts } from "../../slices/postSlice";
import { Navigate } from "react-router-dom";

const {
  NEW_POST_API,
  ALL_POSTS_API,
  SINGLE_POST_API,
  DELETE_POST_API,
  UPDATE_POST_API,
  ADD_COMMENT_API,
  REACT_TO_POST_API,
  DELETE_COMMENT_API,
} = postEndpoints;

// Function to get authentication headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Create Post
export const createPost = (formData) => {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Creating post...");
    try {
      const response = await axios.post(NEW_POST_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeaders(),
        },
        withCredentials: true,
      });

      const { success, post, message } = response?.data;

      if (success) {
        const { posts } = getState().posts;
        dispatch(setPosts([post, ...posts]));
        toast.success(message || "Post created successfully!");
        return { success: true };
      } else {
        toast.error(message || "Failed to create post.");
        return { success: false, message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      toast.dismiss(toastId);
    }
  };
};

// ✅ Fetch All Posts
export const fetchAllPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(ALL_POSTS_API, {
        headers: getAuthHeaders(),
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch posts");
      }

      dispatch(setPosts(response.data.posts));
    } catch (error) {
      console.error("Error in fetchAllPosts:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
};

// ✅ Fetch Single Post
export const fetchSinglePost = (postId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(SINGLE_POST_API(postId), {
        headers: getAuthHeaders(),
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch post");
      }

      dispatch(setSelectedPost(response.data.post));
      return response.data;
    } catch (error) {
      console.error("Error in fetchSinglePost:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
};

// ✅ Delete Post
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(DELETE_POST_API(postId), {
        headers: getAuthHeaders(),
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete post");
      }

      toast.success("Post deleted successfully!");
      dispatch(fetchAllPosts());
    } catch (error) {
      console.error("Error in deletePost:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
};

// ✅ Update Post
export const updatePost = (postId, formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(UPDATE_POST_API(postId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeaders(),
        },
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update post");
      }

      toast.success("Post updated successfully!");
      dispatch(fetchAllPosts());
    } catch (error) {
      console.error("Error in updatePost:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
};

// ✅ Add Comment
export const addComment = (postId, commentText, posts) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        ADD_COMMENT_API(postId),
        { text: commentText },
        {
          headers: getAuthHeaders(),
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add comment");
      }

      const updatedComments = response.data.post.comments;

      const updatedPosts = posts.map((p) =>
        p._id === postId ? { ...p, comments: updatedComments } : p
      );

      dispatch(setPosts(updatedPosts));
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error in addComment:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
};

// ✅ Delete Comment
export const deleteComment = (postId, commentId, posts) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(DELETE_COMMENT_API(postId, commentId), {
        headers: getAuthHeaders(),
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete comment");
      }

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => comment._id !== commentId),
          };
        }
        return post;
      });

      dispatch(setPosts(updatedPosts));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error in deleteComment:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
};

// ✅ Like/Unlike Post
export const likePost = (postId, isLiked, posts, userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        REACT_TO_POST_API(postId),
        { userId, isLiked },
        {
          headers: getAuthHeaders(),
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update reaction on post");
      }

      const updatedPosts = posts.map((p) =>
        p._id === postId
          ? {
              ...p,
              likes: isLiked
                ? p.likes.filter((id) => id !== userId)
                : [...p.likes, userId],
            }
          : p
      );

      dispatch(setPosts(updatedPosts));
      toast.success(response.data.message || "Reaction updated!");
      return updatedPosts;
    } catch (error) {
      console.error("Error in likePost:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
};

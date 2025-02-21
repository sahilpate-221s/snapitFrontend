import { postEndpoints } from "../apis";
import { toast } from "react-toastify";
import axios from "axios";
import { collectionEndpoints } from "../apis";
import { Navigate } from "react-router-dom";
import { setCollections } from "../../slices/collectionSlice";

const {
  CREATE_COLLECTION_API,
  ADD_POSTS_API,
  GET_ALL_COLLECTIONS_API,
  DELTE_COLLECTION_API,
  DELTET_COLLECTION_POSTS_API,
} = collectionEndpoints;

export const Createcollection = (requestData) => {
  return async (dispatch) => {
    const toastId = toast.loading("Creating Collection...");
    try {
      const response = await axios.post(CREATE_COLLECTION_API, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("api call kiya response aaya kuch",response);

      const { success, message } = response?.data;
      if (success) {
        toast.success(message || "Collection created successfully!");
        return { response};
      } else {
        toast.error(message || "Failed to create Collection.");
        console.log("errror while calling the createCollection api", message);
        
        return {response};
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
        console.log(error);
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const addPostCollection = (collectionId, files) => {
  return async (dispatch) => {
    const toastId = toast.loading("Adding Post to Collection...");

    try {
      const formData = new FormData();

      // Append all files to the FormData
      files.forEach((file) => {
        formData.append("images", file); // Ensure field name is "images"
      });

      // Make the API request with FormData
      const response = await axios.post(ADD_POSTS_API(collectionId), formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the content type is multipart for file uploads
        },
        withCredentials: true, // Send cookies (if needed) for authenticated routes
      });

      const { success, message, post } = response?.data;

      if (success) {
        // Handle success case
        toast.success(message || "Post added to Collection successfully!");
        return { success: true, post }; // You can return the post data if needed
      } else {
        // Handle failure case
        toast.error(message || "Failed to add Post to Collection.");
        return { success: false, message };
      }
    } catch (error) {
      // Handle error during the API call
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      // Dismiss the toast after the action is completed
      toast.dismiss(toastId);
    }
  };
};


export const getCollection = () => {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching Collections...");
    try {
      const response = await axios.get(GET_ALL_COLLECTIONS_API, {
        withCredentials: true,
      });
      console.log(response.data);
      const { success, collections, message } = response?.data;
      if (success) {
        dispatch(setCollections(collections));
      } else {
        toast.error(message || "Failed to fetch Collections.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const deleteCollection = (collectionId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting Collection...");
    try {
      const response = await axios.delete(DELTE_COLLECTION_API(collectionId), {
        withCredentials: true,
      });
      const { success, message } = response?.data;
      if (success) {
        toast.success(message || "Collection deleted successfully!");
        return { success: true };
      } else {
        toast.error(message || "Failed to delete Collection.");
        return { success: false, message };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const deleteCollectionPost = (postId, collectionId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting Post from Collection...");
    try {
      const response = await axios.delete(DELTET_COLLECTION_POSTS_API, {
        data: { postId, collectionId },
        withCredentials: true,
      });
      const { success, message } = response?.data;
      if (success) {
        toast.success(message || "Post deleted from Collection successfully!");
        return { success: true };
      } else {
        toast.error(message || "Failed to delete Post from Collection.");
        return { success: false, message };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      toast.dismiss(toastId);
    }
  };
};

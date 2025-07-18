const BASE_URL = "https://snapitbackend.onrender.com";
// const BASE_URL = "http://192.168.208.80:4000/api/v1";

// auth endpoints 
export const endpoints = {
  LOGIN_API: `${BASE_URL}/user/login`,
  REGISTER_API: `${BASE_URL}/user/register`,
  LOGOUT_API: `${BASE_URL}/user/logout`,
  CHANGE_PASSWORD_API: `${BASE_URL}/user/changePassword`,
  DELETE_ACCOUNT_API: `${BASE_URL}/user/deleteAccount`,
};

// profile endpoints
export const profileEndpoints = {
  MY_PROFILE_API: `${BASE_URL}/user/myProfile`,
  USER_PROFILE_API: (userId) => `${BASE_URL}/user/${userId}`,
  FOLLOW_USER_API: (userId) => `${BASE_URL}/user/follow/${userId}`,
  UPDATE_PROFILE_API: `${BASE_URL}/user/updateProfile`,
  FOLLOWERS_AND_FOLLOWING_API: (userId) => `${BASE_URL}/user/followersAndFollowing/${userId}`,
  USER_POSTS_API: (userId) => `${BASE_URL}/user/posts/${userId}`,
  USER_COLLECTIONS_API: (userId) => `${BASE_URL}/user/collections/${userId}`,
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/user/updateDisplayPicture`,
};

// post endpoints
export const postEndpoints = {
  NEW_POST_API: `${BASE_URL}/posts/newPost`,
  ALL_POSTS_API: `${BASE_URL}/posts/allPosts`,
  SINGLE_POST_API: (postId) => `${BASE_URL}/posts/${postId}`,
  UPDATE_POST_API: (postId) => `${BASE_URL}/posts/update/${postId}`,
  DELETE_POST_API: (postId) => `${BASE_URL}/posts/${postId}`,
  ADD_COMMENT_API: (postId) => `${BASE_URL}/posts/${postId}/comments`,
  REACT_TO_POST_API: (postId) => `${BASE_URL}/posts/${postId}/reactions`,
  DELETE_COMMENT_API: (postId, commentId) => `${BASE_URL}/posts/${postId}/comments/${commentId}`,
};


// collection endpoints
export const collectionEndpoints = {
  CREATE_COLLECTION_API: `${BASE_URL}/collection/createCollection`,
  ADD_POSTS_API: (collectionId) => `${BASE_URL}/collection/${collectionId}/posts`,
  GET_ALL_COLLECTIONS_API: `${BASE_URL}/collection/all-Collections`,
  DELTE_COLLECTION_API: (collectionId) => `${BASE_URL}/collection/${collectionId}`,
  DELTET_COLLECTION_POSTS_API: `${BASE_URL}/collection/delete-posts`,
};

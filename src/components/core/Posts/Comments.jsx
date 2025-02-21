import React, { useState, useEffect } from 'react';
import { fetchSinglePost } from '../../../services/operations/PostAPI'; // Assuming this function fetches post by ID

function Comments({ post, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []); // Local state to store comments
  const [loading, setLoading] = useState(false);

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment); // Call function passed in props to add the comment

      // Reset the comment input
      setNewComment('');
    } else {
      alert("Comment cannot be empty.");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedPost = fetchSinglePost(post._id); // Fetch post by ID
        // setComments(fetchedPost.comments || []); // Update comments with fetched data
        
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (post._id) {
      fetchComments(); // Fetch comments when the post is available
    }
  }, [post._id]); // Only fetch comments when post ID changes

  return (
    <div className="h-[70%] rounded-md bg-gray-200 w-full mt-5 flex flex-col">
      <span className="p-2 font-semibold text-lg">
        {comments.length} {comments.length === 1 ? "comment" : "comments"}
      </span>

      {/* Comments List (displaying the comments in reverse order) */}
      <div className="flex-1 overflow-y-auto space-y-3 px-2 py-2">
        {loading ? (
          <div className="text-gray-600">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments
            .slice(0)
            .reverse() // Reverse the comments array to show the latest at the top
            .map((comment, index) => (
              <div key={index} className="flex items-start space-x-3 bg-gray-100 p-2 rounded-md">
                <img
                  src={comment.user.profilePicture || 'default-profile-pic-url'} // Profile picture (if available)
                  alt={comment.user.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{comment.user.name}</span>
                  <span className="text-gray-700">{comment.text}</span>
                </div>
              </div>
            ))
        ) : (
          <div className="text-gray-600">No comments yet.</div>
        )}
      </div>

      {/* Input Section for Adding Comment */}
      <div className="mt-auto p-3 bg-gray-300 rounded-md flex items-center space-x-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="h-10 w-full px-4 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Comments;

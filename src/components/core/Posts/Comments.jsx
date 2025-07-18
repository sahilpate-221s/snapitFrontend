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
    <div className="max-h-[70vh] rounded-md bg-white shadow-md w-full mt-5 flex flex-col">
      <span className="p-3 font-semibold text-lg border-b border-gray-300">
        {comments.length} {comments.length === 1 ? "comment" : "comments"}
      </span>

      {/* Comments List (displaying the comments in reverse order) */}
      <div className="flex-1 overflow-y-auto space-y-4 px-4 py-3">
        {loading ? (
          <div className="text-gray-600">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments
            .slice(0)
            .reverse() // Reverse the comments array to show the latest at the top
            .map((comment, index) => (
              <div key={index} className="flex items-start space-x-4 bg-gray-50 p-3 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <img
                  src={comment.user.profilePicture || 'default-profile-pic-url'} // Profile picture (if available)
                  alt={comment.user.name || 'User'}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{comment.user.name}</span>
                  <span className="text-gray-700">{comment.text}</span>
                </div>
              </div>
            ))
        ) : (
          <div className="text-gray-600">No comments yet.</div>
        )}
      </div>

      {/* Input Section for Adding Comment */}
      <div className="mt-auto p-4 bg-gray-100 rounded-b-md flex items-center space-x-4 border-t border-gray-300">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="h-12 w-full px-5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Post
        </button>
      </div>
    </div>
  );
}


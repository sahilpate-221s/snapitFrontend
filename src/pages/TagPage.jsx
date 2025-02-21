import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/common/Footer";
import Masonry from "react-masonry-css";

const TagPage = () => {
  const { tag } = useParams();
  const posts = useSelector((state) => state.posts.posts);

  // Filter posts by tag
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));

  return (
    <div className="min-h-screen p-8 w-11/12 mx-auto">
      {/* Page Title */}
      <h1 className="text-5xl md:text-8xl font-diphylleia text-center mb-8 md:mb-16 text-gray-900">
        {tag}
      </h1>

      {/* Masonry Layout */}
      <Masonry
        breakpointCols={{ default: 5, 1100: 3, 700: 2, 500: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredPosts.map((post, index) => (
          <div
            key={index}
            className="relative cursor-pointer group transition-all duration-300"
          >
            {/* Transparent Image with Hover Effect */}
            <div className="relative overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300 ease-in-out transform group-hover:rotate-2">
              <img
                src={post.images[0]?.url || "/placeholder.png"}
                alt={post.title}
                className="w-full object-contain rounded-xl"
                style={{
                  background: "none", // Ensures the background is removed
                }}
              />
            </div>

            {/* Overlay with localized blur effect */}
            <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-transparent to-transparent">
             
                <p className="font-caveat text-lg md:text-2xl text-white tracking-wide">
                  {post.title}
                </p>
              
            </div>
          </div>
        ))}
      </Masonry>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TagPage;

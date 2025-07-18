import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { fetchAllPosts } from "../services/operations/PostAPI";

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.posts);
  const [loading, setLoading] = useState(false);

  // Fetch posts if Redux store is empty
  useEffect(() => {
    const loadPosts = async () => {
      if (posts.length === 0) {
        setLoading(true);
        try {
          await dispatch(fetchAllPosts());
        } catch (error) {
          toast.error("Failed to load posts. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadPosts();
  }, [dispatch, posts.length]); // Fetch only if posts array is empty

  // Optimized shuffle function
  const shuffleArray = useCallback((array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }, []);

  // Memoized shuffled posts
  const shuffledPosts = useMemo(() => shuffleArray(posts).slice(0, 6), [posts, shuffleArray]);

  // Memoized function to group posts by tags
  const groupByTags = useCallback((posts) => {
    return posts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        if (!acc[tag]) acc[tag] = [];
        acc[tag].push(post);
      });
      return acc;
    }, {});
  }, []);

  // Memoized grouped tags
  const groupedTags = useMemo(() => groupByTags(posts), [posts, groupByTags]);

  // Responsive design handler
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsSmallDevice(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen to-white p-8 w-11/12 mx-auto">
      {/* Main Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-diphylleia text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        Explore The Best Content
      </motion.h1>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-600 text-xl">Loading posts...</p>
      ) : (
        <>
          {/* Featured Posts */}
          <section className="container mx-auto mb-16">
            <h2 className="text-3xl font-caveat text-center text-gray-800 mb-8">
              Featured Posts
            </h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delayChildren: 0.3, staggerChildren: 0.3, ease: "easeOut" },
                },
              }}
            >
              {shuffledPosts.map((post, index) => (
                <motion.div
                  key={post.id || index}
                  className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
                  }}
                  onClick={() => navigate(`/tags/${post.tags[0]}`)}
                >
                  <img
                    src={post.images?.[0]?.url || "/placeholder.png"}
                    alt={post.title}
                    className="w-full h-60 object-cover rounded-lg group-hover:scale-105 transition-all duration-200 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-xl font-semibold">{post.title}</h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Trending Tags */}
          <section className="container mx-auto mb-16">
            <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">Trending Tags</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {shuffleArray(Object.keys(groupedTags))
                .slice(0, 8)
                .map((tag) => (
                  <motion.div
                    key={tag}
                    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group"
                    onClick={() => navigate(`/tags/${tag}`)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <img
                      src={groupedTags[tag]?.[0]?.images?.[0]?.url || "/placeholder.png"}
                      alt={tag}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold">{tag}</h4>
                      <p className="text-sm opacity-75">{groupedTags[tag].length} posts</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>

          {/* Browse By Tags Section */}
          <section className="container mx-auto mb-16">
            <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">
              Browse by Tags
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {shuffleArray(Object.keys(groupedTags))
                .slice(0, 10)
                .map((tag, index) => (
                  <motion.div
                    key={index}
                    className="relative group w-32 h-32 rounded-full overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                    onClick={() => navigate(`/tags/${tag}`)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <img
                      src={groupedTags[tag]?.[0]?.images?.[0]?.url || "/placeholder.png"}
                      alt={tag}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {tag}
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Explore;

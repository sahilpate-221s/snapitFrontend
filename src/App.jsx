import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import All from "./pages/All";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Explore from "./pages/Explore";
import CreatePost from "./components/core/Posts/CreatePost";
import Error from "./pages/Error";
import LoggedHomePage from "./components/core/Posts/LoggedHomePage";
import Dashboard from "./components/core/Dashboard/Dashboard";
import TagPage from "./pages/TagPage";
// import Collections from "./pages/collectionSample";
import ProfileUpdate from "./pages/ProfileUpdate";
import AddPosts from "./components/collections/AddPosts";
import ShowAllCollections from "./components/collections/ShowAllCollections";
import GetCollectionPosts from "./components/collections/GetCollectionPosts";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth); // token
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <LoggedHomePage /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/tags/:tag"
          element={
            <PrivateRoute>
              <TagPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/error" element={<Error />} />
        {/* <Route path="/collections" element={<Collections />} /> */}
        <Route path="/edit-profile" element={<ProfileUpdate />} />

        {/* <Route path="/collection/:collectionId/posts" element={<AddPosts />} />
        <Route path="/collection/all-Collections" element={<ShowAllCollections/>} />
        <Route path= "/collection/:collectionId/images" element={<GetCollectionPosts />} /> */}
      </Routes>
    </div>
  );
}

export default App;

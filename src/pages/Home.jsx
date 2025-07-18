import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import div1Image from "../assets/div1Image.jpg";
import div2Image from "../assets/div2Image.jpg";
import div3Image from "../assets/div3Image.jpg";
import div4Image from "../assets/div4Image.jpg";
import div5Image from "../assets/div5Image.jpg";
import college1 from "../assets/college1.jpg";
import college2 from "../assets/college2.jpg";
import college3 from "../assets/college3.png";
import college4 from "../assets/college4.png";
import college5 from "../assets/college5.png";
import college6 from "../assets/college6.png";
import college7 from "../assets/college7.png";

import Footer from "../components/common/Footer";
import DownloadApp from "../components/common/DownloadApp";

const Home = () => {
  return (
    <div className="w-11/12 h-screen mx-auto flex flex-col my-10 items-center">
      {/* Section Title with responsive font size */}
      <section className="font-caveat text-3xl md:text-6xl text-center">
        Explore the Best Moments from <br />
        <span className="block">Campus Life</span>
      </section>

      {/* Paragraph */}
      <p className="font-diphylleia text-xs md:text-sm my-6 text-center text-gray-500">
        Share and discover vibrant memories, captured by students like you.
        <span className="block">Connect through the power of photos!</span>
      </p>

      {/* Search Box */}
      <div className="flex items-center space-x-4 mx-auto w-full ">
        <div className="relative mx-auto flex flex-row items-center">
          <input
            type="text"
            className="border w-full md:w-[30rem] lg:w-[40rem] text-xl h-10 rounded-3xl pl-4 font-diphylleia bg-gray-200 sm:mx-auto"
            placeholder="Search"
          />
          <div className="absolute right-4 text-white bg-gray-400 p-2 rounded-full">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="flex flex-col md:flex-row flex-wrap mx-auto mt-10">
      {/* First Image */}
      <div className="h-[20rem] w-[12rem] mt-4 md:m-3 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-slideUp delay-100">
        <img
          src={college2}
          alt="Campus Life 1"
          className="object-cover w-full h-full cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
        />
      </div>

      {/* Second Image */}
      <div className="h-[20rem] lg:h-[16rem] w-[12rem] mt-4 lg:mt-20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-slideUp delay-200">
        <img
          src={college5}
          alt="Campus Life 2"
          className="object-cover w-full h-full cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
        />
      </div>

      {/* Third Image */}
      <div className="h-[20rem] lg:h-[13rem] w-[12rem] mt-4 lg:mt-32 md:ml-3 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-slideUp delay-300">
        <img
          src={college3}
          alt="Campus Life 3"
          className="object-cover w-full h-full cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
        />
      </div>

      {/* Fourth Image */}
      <div className="h-[20rem] md:h-[16rem] w-[12rem] mt-4 md:ml-3 md:mt-20 overflow-hidden rounded-xl hidden lg:block shadow-lg hover:shadow-2xl transition-all duration-300 animate-slideUp delay-400">
        <img
          src={college1}
          alt="Campus Life 4"
          className="object-cover w-full h-full cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
        />
      </div>

      {/* Fifth Image */}
      <div className="h-[20rem] w-[12rem] mt-4 md:m-3 overflow-hidden rounded-xl hidden lg:block shadow-lg hover:shadow-2xl transition-all duration-300 animate-slideUp delay-500">
        <img
          src={college4}
          alt="Campus Life 5"
          className="object-cover w-full h-full cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
        />
      </div>
    </div>

      {/* Info grid - save images you like */}
      <div className="w-11/12 flex flex-col md:flex-row mx-auto mt-16 gap-8 lg:gap-4">
        {/* Text Section */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2">
          <section className="text-5xl font-caveat">
            Curate Moments That Inspire...
          </section>
          <p className="mt-4 text-sm text-gray-600 pb-10">
            Immerse yourself in the highlights of university life.
          </p>
          <div className="sm:mt-0 md:mt-4">
            <Link to="/explore">
              <button className="bg-gray-300 text-xl h-[4rem] w-[8rem] rounded-3xl cursor-pointer transition-all hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-600 hover:text-white">
                Explore
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <div className="flex flex-row gap-4 items-center">
            <div className="relative group shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={college7}
                alt="University Life"
                className="h-[25rem] w-[16rem] rounded-xl cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
              />
            </div>
            <div className="flex gap-4 flex-col group shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative group">
                <img
                  src={college4}
                  alt="University Life"
                  className="h-[12rem] w-[12rem] rounded-xl cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
                />
              </div>
              <div className="relative group">
                <img
                  src={div4Image}
                  alt="University Life"
                  className="h-[12rem] w-[12rem] rounded-xl cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info grid 2 - save images you like */}
      <div className="w-11/12 flex flex-col-reverse md:flex-row mx-auto mt-16 gap-8 lg:gap-4">
        {/* Image Section */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <div className="flex flex-row gap-4 items-center">
            <div className="relative group shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={college1}
                alt="University Life"
                className="h-[25rem] w-[16rem] rounded-xl cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
              />
            </div>
            <div className="flex gap-4 flex-col group shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative group">
                <img
                  src={college2}
                  alt="University Life"
                  className="h-[12rem] w-[12rem] rounded-xl cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
                />
              </div>
              <div className="relative group">
                <img
                  src={college5}
                  alt="University Life"
                  className="h-[12rem] w-[12rem] rounded-xl cursor-pointer transition-transform transform hover:scale-105 hover:brightness-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2">
          <section className="text-5xl font-caveat">
            Explore it, embrace it, live it.
          </section>
          <p className="mt-4 text-sm text-gray-600 pb-10">
            Connect with the vibrant stories and moments that make university
            life unforgettable.
          </p>
          <div className="sm:mt-0 md:mt-4">
            <Link to="/explore">
              <button className="bg-gray-300 text-xl h-[4rem] w-[8rem] rounded-3xl cursor-pointer transition-all hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-300 hover:text-white">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* dowload the app from play store and app store */}

      {/* <DownloadApp /> */}
      <Footer />
    </div>
  );
};

export default Home;

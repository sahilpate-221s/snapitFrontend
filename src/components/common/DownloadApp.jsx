import React from 'react'
import div3Image from "../../assets/div3Image.jpg";

function DownloadApp() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center max-w-11/12 p-4 mt-6">
            {/* Left Box - Image */}
            <div className="flex-1 mb-4 md:mb-0 md:pr-4 h-[20rem] overflow-hidden ">
                <img 
                    src={div3Image} 
                    alt="App Preview" 
                    className="w-full h-auto rounded-lg shadow-lg object-fill"
                />
            </div>

            {/* Right Box - Download Section */}
            <div className="flex-1 flex flex-col items-start md:items-start text-left">
                <h2 className=" font-bold mb-4 font-caveat text-6xl">
                    Download Our App
                </h2>
                <div className="flex space-x-4">
                    {/* Play Store Button */}
                    <a 
                        href="https://play.google.com/store/apps/details?id=com.example"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                        <img 
                            src="play-store-icon.png" 
                            alt="Google Play" 
                            className="w-6 h-6 mr-2"
                        />
                        Google Play
                    </a>
                    {/* App Store Button */}
                    <a 
                        href="https://apps.apple.com/us/app/example-app/id1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        <img 
                            src="app-store-icon.png" 
                            alt="App Store" 
                            className="w-6 h-6 mr-2"
                        />
                        App Store
                    </a>
                </div>
            </div>
        </div>
    );
}

export default DownloadApp

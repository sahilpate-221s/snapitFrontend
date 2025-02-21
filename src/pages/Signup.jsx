import React from "react";
import Template from "../components/core/Auth/Template";

function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96">
        <Template
          title="Join the ultimate image gallery of the college"
          description="Enjoy the latest images from all over the campus so you don't miss anything."
          formType="signup"
        />
      </div>
    </div>
  );
}

export default Signup;

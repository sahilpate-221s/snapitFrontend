import React from "react";
import Template from "../components/core/Auth/Template";

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96">
        <Template
          title="Welcome Back"
          description="Enjoy the latest images from all over the campus"
          formType="login"
        />
      </div>
    </div>
  );
}

export default Login;

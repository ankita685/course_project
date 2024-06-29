/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use client";

import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { course } = useSelector((state) => state);
  const name = localStorage.getItem("name");
  const username = JSON.parse(name);

  const handleLogout = async () => {
    try {
      localStorage.setItem("courses", JSON.stringify(course));
      localStorage.clear();
      await signOut(auth);
      toast.success("User logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden fixed top-0 right-0 z-50 mr-3 mt-3 bg-gray-400 rounded-full p-2">
  <div className="w-8 h-8 relative">
    <button
      onClick={toggleSidebar}
      className="focus:outline-none"
    >
      <RxHamburgerMenu className="h-full w-full text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </button>
  </div>
</div>



      {/* Sidebar Container */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed inset-y-0 left-0 z-40 transition duration-300 ease-in-out 
        bg-[#46464a] shadow-lg overflow-y-auto p-2 w-1/3 md:w-[20rem] flex flex-col justify-start items-center min-h-screen`}
      >
        {/* User Info and Logout */}
        <div className="border w-full p-4 flex justify-between items-center rounded-xl bg-gray-300 shadow-md mb-4">
        {/* <div className="text-sm text-gray-700 font-serif italic">{username}</div> */}
        <div className="text-sm text-gray-700 font-serif italic border border-gray-400 p-2 rounded border-t-2 border-b-2">
  {username}
</div>



          <AiOutlineLogout
            onClick={handleLogout}
            className="h-6 text-black w-6 hover:text-gray-500 hover:cursor-pointer transition-colors duration-300"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col justify-center space-y-8 text-xl font-semibold items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-gray-800 transition-colors duration-300"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: "bold" }}
          >
            Home
          </Link>
          <Link
            to="/user/course/"
            className="text-gray-300 hover:text-gray-800 transition-colors duration-300"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: "bold" }}
          >
            My Courses
          </Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default Sidebar;

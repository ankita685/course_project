/* eslint-disable no-unused-vars */
"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { addCourse } from "../redux/slices/courseSlice";
import { setUser } from "../redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = userData.email;
    const password = userData.password;

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const storedUserCourses = localStorage.getItem("courses");
      if (storedUserCourses) {
        // Parse stored data and initialize Redux state with it
        dispatch(addCourse(JSON.parse(storedUserCourses)));
      }

      const currentUser = response.user

      localStorage.setItem("name", JSON.stringify(currentUser.displayName));
      localStorage.setItem("token", JSON.stringify(currentUser.accessToken));
      localStorage.setItem("userId", JSON.stringify(currentUser.uid));
      localStorage.setItem("user", JSON.stringify(currentUser));

      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData);

      dispatch(setUser(user));
      toast.success("User logged in successfully!");
      navigate("/");
    } catch (err) {
      console.log("Error: ", err.message);
      const errorCode = err.message.includes('auth/') ? err.message.split('auth/')[1] : err.message;
      const error = errorCode.slice(0, -2);
      toast.error(error);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <div>
          <CardHeader className="mb-4 flex justify-center items-center">
            <CardTitle className="text-3xl text-purple-600 font-semibold">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    className="mt-2 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-purple-600"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="mt-2 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-purple-600"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Login
              </button>
              <p className="text-sm text-center text-gray-700 pt-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-purple-600 font-semibold">
                  Register
                </Link>
              </p>
            </form>
          </CardContent>
        </div>
      </Card>
    </main>
  );
};

export default Login;

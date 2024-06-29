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
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../lib/firebase";

const Register = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = userData.username;
    const email = userData.email;
    const password = userData.password;

    if (!username || !email || !password) {
      toast.error("All fields required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(response.user, {
        displayName: username,
      });
      toast.success("User created successfully!");
      navigate("/login");
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
              Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="username" className="text-gray-700 font-medium">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className="mt-2 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-purple-600"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    required
                  />
                </div>
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
                Register
              </button>
              <p className="text-sm text-center text-gray-700 pt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 font-semibold">
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </div>
      </Card>
    </main>
  );
};

export default Register;


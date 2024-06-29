import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import CourseData from "../components/course/CourseData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../../src/redux/slices/userSlice";

const Navbar = ({ input, setInput }) => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#6c638b]">My Courses</div>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search course..."
          className="w-80 border border-black h-10 rounded-full placeholder-gray-400 text-gray-700 outline-none bg-white pl-5"
        />
      </div>
    </nav>
  );
};

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState("");
  const [currentUser] = useAuthState(auth);

  const getCourses = async () => {
    try {
      const courseCollection = collection(db, "courses");
      const q = query(courseCollection, orderBy("name"));
      const response = await getDocs(q);
      const coursesData = [];
      response.forEach((doc) => {
        coursesData.push(doc.data());
      });
      setCourses(coursesData);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = useSelector((state) => state);

  const userToken = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  const token = JSON.parse(userToken);
  const user = JSON.parse(userData);

  const fetchUserData = async () => {
    try {
      if (token) {
        dispatch(setUser(user));
      } else {
        console.log("No such document!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="max-w-[65rem] mt-10 mx-auto">
      <Navbar input={input} setInput={setInput} />
      <div className="px-10 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10 mt-8">
        {courses.length > 0 ? (
          courses
            .filter((results) => {
              if (!input) {
                return true;
              } else if (
                results.name?.toLowerCase().includes(input.toLowerCase()) ||
                results.instructor?.toLowerCase().includes(input.toLowerCase())
              ) {
                return true;
              } else {
                return false;
              }
            })
            .map((course) => <CourseData key={course.id} course={course} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;

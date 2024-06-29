/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useSelector } from "react-redux";

const CourseData = ({ course }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userId = user.uid;

  const [likes, setLikes] = useState(0);

  const handleClick = async () => {
    const courseRef = doc(db, "courses", course.id);
    const courseSnapshot = await getDoc(courseRef);
    const courseData = courseSnapshot.data();

    if (!courseData.likes.includes(userId)) {
      const updatedLikes = [...courseData.likes, userId];
      await updateDoc(courseRef, { likes: updatedLikes });
      setLikes(updatedLikes.length);
    } else {
      const updatedLikes = courseData.likes.filter((uid) => uid !== userId);
      await updateDoc(courseRef, { likes: updatedLikes });
      setLikes(updatedLikes.length);
    }
    window.location.reload();
    // Store the likes in localStorage before logging out and then retrieve it while logging in using Redux
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md rounded-xl shadow-lg overflow-hidden bg-white">
        <img
          alt="Course Thumbnail"
          className="object-cover w-full h-40 rounded-t-xl"
          src={course.thumbnail}
        />
        <CardContent className="p-4 space-y-4">
          <CardTitle className="text-xl font-bold text-gray-800 mb-2">
            {course.name.slice(0, 40)}
          </CardTitle>
          <p className="text-gray-600">{course.description.slice(0, 100)}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => navigate(`/course/${course.id}`)}
              className="flex items-center justify-center w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              View Course
            </button>
            <div className="flex items-center space-x-2">
              <FaHeart
                className={`h-10 w-10  p-2 text-gray-700 hover:text-red-500 ${
                  Array.isArray(course.likes) && course.likes.includes(userId)
                    ? "text-red-500 border-red-500"
                    : "border-gray-300"
                } cursor-pointer`}
                onClick={handleClick}
              />
              <span className="text-gray-700">{course.likes.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseData;



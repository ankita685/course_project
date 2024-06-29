/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const UserCourseData = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mb-8">
      <Card className="max-w-md w-full rounded-xl overflow-hidden shadow-lg bg-white">
        <img
          alt="Course Thumbnail"
          className="w-full h-48 object-cover rounded-t-xl"
          src={course.thumbnail}
        />
        <CardContent className="p-4">
          <CardTitle className="text-2xl font-bold text-gray-800 truncate">
            {course.name}
          </CardTitle>
          <p className="text-gray-600 truncate">{course.description}</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate(`/course/${course.id}`)}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              View Course
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCourseData;

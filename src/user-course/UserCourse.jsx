/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import UserCourseData from "../components/course/UserCourseData";
import { useUserCourses } from "./userCourseData";

const UserCourse = () => {
  const userCourses = useUserCourses();

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[#6c638b] text-3xl font-bold mb-8 sm:text-4xl text-center border-b-2 border-[#70688d] pb-2">
  My Courses
</div>


        {userCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userCourses.map((course) => (
              <UserCourseData key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">
            You haven't enrolled in any courses yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCourse;

import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const UserDashboard = () => {
  const courses = [
    {
      name: "Listings",
      progress: 50,
      total: 140,
      color: "stroke-red-500",
      bgColor: "bg-red-100",
    },
    {
      name: "Sales",
      progress: 45,
      total: 120,
      color: "stroke-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      name: "Purchases",
      progress: 25,
      total: 210,
      color: "stroke-blue-500",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="p-6">
      {/* Progress Section */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Progress
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {courses.map((course, index) => (
          <Card
            key={index}
            className={`p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 ${course.bgColor} dark:bg-gray-800`}
          >
            <CardContent className="flex flex-col items-center">
              {/* Circular Progress Bar */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle
                    className="text-gray-300 dark:text-gray-600"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                  />
                  <circle
                    className={`${course.color} stroke-current transition-all duration-500`}
                    strokeWidth="4"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                    strokeDasharray="100"
                    strokeDashoffset={100 - course.progress}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-lg font-semibold text-gray-900 dark:text-white">
                  {course.progress}%
                </span>
              </div>

              {/* Course Name & Total Count */}
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {course.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {course.total} Total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;

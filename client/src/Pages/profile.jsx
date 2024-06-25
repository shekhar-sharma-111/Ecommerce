import React from "react";

const UserProfile = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Name:</p>
            <p className="text-gray-900">John Doe</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Email:</p>
            <p className="text-gray-900">john.doe@example.com</p>
          </div>
        </div>
        <div className="bg-gray-200 px-6 py-4 flex justify-between flex-wrap">
          <button className="flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Orders
          </button>
          <button className="flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Address
          </button>
          <button className="flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Favorites
          </button>
          <button className="flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

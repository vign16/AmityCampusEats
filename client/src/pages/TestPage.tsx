import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">AmityCampusEats Test Page</h1>
        <p className="text-gray-700 mb-4">
          If you can see this page, the application is loading correctly.
        </p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="text-yellow-700">
            This is a test page to check if the React application is rendering properly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
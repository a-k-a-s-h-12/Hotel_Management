import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Contact Us
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg shadow">
            <div>
              <h3 className="text-xl font-medium text-gray-800">Akash K</h3>
              <p className="text-gray-600">Phone: 9384455520</p>
              <p className="text-gray-600">
                Email:{" "}
                <a
                  href="mailto:akash.k@example.com"
                  className="text-indigo-600 hover:underline"
                >
                  akash.k@example.com
                </a>
              </p>
            </div>
            <button
              className="mt-4 sm:mt-0 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
              onClick={() => (window.location.href = "tel:9384455520")}
            >
              Call
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg shadow">
            <div>
              <h3 className="text-xl font-medium text-gray-800">
                Jeffrey Joel
              </h3>
              <p className="text-gray-600">Phone: 9790401541</p>
              <p className="text-gray-600">
                Email:{" "}
                <a
                  href="mailto:jeffrey.joel@example.com"
                  className="text-indigo-600 hover:underline"
                >
                  jeffrey.joel@example.com
                </a>
              </p>
            </div>
            <button
              className="mt-4 sm:mt-0 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
              onClick={() => (window.location.href = "tel:9790401541")}
            >
              Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

import { Link } from "react-router-dom";

const PagesSidebar = () => {
  return (
    <div className="w-full lg:w-[360px] lg:fixed lg:right-0 lg:top-[72px] lg:h-[calc(100vh-72px)] bg-white p-4 border-l border-gray-200 overflow-y-auto">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your Pages</h2>
          <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>

        {/* Switch Account */}
        <button className="flex items-center space-x-3 w-full hover:bg-gray-100 p-2 rounded-lg transition duration-150">
          <img
            src="/default-page.png"
            alt="Current Page"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-900">Switch Account</p>
            <p className="text-sm text-gray-500">
              Switch between different pages
            </p>
          </div>
        </button>

        {/* Quick Actions */}
        <div className="space-y-1">
          <button className="flex items-center space-x-3 w-full hover:bg-gray-100 p-2 rounded-lg transition duration-150">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <span className="flex-1 text-left font-medium text-gray-700">
              Notifications
            </span>
          </button>

          <button className="flex items-center space-x-3 w-full hover:bg-gray-100 p-2 rounded-lg transition duration-150">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <span className="flex-1 text-left font-medium text-gray-700">
              Insights
            </span>
          </button>

          <button className="flex items-center space-x-3 w-full hover:bg-gray-100 p-2 rounded-lg transition duration-150">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="flex-1 text-left font-medium text-gray-700">
              Settings
            </span>
          </button>
        </div>

        {/* Your Pages List */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Your Pages</h3>
          <div className="space-y-1">
            {/* Example Page Item */}
            <Link
              to="/page/1"
              className="flex items-center space-x-3 w-full hover:bg-gray-100 p-2 rounded-lg transition duration-150"
            >
              <img
                src="/default-page.png"
                alt="Page Name"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Page Name</p>
                <p className="text-sm text-gray-500">1.2K followers</p>
              </div>
            </Link>
            {/* Add more page items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesSidebar;

import { Link2, BarChart3 } from "lucide-react";
export default function Header({ isAdmin, toggleAdmin }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <Link2 className="w-8 h-8 text-blue-600 mr-2" />
        <h1 className="text-4xl font-bold text-gray-800">URL Shortener</h1>
      </div>
      <p className="text-gray-600 text-lg">
        Convert long URLs into short and share Short URLs
      </p>
      <button
        onClick={toggleAdmin}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center mx-auto cursor-pointer"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        {isAdmin ? "User View" : "Admin View"}
      </button>
    </div>
  );
}

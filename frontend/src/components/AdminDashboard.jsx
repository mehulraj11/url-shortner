import AdminTable from "./AdminTable";
import StatsCards from "./StatsCards";
export default function AdminDashboard({ urls, fetchUrls, copyToClipboard }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={fetchUrls}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Refresh
        </button>
      </div>
      <AdminTable urls={urls} copyToClipboard={copyToClipboard} />
      <StatsCards urls={urls} />
    </div>
  );
}

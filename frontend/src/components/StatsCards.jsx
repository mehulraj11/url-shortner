export default function StatsCards({ urls }) {
  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3>Total URLs</h3>
        <p className="text-2xl font-bold">{urls.length}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <h3>Total Clicks</h3>
        <p className="text-2xl font-bold">{totalClicks}</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3>Avg. Clicks</h3>
        <p className="text-2xl font-bold">{urls.length ? (totalClicks / urls.length).toFixed(1) : 0}</p>
      </div>
    </div>
  );
}

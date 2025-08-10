import { Copy, ExternalLink, BarChart3 } from "lucide-react";
export default function AdminTable({ urls, copyToClipboard }) {
  if (!urls.length) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No URLs found</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3">Short Code</th>
            <th className="px-4 py-3">Original URL</th>
            <th className="px-4 py-3 text-center">Clicks</th>
            <th className="px-4 py-3 text-center">Created</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{u.shortCode}</td>
              <td className="px-4 py-3 truncate max-w-md">{u.originalUrl}</td>
              <td className="px-4 py-3 text-center">{u.clicks}</td>
              <td className="px-4 py-3 text-center">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-center flex justify-center space-x-2">
                <button
                  onClick={() =>
                    copyToClipboard(`http://localhost:5000/${u.shortCode}`)
                  }
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={`http://localhost:5000/${u.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

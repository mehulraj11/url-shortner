import { Link2 } from "lucide-react";
export default function UrlForm({
  url,
  setUrl,
  isValidUrl,
  loading,
  handleSubmit,
}) {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter your long URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/url/path"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        {url && !isValidUrl(url) && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid URL</p>
        )}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading || !url || !isValidUrl(url)}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? (
          "Shortening..."
        ) : (
          <>
            <Link2 className="w-4 h-4 mr-2" />
            Shorten URL
          </>
        )}
      </button>
    </div>
  );
}

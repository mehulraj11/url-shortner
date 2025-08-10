import { Copy, ExternalLink } from "lucide-react";
export default function ShortUrlResult({
  originalUrl,
  shortUrl,
  copyToClipboard,
  copied,
}) {
  if (!shortUrl) return null;
  return (
    <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-3">
        Your shortened URL:
      </h3>
      <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border">
        <code className="flex-1 text-blue-600 font-mono">{shortUrl}</code>
        <button
          onClick={() => copyToClipboard(shortUrl)}
          className="p-2 text-gray-500 hover:text-blue-600 cursor-pointer"
        >
          <Copy className="w-4 h-4 " />
        </button>
        <a
          href={originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-500 hover:text-blue-600"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      {copied === shortUrl && (
        <p className="text-green-600 text-sm mt-2">Copied to clipboard!</p>
      )}
    </div>
  );
}

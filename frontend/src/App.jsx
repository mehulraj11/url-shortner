import { useState } from "react";
import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import ShortUrlResult from "./components/ShortUrlResult";
import Features from "./components/Features";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [urls, setUrls] = useState([]);
  const [copied, setCopied] = useState("");

  const fetchUrls = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/urls`
      );
      const data = await response.json();
      if (response.ok) {
        setUrls(data);
      }
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    }
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    if (!isAdmin) fetchUrls();
  };
  const handleSubmit = async () => {
    if (!url) return;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setShortUrl(`${data.shortCode}`);
        setOriginalUrl(data.originalUrl);
        setUrl("");
        if (isAdmin) fetchUrls();
      } else {
        setError(data.message || "Failed to shorten URL");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };
  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header isAdmin={isAdmin} toggleAdmin={toggleAdmin} />
        {!isAdmin ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <UrlForm
                url={url}
                setUrl={setUrl}
                isValidUrl={isValidUrl}
                loading={loading}
                handleSubmit={handleSubmit}
              />
              {error && <p className="text-red-600">{error}</p>}
              <ShortUrlResult
                originalUrl={originalUrl}
                shortUrl={shortUrl}
                copyToClipboard={copyToClipboard}
                copied={copied}
              />
            </div>
            <Features />
          </div>
        ) : (
          <AdminDashboard
            urls={urls}
            fetchUrls={fetchUrls}
            copyToClipboard={copyToClipboard}
          />
        )}
      </div>
    </div>
  );
}

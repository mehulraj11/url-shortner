import { useState } from "react";
import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import ShortUrlResult from "./components/ShortUrlResult";
import Features from "./components/Features";
import AdminDashboard from "./components/AdminDashboard";

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [urls, setUrls] = useState([]);
  const [copied, setCopied] = useState("");

  const fetchUrls = async () => {
    /* same as before */
  };
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    if (!isAdmin) fetchUrls();
  };
  const handleSubmit = async () => {
    /* same as before */
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

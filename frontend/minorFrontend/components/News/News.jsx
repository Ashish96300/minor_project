import { useEffect, useState } from "react";
import axios from "axios";

const AnimalNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/news/animalnews`)
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError("Error fetching news");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-orange-100 to-orange-300 rounded-2xl shadow-md p-6 mt-10 ml-43 w-3/4 "  style={{ boxShadow: "0 0 15px #ff6600" }}>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        📰 Animal Welfare News & Awareness
      </h2>

      {error && <p className="text-center text-red-500">{error}</p>}

     <div className="flex gap-6">
  {articles.slice(0, 3).map((article, index) => (
    <div
      key={index}
      className="flex items-start bg-gray-100 p-4 rounded-xl hover:shadow-lg transition-shadow duration-300 w-[30%]"
      style={{ boxShadow: "0 0 8px #000000" }}
    >
      {/* Text Section */}
      <div className="w-2/3 pr-3">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <h3 className="text-md font-semibold text-indigo-600 hover:underline mb-1">
            {article.title}
          </h3>
        </a>
        <p className="text-xs text-gray-700 mb-1 line-clamp-2">{article.description}</p>
        <p className="text-xs text-gray-500">
          Source: <span className="font-medium">{article.source?.name}</span> |{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Image Section */}
      {article.urlToImage && (
        <div className="w-1/3 h-full flex justify-end items-center">
          <img
            src={article.urlToImage}
            alt="News"
            className="rounded-lg w-24 h-24 object-cover shadow-sm"
          />
        </div>
      )}
    </div>
  ))}
</div>

 </div>
  )}

export default AnimalNews;

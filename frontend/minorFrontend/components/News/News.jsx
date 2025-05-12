import { useEffect ,useState } from "react";
import axios from 'axios'

const AnimalNews = () => {
    const [articles , setArticles] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(null);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/news/animalnews`)
        .then((response) => {
            setArticles(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching news:", error);
            setError("Error fetching news");
            setLoading(false);
        });
    } , []);
    if (loading) {
        return <div>Loading...</div>;
    }

return (
  <div className="bg-white rounded-2xl shadow-md p-6 mt-10 ml-40 w-3/4 " style={{
    boxShadow: '0 0 15px #ff6600 '
  }}>
    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
      📰 Animal Welfare News & Awareness
    </h2>

    {loading && <p className="text-center text-gray-600">Loading news...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}

    {/* Display only the first article */}
    {articles.length > 0 && (
      <div className="bg-gray-100 p-4 rounded-xl hover:shadow-lg transition-shadow duration-300" 
      style={{
        boxShadow: '0 0 8px #000000 '
        }}>
        <a href={articles[0].url} target="_blank" rel="noopener noreferrer">
          <h3 className="text-lg font-semibold text-indigo-600 hover:underline mb-2">
            {articles[0].title}
          </h3>
        </a>
        <p className="text-sm text-gray-700 mb-2">{articles[0].description}</p>
        <p className="text-xs text-gray-500">
          Source: <span className="font-medium">{articles[0].source.name}</span> |{" "}
          {new Date(articles[0].publishedAt).toLocaleDateString()}
        </p>
      </div>
    )}


  </div>
);
}

export default AnimalNews;
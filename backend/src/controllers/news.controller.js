import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

const getAnimalNews = asyncHandler(async (req, res) => {
    try{
    const response = await axios.get(
        `https://newsapi.org/v2/everything`,{
        params:{
        q:'animal welfare OR pet care OR wildlife OR animal rights OR animal rescue OR animal',
        language:'en',
        sortBy:'publishedAt',
        pageSize:5,
        apiKey:process.env.NEWS_API_KEY
}
});
res.json(response.data.articles);
}
catch (error){
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Error fetching news" });
  }
}
);
export default getAnimalNews



import dotenv from "dotenv"
import {connectDB} from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: '../.env',
})
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET ? "Exists" : "Missing");
console.log("MongoDB URI:", process.env.MONGODB_URI);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

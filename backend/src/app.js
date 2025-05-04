import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorMiddleware from "./midllewears/err.middlewear.js"
const app = express()

const corsOptions = {
 origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
   credentials: true
 };
  
//   app.use(cors(corsOptions));
//   app.options('/*', cors(corsOptions)); // <-- ✅ Fixes preflight error
  
// Middlewares
app.use(cors(corsOptions));

// This handles all preflight OPTIONS requests regardless of route
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});


  

app.use(express.json({limit: "16kb"}))                              /*data kisi bhi form m ara ho ,charo alag alag handle karenge */
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
console.log(process.env.CORS_ORIGIN)



//routes import
import userRouter from './routes/user.routes.js'
import hospitalRouter from './routes/hospital.routes.js'
import animalRouter from './routes/animal.routes.js'
import fosterRouter from './routes/foster.routes.js'
// import nodemailerRouter from './routes/nodemailer.routes.js'
// import nodeRouter from './routes/nodemailer.hospital.routes.js'

/*import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"s
import dashboardRouter from "./routes/dashboard.routes.js"*/

//routes declaration11s
app.use("/api/v1/users", userRouter)
app.use("/api/v1/hospital" ,hospitalRouter)
app.use("/api/v1/animal" ,animalRouter)
app.use("/api/v1/fosterHome" ,fosterRouter)
//app.use("/api/v1/contactowner" ,nodemailerRouter)
//app.use("/api/v1/contacthospitaluploader",nodeRouter)

/*app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
//app.use("/api/v1/playlist", playlistRouter)
//app.use("/api/v1/dashboard", dashboardRouter)*/

// http://localhost:8000/api/v1/users/register
app.use(errorMiddleware); 
export { app }
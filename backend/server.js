import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import matchPostRoutes from "./routes/matchPostRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import http from "http"; // Required for Socket.IO
import { Server } from "socket.io";

dotenv.config({
  path: "./.env",
});

// const port = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: "*", // Allow requests from frontend
    credentials: true, // Allow cookies/auth headers
  })
);


app.use(express.json());



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // frontend URL
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

app.use("/api/profile", profileRoutes); // Profile-related endpoints
app.use("/api/auth", authRoutes); // Authentication endpoints
app.use("/api/communities", communityRoutes); // Community endpoints
app.use("/api/post", postRoutes); // Post endpoints
app.use("/api/event", eventRoutes); // Event endpoints
app.use("/api/match", matchPostRoutes); // Match post endpoints

// Serve frontend files in production
// const __dirname1 = path.resolve();
// app.use(express.static(path.join(__dirname1, "/frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
// });


io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🚪 User disconnected:", socket.id);
  });
});

connectDB().then(() => {
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
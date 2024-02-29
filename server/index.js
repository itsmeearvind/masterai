import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import masteraiRoutes from "./routes/masteraiRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/masterai', masteraiRoutes);
app.get("/", async (req, res) => {
  res.status(200).send("<h1 class='text-3xl font-bold m-auto' style='display: flex;justify-content: center;align-items: center;height: 100vh;'>Hello From Master AI</h1>");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

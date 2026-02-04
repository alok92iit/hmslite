const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");


const app = express();

app.use(cors({ credentials: true,origin:["http://127.0.0.1:5173", "http://192.168.56.1:5173", "http://localhost:5173", "http://172.28.240.1:5173", "http://192.168.1.46:5173",]}));
app.use(express.json());

const MONGO_URI = "mongodb://localhost:27017/HMS";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.get("/test", (req, res) => {
  res.json({ received: req.body });
});
app.use(routes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const shutdown = () => {
  console.log("Shutting down...");
  server.close(() => {
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

import express from "express";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/api/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
});

const startServer = async () => {
  try {
    await connectDB();
    if (!config.isProduction) {
      app.listen(config.PORT, async () => {
        console.log(`Server is listening on http://localhost:${config.PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ Error starting the server: ", error?.message || error);
    process.exit(1);
  }
};

startServer();

export default app;

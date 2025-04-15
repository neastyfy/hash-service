import app from "./src/app.js";
import { loadConfig } from "./src/services/configService.js";
import hashService from "./src/services/hashService.js";

const startServer = async () => {
  try {
    await loadConfig();
    console.log("Config loaded");
    await hashService.fillHashPool();

    app.listen(3000, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.error("Server start failed:", error);
    process.exit(1);
  }
};

startServer();

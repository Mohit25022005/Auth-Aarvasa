const { spawn } = require("child_process");
const path = require("path");

// Start Node.js Express Backend
const nodeProcess = spawn("node", ["server.js"], {
  stdio: "inherit",
  cwd: path.resolve(__dirname), // Make sure it's in root
});

// Start FastAPI Chatbot
const fastapiProcess = spawn(
  "uvicorn",
  ["main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"],
  {
    stdio: "inherit",
    cwd: path.resolve(__dirname, "chatbot_service"), // Set working dir for FastAPI
  }
);

// Gracefully kill both on Ctrl+C
process.on("SIGINT", () => {
  nodeProcess.kill("SIGINT");
  fastapiProcess.kill("SIGINT");
});

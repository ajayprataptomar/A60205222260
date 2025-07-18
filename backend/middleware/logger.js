const axios = require("axios");

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      stack,
      level,
      package: pkg,
      message,
    });
  } catch (err) {
    console.error("Failed to log:", err.message);
  }
};

module.exports = log;

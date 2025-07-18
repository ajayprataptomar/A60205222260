import axios from 'axios';


const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhamF5cHJhdGFwdG9tYXIzQGdtYWlsLmNvbSIsImV4cCI6MTc1MjgyNTYyOCwiaWF0IjoxNzUyODI0NzI4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTcxZTM5YTYtZDk0OS00MjI0LWI1MWItMGQ2MTlhZmM4ZDZhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWpheSBwcmF0YXAgdG9tYXIiLCJzdWIiOiIyN2I0OGMyYS03ZTFiLTQ0Y2UtYmQ1YS1jNWY0ZGU4NTFlMzcifSwiZW1haWwiOiJhamF5cHJhdGFwdG9tYXIzQGdtYWlsLmNvbSIsIm5hbWUiOiJhamF5IHByYXRhcCB0b21hciIsInJvbGxObyI6ImE2MDIwNTIyMjI2MCIsImFjY2Vzc0NvZGUiOiJKcHplclEiLCJjbGllbnRJRCI6IjI3YjQ4YzJhLTdlMWItNDRjZS1iZDVhLWM1ZjRkZTg1MWUzNyIsImNsaWVudFNlY3JldCI6IkVZU0JndEVhVWdtalRLTm0ifQ.mOFcWpCJJImTagMmIyayNFygkKRqZMnneVe6NMIC17o";

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  } catch (err) {
    console.error("Failed to log:", err.message);
  }
};

export default log;

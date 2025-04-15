// src/api/finnhub.js
export async function fetchIntradayData(symbol, resolution, from, to) {
    const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data; // Expected response: { c: [...], t: [...], ... , s: "ok" }
    } catch (error) {
      console.error("Error fetching intraday data:", error);
      return null;
    }
  }
  
  export async function fetchQuote(symbol) {
    const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data; // Expected response: { c, h, l, o, pc, ... }
    } catch (error) {
      console.error("Error fetching quote:", error);
      return null;
    }
  }
  
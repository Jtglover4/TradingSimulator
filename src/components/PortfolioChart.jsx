// src/components/DynamicPortfolioChart.jsx
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { fetchQuote } from '../api/finnhub';

const DynamicPortfolioChart = ({ ticker = "AAPL" }) => {
  const [chartData, setChartData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch a quote for the given ticker and add a new data point (with a numeric timestamp).
  const addDataPoint = async () => {
    try {
      const data = await fetchQuote(ticker);
      if (data && typeof data.c === "number") {
        const now = new Date();
        // Store a numeric timestamp (in milliseconds).
        const newPoint = {
          timestamp: now.getTime(),
          price: data.c
        };
        setChartData((prevData) => [...prevData, newPoint]);
      } else {
        console.error("No quote data received for", ticker);
      }
    } catch (error) {
      console.error(`Error fetching ${ticker} data:`, error);
      setErrorMessage(`Error fetching ${ticker} data.`);
    }
  };

  useEffect(() => {
    // Reset chart data whenever the ticker changes.
    setChartData([]);

    // Fetch a few initial data points to ensure a line is visible quickly.
    addDataPoint();
    setTimeout(addDataPoint, 1000);
    setTimeout(addDataPoint, 2000);

    // Then, add a new data point every minute.
    const intervalId = setInterval(addDataPoint, 60000);
    return () => clearInterval(intervalId);
  }, [ticker]);

  return (
    <div className="portfolio-chart" style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h2>{ticker} Dynamic Intraday Chart</h2>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              type="number"
              domain={['dataMin', 'dataMax']}
              scale="time"
              // Optionally force more ticks with 'tickCount' or 'interval'. See notes below.
              tickFormatter={(val) =>
                new Date(val).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })
              }
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })
              }
            />
            <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DynamicPortfolioChart;

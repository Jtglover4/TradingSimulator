// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NavigationDropdown from './components/NavigationDropdown';
import Portfolio from './components/Portfolio';
import DynamicPortfolioChart from './components/PortfolioChart';
import StockQuote from './components/StockQuote';
import './App.css';

function App() {
  const [cash, setCash] = useState(100000);
  const [portfolio, setPortfolio] = useState({});
  const symbols = ["AAPL", "GOOGL", "AMZN", "TSLA"];

  const handleTrade = (trade) => {
    const { type, symbol, quantity, price } = trade;
    const totalCost = price * quantity;
    if (type === 'buy') {
      if (cash < totalCost) {
        alert("Not enough cash to complete purchase");
        return;
      }
      setCash(cash - totalCost);
      setPortfolio(prev => ({
        ...prev,
        [symbol]: (prev[symbol] || 0) + quantity
      }));
    } else if (type === 'sell') {
      if (!portfolio[symbol] || portfolio[symbol] < quantity) {
        alert("Not enough shares to sell");
        return;
      }
      setCash(cash + totalCost);
      setPortfolio(prev => ({
        ...prev,
        [symbol]: prev[symbol] - quantity
      }));
    }
  };

  const [page, setPage] = useState("stocks");
  const handleChangePage = (selectedPage) => {
    setPage(selectedPage);
  };

  const [selectedTicker, setSelectedTicker] = useState("AAPL");

  return (
    <div className="App">
      <Navbar cash={cash} />
      <NavigationDropdown onChangePage={handleChangePage} />

      <div className="content" style={{ padding: '20px' }}>
        {page === "chart" && (
          <div>
            <h2>Portfolio Performance Chart</h2>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="ticker-select">Select Stock: </label>
              <select
                id="ticker-select"
                value={selectedTicker}
                onChange={(e) => setSelectedTicker(e.target.value)}
              >
                {symbols.map((symbol) => (
                  <option key={symbol} value={symbol}>
                    {symbol}
                  </option>
                ))}
              </select>
            </div>
            <DynamicPortfolioChart ticker={selectedTicker} />
          </div>
        )}

        {page === "portfolio" && (
          <div>
            <h2>My Portfolio</h2>
            <Portfolio portfolio={portfolio} cash={cash} />
          </div>
        )}

        {page === "stocks" && (
          <div>
            <h2>Stock Information</h2>
            {symbols.map((symbol) => (
              <StockQuote key={symbol} symbol={symbol} onTrade={handleTrade} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

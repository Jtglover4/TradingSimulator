// src/components/StockList.jsx
import React, { useEffect, useState } from 'react';
import { fetchQuote } from '../api/finnhub';
import TradeSimulator from './TradeSimulator';

const StockList = ({ symbols = [], onTrade }) => {
  const [quotes, setQuotes] = useState({});

  useEffect(() => {
    async function loadQuotes() {
      const newQuotes = {};
      for (const symbol of symbols) {
        const data = await fetchQuote(symbol);
        newQuotes[symbol] = data;
      }
      setQuotes(newQuotes);
    }
    loadQuotes();
  }, [symbols]);

  return (
    <div className="stock-list">
      <h2>Available Stocks</h2>
      <ul>
        {symbols.map(symbol => {
          const quote = quotes[symbol];
          return (
            <li key={symbol}>
              <div className="stock-info">
                <strong>{symbol}</strong>
                {quote ? (
                  <span> - Current Price: ${quote.c}</span>
                ) : (
                  <span> - Loading...</span>
                )}
              </div>
              {quote && (
                <TradeSimulator
                  stock={{ symbol, name: symbol, price: quote.c }}
                  onTrade={onTrade}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StockList;

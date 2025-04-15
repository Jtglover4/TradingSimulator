// src/components/StockQuote.jsx
import React, { useState, useEffect } from 'react';
import { fetchQuote } from '../api/finnhub';

const StockQuote = ({ symbol, onTrade }) => {
  const [quote, setQuote] = useState(null);
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    async function loadQuote() {
      const data = await fetchQuote(symbol);
      setQuote(data);
    }
    loadQuote();
  }, [symbol]);

  const handleBuy = () => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    onTrade({ type: 'buy', symbol, quantity: qty, price: quote.c });
    setQuantity('');
  };

  const handleSell = () => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    onTrade({ type: 'sell', symbol, quantity: qty, price: quote.c });
    setQuantity('');
  };

  if (!quote) {
    return <p>Loading quote for {symbol}...</p>;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', maxWidth: '400px', borderRadius: '8px', background: 'linear-gradient(135deg, #ffffff, #e6f7ff)' }}>
      <h3>{symbol} Quote</h3>
      <p><strong>Current Price:</strong> ${quote.c}</p>
      <p><strong>High:</strong> ${quote.h}</p>
      <p><strong>Low:</strong> ${quote.l}</p>
      <p><strong>Open:</strong> ${quote.o}</p>
      <p><strong>Previous Close:</strong> ${quote.pc}</p>
      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
        <input 
          type="number" 
          placeholder="Quantity" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ width: '70px', marginRight: '10px', padding: '4px' }}
        />
        <button onClick={handleBuy} style={{ padding: '6px 12px', marginRight: '5px' }}>Buy</button>
        <button onClick={handleSell} style={{ padding: '6px 12px' }}>Sell</button>
      </div>
    </div>
  );
};

export default StockQuote;

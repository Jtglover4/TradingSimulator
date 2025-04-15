import React, { useState } from 'react';

const TradeSimulator = ({ stock, onTrade }) => {
  const [quantity, setQuantity] = useState(0);

  const handleBuy = () => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      alert("Enter a valid quantity");
      return;
    }
    onTrade({ type: 'buy', symbol: stock.symbol, quantity: qty, price: stock.price });
  };

  const handleSell = () => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      alert("Enter a valid quantity");
      return;
    }
    onTrade({ type: 'sell', symbol: stock.symbol, quantity: qty, price: stock.price });
  };

  return (
    <div className="trade-simulator">
      <input 
        type="number" 
        value={quantity} 
        min="0"
        onChange={e => setQuantity(e.target.value)}
        placeholder="Quantity" 
      />
      <button onClick={handleBuy}>Buy</button>
      <button onClick={handleSell}>Sell</button>
    </div>
  );
};

export default TradeSimulator;

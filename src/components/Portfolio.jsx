// src/components/Portfolio.jsx
import React, { useEffect, useState } from 'react';
import { fetchQuote } from '../api/finnhub';
import moneyImage from '../assets/money.png'; // or use src="/money.png" if the image is in public

const Portfolio = ({ portfolio, cash }) => {
  const [aaplPrice, setAaplPrice] = useState(null);

  useEffect(() => {
    async function loadAAPLPrice() {
      const data = await fetchQuote("AAPL");
      if (data && data.c) {
        setAaplPrice(data.c);
      }
    }
    loadAAPLPrice();
    const intervalId = setInterval(loadAAPLPrice, 60000); // Update every minute
    return () => clearInterval(intervalId);
  }, []);

  let aaplValue = 0;
  if (portfolio["AAPL"] && aaplPrice) {
    aaplValue = portfolio["AAPL"] * aaplPrice;
  }

  const totalPortfolioValue = cash + aaplValue;

  const ownedStocks = Object.keys(portfolio);

  return (
    <div
      className="portfolio"
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        width: '45%',
        margin: 'auto'
      }}
    >
      <h2>Your Portfolio</h2>
      <img
        src={moneyImage}
        alt="Money"
        style={{ width: '100px', margin: '10px 0' }}
      />
      {ownedStocks.length === 0 ? (
        <p>No stocks purchased yet.</p>
      ) : (
        <table style={{ width: '100%', marginBottom: '10px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Stock</th>
              <th style={{ textAlign: 'left' }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {ownedStocks.map((symbol) => (
              <tr key={symbol}>
                <td>{symbol}</td>
                <td>{portfolio[symbol]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <strong>Total Cash: </strong>${cash.toFixed(2)}
      </div>
      {portfolio["AAPL"] && aaplPrice && (
        <div>
          <strong>AAPL Current Price: </strong>${aaplPrice.toFixed(2)}
        </div>
      )}
      <div style={{ marginTop: '10px', fontSize: '1.2em' }}>
        <strong>Total Portfolio Value: </strong>${totalPortfolioValue.toFixed(2)}
      </div>
    </div>
  );
};

export default Portfolio;

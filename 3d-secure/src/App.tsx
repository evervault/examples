import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { Card, CardPayload, ComponentError, themes, useThreeDSecure } from "@evervault/react";
import { create3DSSession, get3DSSession, ThreeDsSession } from "./session";
import "./App.css";
import Toast from './Toast';

function App() {
  const [cardData, setCardData] = useState<CardPayload | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [sessionData, setSessionData] = useState<ThreeDsSession | null>(null);
  const threeDSecure = useThreeDSecure();
  const theme = themes.clean();

  const hideCheckoutForm = () => {
    const formElement = document.getElementById('checkout-form');
    if (formElement) formElement.style.display = 'none';
  };

  const onError = (error: ComponentError) => {
    // Handle error display

  };

  const onFailure = () => {
    // Handle failure display
  };

  const onSuccess = (session: ThreeDsSession) => {
    hideCheckoutForm();
    setSessionData(session);
    setShowSuccessMessage(true);
  };

  const handleChange = (payload: CardPayload) => {
    setCardData(payload);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardData || !cardData.isValid || !name || !email) {
      // Show error message
      return;
    }

    try {
      const { card } = cardData;
      const { expiry } = card;

      const sessionId = await create3DSSession(card.number!, expiry.month!, expiry.year!);
      
      threeDSecure.start(sessionId, {
        onSuccess: async () => {
          try {
            const session = await get3DSSession(sessionId);
            onSuccess(session);
          } catch (error) {
            onError(error as ComponentError);
          }
        },
        onFailure,
        onError: (error) => onError(error as ComponentError)
      });
    } catch (error) {
      onError(error as ComponentError);
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <img src="/evervault.svg" alt="Evershop Logo" width="40" height="40" />
          <h1>Evershop</h1>
        </div>
        <nav>
          <a href={window.location.href} className="active">Checkout</a>
          <a href="https://docs.evervault.com" target="_blank" rel="noopener noreferrer">Shop</a>
          <a href="https://docs.evervault.com/payments/3d-secure" target="_blank" rel="noopener noreferrer">About</a>
        </nav>
      </header>

      <main>
        <div className="checkout-container">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              <li>Evershop T-Shirt <span>€22.99</span></li>
              <li>Evershop Cap <span>€15.99</span></li>
              <li>Shipping <span>€5.00</span></li>
            </ul>
            <div className="total">
              <strong>Total</strong> <strong>€31.98</strong>
            </div>
          </div>

          {!showSuccessMessage ? (
            <form id="checkout-form" onSubmit={handleSubmit}>
              <h2>Checkout</h2>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Card Details</label>
                <Card icons theme={theme} onChange={handleChange} />
              </div>
              <button type="submit">Pay €31.98</button>
            </form>
          ) : (
            <div id="success-message" className="message success-message">
              <h3>Payment Successful</h3>
              <div className="message-content">
                <p>Thank you for your purchase, {name}!</p>
                <p>Your order has been confirmed and will be shipped soon.</p>
                <p><strong>Order ID:</strong> {sessionData?.id}</p>
                <button 
                  className="details-toggle" 
                  onClick={() => setShowDetails(!showDetails)}
                  aria-expanded={showDetails}
                >
                  Auth Details
                </button>
                {showDetails && sessionData && (
                  <div className="session-details">
                    <p>Status: {sessionData.status}</p>
                    <p>Cryptogram: {sessionData.cryptogram}</p>
                    <p>ECI: {sessionData.eci.descriptor} ({sessionData.eci.value})</p>
                    <p>Liability Shift: {sessionData.eci.liabilityShift ? 'Yes' : 'No'}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Evershop. All rights reserved.</p>
        <p>Secured by <a href="https://evervault.com" target="_blank" rel="noopener noreferrer">Evervault</a></p>
      </footer>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useParams } from 'react-router-dom';
import './Checkout.css';

const stripePromise = loadStripe('pk_test_51RAy9Q9MrYw2tfaluPQvwDm0uk5RwQFPKfPfmHMtcP0rmVH0X0nLXJ2cXEUCwHFE9xQpnEGMiSSSnIlijteADQNw00fsVdg6mf');

const PayPalCheckoutButton = ({ plan }) => {
  const navigate = useNavigate();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: '10.00', // Remplacez par le prix réel du plan
        },
      }],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      // Ici, vous devriez envoyer les détails au backend
      navigate('/success');
    });
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      style={{
        layout: 'vertical',
        color: 'gold',
        shape: 'pill',
        label: 'paypal',
        tagline: false,
      }}
    />
  );
};

const CardCheckoutForm = ({ plan, userId }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
      } else {
        // Envoyer le paiement au backend
        const response = await fetch('/api/stripe/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            plan: plan,
            userId: userId,
          }),
        });

        const result = await response.json();

        if (result.success) {
          navigate('/success');
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardElement">Informations de carte</label>
        <CardElement id="cardElement" options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              letterSpacing: '0.025em',
              fontFamily: 'Source Code Pro, monospace',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }} />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button disabled={processing} className="btn">
        {processing ? 'Traitement...' : 'Payer'}
      </button>
    </form>
  );
};

const ApplePayCheckoutButton = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'FR',
      currency: 'eur',
      total: {
        label: 'Total',
        amount: 1000, // Le montant en centimes (10.00 EUR)
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then(result => {
      if (result && result.applePay) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (ev) => {
      // Gérer le paiement ici
      const { paymentMethod } = ev;
      
      // Vous pouvez envoyer paymentMethod.id à votre serveur ici
      
      // Indiquer le succès à l'interface Apple Pay
      ev.complete('success');
      
      // Rediriger vers la page de succès
      navigate('/success');
    });
  }, [stripe, elements]);

  if (!paymentRequest) {
    return null;
  }

  return (
    <PaymentRequestButtonElement
      options={{
        paymentRequest,
        style: {
          paymentRequestButton: {
            theme: 'dark',
            height: '48px',
          },
        },
      }}
    />
  );
};

const GooglePayCheckoutButton = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'FR',
      currency: 'eur',
      total: {
        label: 'Total',
        amount: 1000, // Le montant en centimes (10.00 EUR)
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then(result => {
      if (result && result.googlePay) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (ev) => {
      // Gérer le paiement ici
      const { paymentMethod } = ev;
      
      try {
        // Vous pouvez envoyer paymentMethod.id à votre serveur ici
        
        // Indiquer le succès à l'interface Google Pay
        ev.complete('success');
        
        // Rediriger vers la page de succès
        navigate('/success');
      } catch (error) {
        console.error('Erreur lors du paiement:', error);
        ev.complete('fail');
      }
    });
  }, [stripe, elements, navigate]);

  if (!paymentRequest) {
    return null;
  }

  return (
    <PaymentRequestButtonElement
      options={{
        paymentRequest,
        style: {
          paymentRequestButton: {
            type: 'pay',
            theme: 'light',
            height: '48px',
          },
        },
      }}
    />
  );
};

const Checkout = () => {
  const { plan } = useParams();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();
  const userId = 1; // Remplacez par l'ID de l'utilisateur connecté

  const handlePaymentClick = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  return (
    <div className="checkout-container">
      <div className="auth-container">
        <div className="auth-box">
          <h2 id="white-text">Finaliser votre commande</h2>
          <p id="plan-info white-text">Plan sélectionné: {plan}</p>
          
          <div className="payment-methods">
            <h3 className="white-text">Moyens de paiement acceptés</h3>
            <div className="payment-options">
              <div 
                className="payment-option visa" 
                onClick={() => handlePaymentClick('card')}
              >
                <img src="/images/visa.png" alt="Visa" className="payment-icon" />
                <span>Visa</span>
              </div>
              <div 
                className="payment-option mastercard" 
                onClick={() => handlePaymentClick('card')}
              >
                <img src="/images/mastercard.png" alt="Mastercard" className="payment-icon" />
                <span>Mastercard</span>
              </div>
              <div 
                className="payment-option american" 
                onClick={() => handlePaymentClick('card')}
              >
                <img src="/images/american.png" alt="American Express" className="payment-icon" />
                <span>American Express</span>
              </div>
              <div 
                className="payment-option" 
                onClick={() => handlePaymentClick('paypal')}
              >
                <img src="/images/pppp.png" alt="PayPal" className="payment-icon" />
                <span>PayPal</span>
              </div>
              <div 
                className="payment-option" 
                onClick={() => handlePaymentClick('apple-pay')}
              >
                <img src="/images/apple.png" alt="Apple Pay" className="payment-icon" />
                <span>Apple Pay</span>
              </div>
              <div 
                className="payment-option" 
                onClick={() => handlePaymentClick('google-pay')}
              >
                <img src="/images/google.png" alt="Google Pay" className="payment-icon" />
                <span>Google Pay</span>
              </div>
            </div>
          </div>

          {selectedPayment === 'card' && (
            <Elements stripe={stripePromise}>
              <CardCheckoutForm plan={plan} userId={userId} />
            </Elements>
          )}

          {selectedPayment === 'paypal' && (
            <PayPalScriptProvider options={{
              'client-id': 'Ad5AYpBunGgJ1UBbFnTIUdXtuB6jiQSrz-xPGDi4Hr0gMGWws4bhQumcXX_TRpwXJ4C1EC2sTxRcNQpA',
              currency: 'EUR',
              intent: 'capture'
            }}>
              <div className="paypal-container">
                <PayPalCheckoutButton plan={plan} />
              </div>
            </PayPalScriptProvider>
          )}

          {selectedPayment === 'apple-pay' && (
            <Elements stripe={stripePromise}>
              <div className="apple-pay-container">
                <ApplePayCheckoutButton />
              </div>
            </Elements>
          )}

          {selectedPayment === 'google-pay' && (
            <Elements stripe={stripePromise}>
              <div className="google-pay-container">
                <GooglePayCheckoutButton />
              </div>
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

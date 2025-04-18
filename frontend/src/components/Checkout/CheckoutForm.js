import React, { useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ plan }) => {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (cardError) {
                throw cardError;
            }

            // Envoyer le paymentMethod.id au backend
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    plan: plan,
                    userId: localStorage.getItem('userId')
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw data.error;
            }

            // Redirection vers la page de succès
            navigate('/success');
        } catch (err) {
            setError(err.message);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label>Carte de crédit</label>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            letterSpacing: '0.025em',
                            fontFamily: 'Source Code Pro, monospace',
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={!stripe || processing} className="btn">
                {processing ? 'Traitement...' : 'Payer'}
            </button>
        </form>
    );
};

export default CheckoutForm;

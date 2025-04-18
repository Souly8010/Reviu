import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n/i18n'; // Import du système de traduction

// Configuration des variables d'environnement
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
console.log('API URL:', API_URL);

// Gestionnaire pour supprimer les erreurs de console liées aux extensions Chrome
const originalConsoleError = console.error;
console.error = function(message, ...args) {
  if (
    typeof message === 'string' && (
      message.includes('price_parity:pcp_begin') ||
      message.includes('A listener indicated an asynchronous response') ||
      message.includes('message channel closed before a response was received')
    )
  ) {
    // Ignorer ces messages d'erreur spécifiques
    return;
  }
  originalConsoleError.apply(console, [message, ...args]);
};

// Gestionnaire pour les cookies tiers
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Vérifier si l'utilisateur a déjà accepté les cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
      // Créer un élément de bannière de cookies
      const cookieBanner = document.createElement('div');
      cookieBanner.id = 'cookie-banner';
      cookieBanner.style.position = 'fixed';
      cookieBanner.style.bottom = '0';
      cookieBanner.style.left = '0';
      cookieBanner.style.width = '100%';
      cookieBanner.style.padding = '15px';
      cookieBanner.style.backgroundColor = 'rgba(30, 58, 138, 0.95)';
      cookieBanner.style.color = 'white';
      cookieBanner.style.zIndex = '9999';
      cookieBanner.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.2)';
      cookieBanner.style.display = 'flex';
      cookieBanner.style.justifyContent = 'space-between';
      cookieBanner.style.alignItems = 'center';
      
      const cookieText = document.createElement('p');
      cookieText.style.margin = '0 15px 0 0';
      cookieText.textContent = 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre utilisation des cookies.';
      
      const buttonContainer = document.createElement('div');
      
      const acceptButton = document.createElement('button');
      acceptButton.textContent = 'Accepter';
      acceptButton.style.backgroundColor = '#0ea5e9';
      acceptButton.style.border = 'none';
      acceptButton.style.color = 'white';
      acceptButton.style.padding = '8px 16px';
      acceptButton.style.borderRadius = '4px';
      acceptButton.style.cursor = 'pointer';
      acceptButton.style.marginRight = '10px';
      
      const rejectButton = document.createElement('button');
      rejectButton.textContent = 'Refuser';
      rejectButton.style.backgroundColor = 'transparent';
      rejectButton.style.border = '1px solid white';
      rejectButton.style.color = 'white';
      rejectButton.style.padding = '8px 16px';
      rejectButton.style.borderRadius = '4px';
      rejectButton.style.cursor = 'pointer';
      
      // Ajouter des événements
      acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        document.body.removeChild(cookieBanner);
      });
      
      rejectButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'false');
        document.body.removeChild(cookieBanner);
      });
      
      buttonContainer.appendChild(acceptButton);
      buttonContainer.appendChild(rejectButton);
      cookieBanner.appendChild(cookieText);
      cookieBanner.appendChild(buttonContainer);
      
      // Ajouter la bannière au body
      document.body.appendChild(cookieBanner);
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// FIX: Import providers for context
import { AuthProvider } from './hooks/useAuth';
import { TranslationProvider } from './hooks/useTranslation';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* FIX: Wrap App with context providers */}
      <AuthProvider>
        <TranslationProvider>
          <App />
        </TranslationProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

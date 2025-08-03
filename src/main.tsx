import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register service worker for caching with better error handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('SW registered successfully: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
      // Continue without service worker - app will still work
    }
  });
}

// Add error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent the default browser behavior
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(<App />);

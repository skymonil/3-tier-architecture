import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'custom-csp-header',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader(
            'Content-Security-Policy',
            [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
              "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
              "img-src 'self' data:",
              "connect-src 'self' http://localhost:5000",
              "frame-src https://api.razorpay.com https://checkout.razorpay.com",
              "object-src 'none'",
              "base-uri 'self'",
                "frame-ancestors 'none'",  
              "form-action 'self'",
            ].join('; ')
          );
          res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader("X-Content-Type-Options", "nosniff");

          next();
        });
        
      }
      
    }
    
  ],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
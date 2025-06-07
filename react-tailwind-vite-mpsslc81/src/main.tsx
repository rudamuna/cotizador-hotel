import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CotizadorHotel from './App'; // Asegúrate que sea './App' (donde está tu componente)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CotizadorHotel />
  </React.StrictMode>
);

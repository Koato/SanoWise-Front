// src/components/Scanner.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Scanner() {
  const [scanning, setScanning] = useState(false);  // Estado para simular el proceso de escaneo
  const navigate = useNavigate();  // Hook para redireccionar después del escaneo

  // Función que se ejecuta al hacer clic en el botón de escanear
  const handleScanClick = () => {
    setScanning(true);  // Cambiamos el estado a "scanning" verdadero

    // Simulamos el proceso de escaneo con un retraso de 2 segundos
    setTimeout(() => {
      setScanning(false);  // Terminamos el proceso de escaneo
      // Producto simulado que sería el resultado del escaneo
      const scannedProduct = {
        id: 1,
        name: "Producto Saludable",
        rating: 4.5,
      };

      // Redirigimos a la página de resultados con el producto escaneado
      navigate('/results', { state: { product: scannedProduct } });
    }, 2000);
  };

  return (
    <div className="scanner">
      <h1>SanoWise</h1>
      {scanning ? (
        <p>Escaneando producto...</p>  // Muestra un mensaje durante el escaneo
      ) : (
        <button className="scan-btn" onClick={handleScanClick}>
          Escanear Producto
        </button>
      )}
      <p>Escanea un producto para ver su evaluación de salud.</p>
    </div>
  );
}

export default Scanner;

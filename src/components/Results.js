// src/components/Results.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();  // Usamos useLocation para obtener el estado enviado
  const { product } = location.state || {};  // Obtenemos el producto del estado si existe

  return (
    <div className="results">
      {product ? (
        <>
          <h2>Resultados del Escaneo</h2>
          <div className="product-evaluation">
            <p>Producto: {product.name}</p>
            <p>Calificación: {product.rating} / 5</p>
            <p>Detalles: Ingredientes, impacto nutricional, etc.</p>
          </div>
        </>
      ) : (
        <p>No se encontró ningún producto. Escanee uno nuevamente.</p>
      )}
    </div>
  );
}

export default Results;

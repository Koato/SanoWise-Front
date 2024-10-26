// src/components/Results.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { product } = location.state || {};

  return (
    <div className="results">
      {product ? (
        <>
          <h2>Resultados del Escaneo</h2>
          <div className="product-evaluation">
            <p>Producto: {product.veredict}</p>
            <p>Calificación: {product.rating} / 5</p>
            <p>Detalles: {product.ingredientes} </p>
          </div>

          <h3>Sugerencias de Productos Alternativos</h3>
          <ul>
            {product.suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <p>{suggestion.name} - Calificación: {suggestion.rating} / 5</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No se encontró ningún producto. Escanee uno nuevamente.</p>
      )}
    </div>
  );
}

export default Results;

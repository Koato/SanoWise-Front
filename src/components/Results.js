// src/components/Results.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { product } = location.state || {};

  const results = {
    product: {
      name: "",
      rating: "",
      ingredientes: ""
    }, suggestions: [
      { id: 2, name: "Producto Alternativo 1", rating: 4.7 },
      { id: 3, name: "Producto Alternativo 2", rating: 4.6 },
      { id: 4, name: "Producto Alternativo 3", rating: 4.8 },
    ]
  };

  return (
    <div className="results">
      {product ? (
        <>
          <h2>Resultados del Escaneo</h2>
          <div className="product-evaluation">
            <p>Producto: {product.name}</p>
            <p>Calificación: {product.rating} / 5</p>
            <p>Detalles: {product.ingredientes} </p>
          </div>

          <h3>Sugerencias de Productos Alternativos</h3>
          <ul>
            {results.suggestions.map((suggestion) => (
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

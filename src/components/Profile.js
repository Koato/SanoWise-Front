// src/components/Profile.js
import React from 'react';

function Profile() {
  return (
    <div className="profile-page">
      <h2>Mi Perfil</h2>
      
      <div className="profile-section">
        <h3>Información del Usuario</h3>
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Correo electrónico:</strong> juan.perez@example.com</p>
        <button className="button edit-btn">Editar Perfil</button>
      </div>

      <div className="profile-section">
        <h3>Preferencias</h3>
        <ul>
          <li>Evitar productos con gluten</li>
          <li>Preferir productos orgánicos</li>
          <li>Sin azúcar añadido</li>
        </ul>
        <button className="button edit-btn">Editar Preferencias</button>
      </div>

      {/* <div className="profile-section">
        <h3>Historial de Productos Escaneados</h3>
        <ul>
          <li>Producto 1 - Calificación: ★★★★☆</li>
          <li>Producto 2 - Calificación: ★★★☆☆</li>
          <li>Producto 3 - Calificación: ★★★★★</li>
        </ul>
        <button className="button clear-history-btn">Borrar Historial</button>
      </div> */}
    </div>
  );
}

export default Profile;

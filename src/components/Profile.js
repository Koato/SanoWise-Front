// src/components/Profile.js
import React, { useEffect, useState } from 'react';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los datos del perfil desde el servicio REST
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/sano/profile'); // URL del servicio REST
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
        setLoading(true);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Cargando datos del perfil...</p>;

  return (
    <div className="profile-page">
      <h2>Mi Perfil</h2>
      
      <div className="profile-section">
        <h3>Información del Usuario</h3>
        <p><strong>Nombre:</strong> {profileData.name}</p>
        <p><strong>Correo electrónico:</strong> {profileData.email}</p>
        <button className="button edit-btn">Editar Perfil</button>
      </div>

      <div className="profile-section">
        <h3>Preferencias</h3>
        <ul>
          {profileData.preferences.map((preference, index) => (
            <li key={index}>{preference}</li>
          ))}
        </ul>
        <button className="button edit-btn">Editar Preferencias</button>
      </div>
    </div>
  );
}

export default Profile;

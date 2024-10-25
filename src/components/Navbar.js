// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/alternatives">Alternativas</Link>
      <Link to="/results">Resultados</Link>
      <Link to="/profile">Perfil</Link>
    </div>
  );
}

export default Navbar;

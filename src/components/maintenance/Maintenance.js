import React from 'react';
import './Maintenance.css'; // Importando o arquivo de estilos

const Maintenance = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <h1 className="maintenance-title">🚧 Em Manutenção 🚧</h1>
        <p className="maintenance-text">
          Desculpe pelo inconveniente, mas estamos realizando uma manutenção no momento.
        </p>
        <p className="maintenance-text">
          Estaremos de volta em breve! Por favor, volte mais tarde.
        </p>
        <div className="maintenance-spinner"></div>
      </div>
    </div>
  );
};

export default Maintenance;
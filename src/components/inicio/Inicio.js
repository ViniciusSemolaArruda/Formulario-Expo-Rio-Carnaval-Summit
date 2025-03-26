import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === 'patrocinador') {
      navigate('/Forms2');
    } else if (selectedOption === 'palestrante') {
      navigate('/Forms');
    }
  };

  return (
    <div className="inicio-container">
      <div className="card-elegante">
        <img 
          src="/images/novidade23.png" 
          alt="Marca d'água" 
          className="marca-dagua"
        />
        <h1>Bem-vindo ao Formulário Expo Rio Carnaval Summit</h1>
        <p>Por favor, selecione sua categoria:</p>
        
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="patrocinador"
                checked={selectedOption === 'patrocinador'}
                onChange={() => handleOptionChange('patrocinador')}
              />
              <span className="radio-custom"></span>
              Sou Patrocinador
            </label>
            
            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="palestrante"
                checked={selectedOption === 'palestrante'}
                onChange={() => handleOptionChange('palestrante')}
              />
              <span className="radio-custom"></span>
              Sou Palestrante/Convidado
            </label>
          </div>
          
          <button
            type="submit"
            className="submit-button"
            disabled={!selectedOption}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inicio;
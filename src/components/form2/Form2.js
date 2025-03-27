import React, { useState } from 'react';
import './Form2.css';

const Form2 = () => {
  const [formData, setFormData] = useState({
    empresa: '',
    email: '',
    celular: '',
    instagram: '',
    aceitouTermos: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'celular') {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.aceitouTermos) {
      alert('Você deve aceitar os termos para continuar');
      return;
    }
    console.log('Dados do formulário:', formData);
  };

  return (
    <div className="form-container">
      <form className="elegant-form" onSubmit={handleSubmit}>
        <img 
          src="/images/novidade23.png" 
          alt="Marca d'água" 
          className="marca-dagua"
        />
        <h2>Olá, Patrocinador</h2>
        
        <div className="form-group">
          <label htmlFor="empresa">Nome da empresa</label>
          <input 
            type="text" 
            id="empresa" 
            name="empresa" 
            value={formData.empresa}
            onChange={handleChange}
            placeholder="Digite o nome da empresa" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="empresa@email.com" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="celular">Celular</label>
          <input 
            type="tel" 
            id="celular" 
            name="celular" 
            value={formData.celular}
            onChange={handleChange}
            placeholder="(00) 00000-0000" 
            required
            maxLength={15}
          />
        </div>

        <div className="form-group">
          <label htmlFor="instagram">Instagram</label>
          <div className="instagram-input">
            <span className={`instagram-at ${formData.instagram ? 'active' : ''}`}>@</span>
            <input 
              type="text" 
              id="instagram" 
              name="instagram" 
              value={formData.instagram}
              onChange={handleChange}
              placeholder="empresa_instagram"
              required
            />
          </div>
        </div>

        <div className="form-group termos-group">
          <label className="termos-label">
            <input
              type="checkbox"
              name="aceitouTermos"
              checked={formData.aceitouTermos}
              onChange={handleChange}
              required
            />
            Eu li e aceito os <a href="/Termo" target="_blank" rel="noopener noreferrer">termos de uso</a>
          </label>
        </div>
        
        <button type="submit" className="submit-btn">Enviar</button>
      </form>
    </div>
  );
};

export default Form2;
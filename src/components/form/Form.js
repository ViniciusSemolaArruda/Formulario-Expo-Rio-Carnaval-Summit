import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    celular: '',
    instagram: '',
    sexo: '',
    dataNascimento: '',
    tipoAtividade: '',
    mesaSelecionada: '',
    oficinaSelecionada: '',
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
        <h2>Olá, Palestrante/Convidado</h2>
        
        <div className="form-group">
          <label htmlFor="nome">Nome completo</label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome" 
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
            placeholder="seu@email.com" 
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
              placeholder="seuusuario"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Sexo</label>
          <div className="radio-group1">
            <label>
              <input
                type="radio"
                name="sexo"
                value="feminino"
                checked={formData.sexo === 'feminino'}
                onChange={handleChange}
                required
              />
              Feminino
            </label>
            
            <label>
              <input
                type="radio"
                name="sexo"
                value="masculino"
                checked={formData.sexo === 'masculino'}
                onChange={handleChange}
              />
              Masculino
            </label>
            
            <label>
              <input
                type="radio"
                name="sexo"
                value="outro"
                checked={formData.sexo === 'outro'}
                onChange={handleChange}
              />
              Outro
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input 
            type="date" 
            id="dataNascimento" 
            name="dataNascimento" 
            value={formData.dataNascimento}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label>Tipo de Atividade</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="tipoAtividade"
                value="palestras"
                checked={formData.tipoAtividade === 'palestras'}
                onChange={handleChange}
                required
              />
              Palestras / Mesas Redondas
            </label>
            
            <label>
              <input
                type="radio"
                name="tipoAtividade"
                value="workshops"
                checked={formData.tipoAtividade === 'workshops'}
                onChange={handleChange}
              />
              Workshops / Oficinas
            </label>
          </div>
        </div>

        {formData.tipoAtividade === 'palestras' && (
          <div className="form-group">
            <label>Selecione a Mesa</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="mesaSelecionada"
                  value="mesa1"
                  checked={formData.mesaSelecionada === 'mesa1'}
                  onChange={handleChange}
                  required
                />
                Mesa 1
              </label>
              
              <label>
                <input
                  type="radio"
                  name="mesaSelecionada"
                  value="mesa2"
                  checked={formData.mesaSelecionada === 'mesa2'}
                  onChange={handleChange}
                />
                Mesa 2
              </label>
              
              <label>
                <input
                  type="radio"
                  name="mesaSelecionada"
                  value="mesa3"
                  checked={formData.mesaSelecionada === 'mesa3'}
                  onChange={handleChange}
                />
                Mesa 3
              </label>
            </div>
          </div>
        )}

        {formData.tipoAtividade === 'workshops' && (
          <div className="form-group">
            <label>Selecione a Oficina</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="oficinaSelecionada"
                  value="oficina1"
                  checked={formData.oficinaSelecionada === 'oficina1'}
                  onChange={handleChange}
                  required
                />
                Oficina Espaço 1
              </label>
              
              <label>
                <input
                  type="radio"
                  name="oficinaSelecionada"
                  value="oficina2"
                  checked={formData.oficinaSelecionada === 'oficina2'}
                  onChange={handleChange}
                />
                Oficina Espaço 2
              </label>
            </div>
          </div>
        )}

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

export default Form;
import React, { useState } from 'react';
import './Form.css';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    celular: '',
    instagram: '',
    sexo: '',
    dataNascimento: '',
    diaEvento: '',
    tipoAtividade: '',
    tipoWorkshop: '',
    mesaSelecionada: '',
    horariosWorkshop: [],
    horariosPalestra: [],
    horariosDebate: [],
    aceitouTermos: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Horários específicos para cada mesa
  const horariosPorMesa = {
    'Mesa 1': ['10:00', '13:30', '16:00'], // ✅ Apenas horários iniciais
    'Mesa 2': ['10:25', '13:55', '16:25'],
    'Mesa 3': ['10:45', '14:15', '16:45']
  };

  const showNotification = (type, message) => {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: type === 'error' ? 'error-toast' : 'success-toast'
    };

    if (type === 'error') {
      toast.error(message, options);
    } else {
      toast.success(message, options);
    }
  };

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

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    
    setFormData(prev => {
      const currentArray = [...prev[name]];
      if (checked) {
        return {
          ...prev,
          [name]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [name]: currentArray.filter(item => item !== value)
        };
      }
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.aceitouTermos) {
      showNotification('error', 'Você deve aceitar os termos para continuar');
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      // Objeto base com campos obrigatórios
      const dadosBase = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        celular: formData.celular.replace(/[^\d]/g, ''),
        instagram: formData.instagram.trim(),
        sexo: formData.sexo,
        dataNascimento: formData.dataNascimento,
        diaEvento: formData.diaEvento,
        tipoAtividade: formData.tipoAtividade,
        aceitouTermos: true,
        dataCadastro: serverTimestamp()
      };
  
      // Adiciona campos específicos conforme o tipo de atividade
      const dadosCondicionais = {};
      
      if (formData.tipoAtividade === 'workshops') {
        dadosCondicionais.tipoWorkshop = formData.tipoWorkshop;
        if (formData.horariosWorkshop.length > 0) {
          dadosCondicionais.horariosWorkshop = formData.horariosWorkshop;
        }
      }
      
      if (formData.tipoAtividade === 'palestras' || formData.tipoAtividade === 'debates') {
        dadosCondicionais.mesaSelecionada = formData.mesaSelecionada;
        
        const horarios = formData.tipoAtividade === 'palestras' 
          ? formData.horariosPalestra 
          : formData.horariosDebate;
        
        if (horarios.length > 0) {
          dadosCondicionais[
            formData.tipoAtividade === 'palestras' 
              ? 'horariosPalestra' 
              : 'horariosDebate'
          ] = horarios;
        }
      }
  
      // Combina os dados base com os condicionais
      const dadosParaEnviar = { ...dadosBase, ...dadosCondicionais };
      
      await addDoc(collection(db, "inscricoes"), dadosParaEnviar);
      
      showNotification('success', 'Formulário enviado com sucesso!');
      
      // Reset do formulário
      setFormData({
        nome: '',
        email: '',
        celular: '',
        instagram: '',
        sexo: '',
        dataNascimento: '',
        diaEvento: '',
        tipoAtividade: '',
        tipoWorkshop: '',
        mesaSelecionada: '',
        horariosWorkshop: [],
        horariosPalestra: [],
        horariosDebate: [],
        aceitouTermos: false
      });
      
    } catch (error) {
      console.error("Erro detalhado:", error);
      showNotification('error', `Erro ao enviar: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
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
          <label>Dia do Evento</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="diaEvento"
                value="6"
                checked={formData.diaEvento === '6'}
                onChange={handleChange}
                required
              />
              Dia 6
            </label>
            
            <label>
              <input
                type="radio"
                name="diaEvento"
                value="7"
                checked={formData.diaEvento === '7'}
                onChange={handleChange}
              />
              Dia 7
            </label>
          </div>
        </div>

        {formData.diaEvento && (
          <div className="form-group">
            <label>Tipo de Atividade</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="tipoAtividade"
                  value="workshops"
                  checked={formData.tipoAtividade === 'workshops'}
                  onChange={handleChange}
                  required
                />
                Workshops / Oficinas Laboratórios
              </label>
              
              <label>
                <input
                  type="radio"
                  name="tipoAtividade"
                  value="palestras"
                  checked={formData.tipoAtividade === 'palestras'}
                  onChange={handleChange}
                />
                Palestras no Teatro
              </label>
              
              <label>
                <input
                  type="radio"
                  name="tipoAtividade"
                  value="debates"
                  checked={formData.tipoAtividade === 'debates'}
                  onChange={handleChange}
                />
                Debates / Mesas Redondas no Auditório
              </label>
            </div>
          </div>
        )}

        {formData.tipoAtividade === 'workshops' && (
          <>
            <div className="form-group">
              <label>Tipo de Workshop</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="tipoWorkshop"
                    value="oficina1"
                    checked={formData.tipoWorkshop === 'oficina1'}
                    onChange={handleChange}
                    required
                  />
                  Oficina Espaço 1
                </label>
                
                <label>
                  <input
                    type="radio"
                    name="tipoWorkshop"
                    value="oficina2"
                    checked={formData.tipoWorkshop === 'oficina2'}
                    onChange={handleChange}
                  />
                  Oficina Espaço 2
                </label>
              </div>
            </div>

            {formData.tipoWorkshop && (
              <div className="form-group">
                <label>Horários Disponíveis (Workshops)</label>
                <div className="checkbox-group">
                  {['11:00', '13:00', '15:00', '17:00'].map((horario) => (
                    <label key={horario}>
                      <input
                        type="checkbox"
                        name="horariosWorkshop"
                        value={horario}
                        checked={formData.horariosWorkshop.includes(horario)}
                        onChange={handleCheckboxChange}
                      />
                      {horario}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {(formData.tipoAtividade === 'palestras' || formData.tipoAtividade === 'debates') && (
          <div className="form-group">
            <label>Selecione a Mesa</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="mesaSelecionada"
                  value="Mesa 1"
                  checked={formData.mesaSelecionada === 'Mesa 1'}
                  onChange={handleChange}
                  required
                />
                Mesa 1
              </label>
              
              <label>
                <input
                  type="radio"
                  name="mesaSelecionada"
                  value="Mesa 2"
                  checked={formData.mesaSelecionada === 'Mesa 2'}
                  onChange={handleChange}
                />
                Mesa 2
              </label>
              
              <label>
                <input
                  type="radio"
                  name="mesaSelecionada"
                  value="Mesa 3"
                  checked={formData.mesaSelecionada === 'Mesa 3'}
                  onChange={handleChange}
                />
                Mesa 3
              </label>
            </div>
          </div>
        )}

        {formData.mesaSelecionada && (
          <div className="form-group">
            <label>Horários Disponíveis ({formData.mesaSelecionada})</label>
            <div className="checkbox-group">
              {horariosPorMesa[formData.mesaSelecionada].map((horario) => (
                <label key={horario}>
                  <input
                    type="checkbox"
                    name={
                      formData.tipoAtividade === 'palestras' 
                        ? 'horariosPalestra' 
                        : 'horariosDebate'
                    }
                    value={horario}
                    checked={
                      formData.tipoAtividade === 'palestras'
                        ? formData.horariosPalestra.includes(horario)
                        : formData.horariosDebate.includes(horario)
                    }
                    onChange={handleCheckboxChange}
                  />
                  {horario}
                </label>
              ))}
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
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default Form;
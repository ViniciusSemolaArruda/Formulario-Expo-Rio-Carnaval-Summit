import React from 'react';
import './Termos.css';
import { Link } from 'react-router-dom';

const Termos = () => {
  return (
    <div className="termos-container">
      <div className="termos-content">
        <h1>Termos e Condições</h1>
        <p className="intro-text">Bem-vindo ao nosso site. Ao acessar e utilizar nossos serviços, você concorda com os seguintes Termos e Condições:</p>
        
        <div className="termos-section">
          <h2>1. Coleta de Informações</h2>
          <p>Você se compromete a fornecer informações verdadeiras, precisas e completas ao preencher os formulários presentes em nosso site. Essas informações poderão ser utilizadas para fins de cadastro, contato e comunicação.</p>
        </div>

        <div className="termos-section">
          <h2>2. Uso de Dados Pessoais</h2>
          <p>Em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018), os dados fornecidos serão armazenados de forma segura, sendo utilizados exclusivamente para os fins mencionados acima. Não compartilharemos seus dados com terceiros sem o seu consentimento, exceto quando exigido por lei ou regulamento.</p>
        </div>

        <div className="termos-section">
          <h2>3. Direitos do Titular dos Dados</h2>
          <p>Você possui, a qualquer momento, o direito de acessar, corrigir, atualizar, solicitar a exclusão ou revogar o consentimento sobre os seus dados pessoais. Para exercer esses direitos, basta entrar em contato conosco por meio dos canais disponibilizados em nosso site.</p>
        </div>

        <div className="termos-section">
          <h2>4. Armazenamento e Segurança</h2>
          <p>Implementamos medidas de segurança para proteger as informações pessoais que você nos fornecer contra acesso não autorizado, alteração ou destruição. No entanto, nenhuma transmissão de dados pela internet é 100% segura, e não podemos garantir a segurança absoluta das informações durante a transmissão.</p>
        </div>

        <div className="termos-section">
          <h2>5. Alterações nos Termos</h2>
          <p>Reservamo-nos o direito de modificar ou atualizar estes Termos e Condições a qualquer momento. Quaisquer alterações serão publicadas nesta página e entrarão em vigor imediatamente após sua publicação. Recomendamos que você consulte esta página regularmente para se manter informado sobre as alterações.</p>
        </div>

        <div className="termos-section">
          <h2>6. Direito de Imagem</h2>
          <p>Ao utilizar nossos serviços e fornecer imagens, você nos concede o direito de explorar, de forma profissional, sua imagem no contexto de nossas ações promocionais e publicitárias. Este direito inclui, mas não se limita a, reproduzir, publicar e distribuir a imagem, sempre com o propósito de divulgação relacionada aos nossos serviços, campanhas e materiais institucionais.</p>
        </div>

        <div className="termos-section">
          <h2>7. Dúvidas</h2>
          <p>Se você tiver dúvidas ou preocupações sobre os Termos e Condições ou sobre a coleta e o uso dos seus dados pessoais, entre em contato conosco através dos canais de comunicação disponíveis em nosso site.</p>
        </div>

        <div className="termos-footer">
          <Link to="/" className="back-button">Voltar ao formulário</Link>
          <p className="contact-info">
            Para mais informações, entre em contato conosco através do {' '}
            <a 
              href="https://capadocia-main.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="capadocia-link"
            >
              site Capadócia
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Termos;
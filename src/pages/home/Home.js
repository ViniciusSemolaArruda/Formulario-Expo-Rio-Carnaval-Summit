import React from 'react';
import Inicio from '../../components/inicio/Inicio';


const Home = () => {
    console.log("Home está sendo renderizada!"); // Verifique se essa mensagem aparece no console
    return (
      <div>
        <Inicio/>
      </div>
    );
  };
  
  export default Home;
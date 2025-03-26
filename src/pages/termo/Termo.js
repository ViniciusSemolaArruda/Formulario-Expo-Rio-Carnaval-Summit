import React from 'react';
import Termos from '../../components/termos/Termos';



const Home = () => {
    console.log("Home está sendo renderizada!"); // Verifique se essa mensagem aparece no console
    return (
      <div>
        <Termos/>
      </div>
    );
  };
  
  export default Home;
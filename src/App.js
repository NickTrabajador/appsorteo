import React, { useState } from 'react';
import './Sorteo.css'; // Importa los estilos CSS aquí

const Sorteo = () => {
  const [participantes, setParticipantes] = useState('');
  const [numeroGanadores, setNumeroGanadores] = useState(1);
  const [ganador, setGanador] = useState(null); // Estado para el ganador
  const [showGanador, setShowGanador] = useState(false); // Estado para mostrar animación

  const handleInputChange = (e) => {
    setParticipantes(e.target.value);
  };

  const handleNumeroChange = (e) => {
    setNumeroGanadores(e.target.value);
  };

  const realizarSorteo = () => {
    const listaParticipantes = participantes.split('\n').filter(Boolean);
    if (listaParticipantes.length < numeroGanadores) {
      alert('El número de ganadores supera el número de participantes');
      return;
    }

    const ganadores = [];
    for (let i = 0; i < numeroGanadores; i++) {
      const randomIndex = Math.floor(Math.random() * listaParticipantes.length);
      ganadores.push(listaParticipantes.splice(randomIndex, 1)[0]);
    }

    setGanador(ganadores[0]); // Mostrar solo un ganador por vez en esta demo
    setShowGanador(false); // Resetear la animación

    setTimeout(() => {
      setShowGanador(true); // Disparar la animación después de resetearla
    }, 100); // Delay pequeño para que React recalcule
  };

  const limpiarCampos = () => {
    setParticipantes('');
    setNumeroGanadores(1);
    setGanador(null);
    setShowGanador(false);
  };

  return (
    <div className="sorteo-container">
      <h2>Seleccion de Nombres para sorteo de los 500 Suscriptores</h2>

      <div className="form-group">
        <label>
          <span role="img" aria-label="participants">👥</span> Escribe los participantes del sorteo:
          <span className="info-icon" role="img" aria-label="info"> +500 Suscriptores</span>
        </label>
        <textarea
          rows="10"
          value={participantes}
          onChange={handleInputChange}
          placeholder="Jose\Pepe\Amelia..."
          className="input-participantes"
        />
      </div>

      <div className="form-group">
        <label>
          <span role="img" aria-label="winners">🏆</span> Selecciona el número de ganadores:
        </label>
        <input
          type="number"
          min="1"
          max="500"
          value={numeroGanadores}
          onChange={handleNumeroChange}
          className="input-ganadores"
        />
      </div>

      <button className="btn btn-primary" onClick={realizarSorteo}>
        🏆 Realizar sorteo
      </button>

      <button className="btn btn-secondary" onClick={limpiarCampos}>
        🧹 Limpiar campos
      </button>

      {showGanador && ganador && (
        <div key={ganador} className="ganador-container">
          <p className="ganador-texto">El ganador del sorteo es:</p>
          <span className="ganador-nombre">{ganador}</span>
        </div>
      )}
    </div>
  );
};

export default Sorteo;

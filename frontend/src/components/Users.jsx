// Formulario.js
import React, { useState } from 'react';

const Formulario = () => {
  const [nombre_trabajador, setNombreTrabajador] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');
  const [fecha_contratacion, setFechaContratacion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_trabajador,
          cargo,
          salario,
          fecha_contratacion
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      console.log('Datos enviados correctamente');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <div className='row'>
      <div className="container">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className='card card-body'>
            <div className="form-group">
              <input type="text" onChange={e => setNombreTrabajador(e.target.value)} value={nombre_trabajador} className='form-control' placeholder='nombre_trabajador' autoFocus/>
            </div>
            <div className="form-group">
              <input type="text" onChange={e => setCargo(e.target.value)} value={cargo} className='form-control' placeholder='cargo' autoFocus/>
            </div>
            <div className="form-group">
              <input type="number" onChange={e => setSalario(e.target.value)} value={salario} className='form-control' placeholder='salario' autoFocus/>
            </div>
            <div className="form-group">
              <input type="date" onChange={e => setFechaContratacion(e.target.value)} value={fecha_contratacion} className='form-control' placeholder='fecha_contratacion' autoFocus/>
            </div>
            <button className='btn btn-primary btn-block'>
              create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formulario;

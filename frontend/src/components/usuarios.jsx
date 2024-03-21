import React, { useState, useEffect } from 'react';

const TablaUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    nombre_trabajador: '',
    cargo: '',
    salario: '',
    fecha_contratacion: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users`);
        if (!res.ok) {
          throw new Error('Error al obtener usuarios');
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }

      // Filtrar el usuario eliminado de la lista
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const editUser = (user) => {
    setEditingUser(user);
    setEditedUserData({
      nombre_trabajador: user.nombre_trabajador,
      cargo: user.cargo,
      salario: user.salario,
      fecha_contratacion: user.fecha_contratacion
    });
  }

  const cancelEdit = () => {
    setEditingUser(null);
    setEditedUserData({
      nombre_trabajador: '',
      cargo: '',
      salario: '',
      fecha_contratacion: ''
    });
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value
    });
  }

  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUserData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }

      // Actualizar la lista de usuarios con los datos editados
      const updatedUsers = users.map(user =>
        user._id === editingUser._id ? { ...user, ...editedUserData } : user
      );
      setUsers(updatedUsers);

      // Reiniciar el estado de edición
      cancelEdit();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Filtra los usuarios según el término de búsqueda
  const filteredUsers = users.filter(user =>
    user.nombre_trabajador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fecha_contratacion.includes(searchTerm)
  );

  return (
    <div className="col-md-6">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar trabajador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>nombre_trabajador</th>
            <th>cargo</th>
            <th>salario</th>
            <th>fecha_contratacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.nombre_trabajador}</td>
              <td>{user.cargo}</td>
              <td>{user.salario}</td>
              <td>{user.fecha_contratacion}</td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <>
                    <button className='btn btn-primary btn-sm' onClick={updateUser}>Guardar</button>
                    <button className='btn btn-secondary btn-sm' onClick={cancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className='btn btn-secondary btn-sm' onClick={() => editUser(user)}>Editar</button>
                    <button className='btn btn-secondary btn-sm' onClick={() => deleteUser(user._id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuarios;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch all todos
  const fetchTodos = () => {
    fetch('http://localhost:3000/todo')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const handleSubmit = () => {
    if (!title || !description) return;

    if (editId) {
      fetch(`http://localhost:3000/todo/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })
        .then(res => res.json())
        .then(() => {
          setMessage('Todo updated successfully');
          setEditId(null);
          setTitle('');
          setDescription('');
          fetchTodos();
        });
    } else {
      fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })
        .then(res => res.json())
        .then(() => {
          setMessage('Todo added successfully');
          setTitle('');
          setDescription('');
          fetchTodos();
        });
    }
  };
  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo._id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMessage('Todo deleted successfully');
        fetchTodos();
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">TODO PROJECT</h2>
      <div className="d-flex gap-3 mb-4">
        <input
          className="form-control"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          {editId ? 'Update' : 'Submit'}
        </button>
      </div>

      {message && <p className="text-success">{message}</p>}

      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6>{todo.title}</h6>
              <p className="mb-0">{todo.description}</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={() => handleEdit(todo)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

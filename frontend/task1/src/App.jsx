import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskList([...taskList, task]);
    setTask('');
  };

  return (
    <>
      <h2> ToDo List </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Your Tasks:</h3>
      <ul>
        {taskList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;



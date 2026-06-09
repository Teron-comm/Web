import { useState, useEffect } from 'react';
import './App.css';
import ToDoForm from "./AddTask";
import ToDo from "./Task";
import axios from 'axios';

const STORAGE_KEY = 'space-tasks-data';

function App() {
  const [cryptoRate, setCryptoRate] = useState('Загрузка...');
  const [spaceData, setSpaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        setCryptoRate(`$${res.data.bitcoin.usd}`);
      } catch (err) {
        setCryptoRate('Нет данных');
      }
      try {
        const res = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
        setSpaceData({
            name: 'МКС (ISS)',
            info: `Широта: ${parseFloat(res.data.latitude).toFixed(2)}, Долгота: ${parseFloat(res.data.longitude).toFixed(2)}`
        });
      } catch (err) {
        setSpaceData({ name: 'Данные МКС', info: 'Недоступны' });
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setTodos(parsed);
      } catch (e) {
        setTodos([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        task: text,
        complete: false
      };
      setTodos([...todos, newTask]);
    }
  };

  const removeTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, complete: !t.complete } : t
      )
    );
  };

  return (
    <div className="App">
      <div className='dashboard'>
        <div className='widget crypto-widget'>
          <h3>Курс BTC (USD)</h3>
          <p>{cryptoRate}</p>
        </div>
        
        {spaceData && (
          <div className="widget space-widget">
            <h3>{spaceData.name}</h3>
            <p>{spaceData.info}</p>
          </div>
        )}
      </div>
      
      <header>
        <h1>Задачи на орбите: {todos.length}</h1>
      </header>
      <ToDoForm addTask={addTask} />
      {todos.map((todo) => (
        <ToDo
          todo={todo}
          key={todo.id}
          toggleTask={handleToggle}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
}

export default App;
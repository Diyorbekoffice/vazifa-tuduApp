import React, { useState, useEffect, useRef } from 'react';

interface Task {
  id: number;
  title: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskInputRef = useRef<HTMLInputElement>(null);

  // Local Storage'dan vazifalarni yuklash
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        // JSON.parse bilan saqlangan tasklarni qayta olish
        const parsedTasks: Task[] = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
  }, []);

  // Local Storage'ga vazifalarni saqlash
  useEffect(() => {
    if (tasks.length > 0) {
      try {
        // tasks array'ni JSON formatida saqlash
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
    }
  }, [tasks]);

  const addTask = () => {
    if (taskInputRef.current && taskInputRef.current.value.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: taskInputRef.current.value.trim(),
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      taskInputRef.current.value = ''; // Kiritish maydonini tozalash
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Todo List</h1>
      <input ref={taskInputRef} type="text" placeholder="New Task" />
      <button onClick={addTask}>Add Task</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginTop: '10px' }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

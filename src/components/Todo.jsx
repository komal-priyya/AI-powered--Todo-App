
import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [newtodo, settodo] = useState(() => {
  return localStorage.getItem("input") || "";
});

  // ✅ Load from localStorage
  const [tasks, settasks] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setloading] = useState(false);
  const [currentTaskForSteps, setcurrentTaskForSteps] = useState('');
  const [steps, setSteps] = useState('');
  const [stepsLoading, setStepsLoading] = useState(false);

  const updateInput = (event) => settodo(event.target.value);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
  localStorage.setItem("input", newtodo);
}, [newtodo]);

  const addTodo = () => {
    if (newtodo.trim() === '') return;

    settasks([
      ...tasks,
      {
        id: Date.now(),
        text: newtodo,
        completed: false
      }
    ]);

    settodo('');
  };

  const deleteTodo = (id) =>
    settasks(tasks.filter((task) => task.id !== id));

  const toggleTodo = (id) => {
    settasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleEdit = (task) => {
    setEditIndex(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === '') return;

    settasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
      )
    );

    setEditIndex(null);
    setEditText('');
  };

  // ---------- AI FUNCTIONS (unchanged) ----------
  const getAISuggestion = async (task) => {
    try {
      const res = await fetch(import.meta.env.VITE_OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: `Rewrite task shortly:\n${task}`,
          stream: false,
        }),
      });
      const data = await res.json();
      return data.response;
    } catch (err) {
      console.error(err);
    }
  };

  const handleImprove = async () => {
    if (newtodo.trim() === '') return;

    setloading(true);
    const improved = await getAISuggestion(newtodo);
    if (improved) settodo(improved);
    setloading(false);
  };

  const getTaskSteps = async (task) => {
    try {
      const res = await fetch(import.meta.env.VITE_OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: `Break into steps:\n${task}`,
          stream: false,
        }),
      });
      const data = await res.json();
      return data.response;
    } catch (err) {
      console.error(err);
    }
  };

  const handleBreakTask = async () => {
    if (newtodo.trim() === '') return;

    setStepsLoading(true);
    const result = await getTaskSteps(newtodo);
    if (result) {
      setSteps(result);
      setcurrentTaskForSteps(newtodo);
    }
    settodo('');
    setStepsLoading(false);
  };

  const handleCancel = () => {
    setSteps('');
    setcurrentTaskForSteps('');
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center text-pink-500 mb-6">
          🌸 Todo App 🌸
        </h1>

        <div className="flex mb-5 gap-2 flex-wrap">
          <input
            type="text"
            value={newtodo}
            onChange={updateInput}
            placeholder="Add a new task..."
            className="flex-1 p-3 border rounded-xl"
          />

          <button onClick={addTodo} className="px-4 py-2 bg-pink-400 text-white rounded-xl">
            Add
          </button>

          <button onClick={handleImprove} className="px-3 py-2 bg-pink-400 text-white rounded-xl">
            {loading ? '...' : 'Improve with AI'}
          </button>

          <button onClick={handleBreakTask} className="px-3 py-2 bg-pink-400 text-white rounded-xl">
            {stepsLoading ? '...' : 'Breaks task in Steps'}
          </button>
        </div>

        {steps && (
          <div className="p-3 bg-blue-50 rounded-xl mb-4">
            <b>{currentTaskForSteps}</b>
            <pre>{steps}</pre>
            <button onClick={handleCancel}>X</button>
          </div>
        )}

        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between p-2 bg-pink-100 mb-2 rounded">

              {editIndex === task.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <span className={task.completed ? "line-through" : ""}>
                    {task.text}
                  </span>

                  <div>
                    <button onClick={() => toggleTodo(task.id)}>✔</button>
                    <button onClick={() => handleEdit(task)}>✏️</button>
                    <button onClick={() => deleteTodo(task.id)}>❌</button>
                  </div>
                </>
              )}

            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Todo;
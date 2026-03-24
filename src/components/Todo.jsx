import React, { useState } from 'react';

const Todo = () => {
  const [newtodo, settodo] = useState('');
  const [tasks, settasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setloading] = useState(false);
  const [currentTaskForSteps, setcurrentTaskForSteps] = useState('');
  const [steps, setSteps] = useState('');
  const [stepsLoading, setStepsLoading] = useState(false);

  const updateInput = (event) => settodo(event.target.value);

  const addTodo = () => {
    if (newtodo.trim() === '') return;
    settasks([...tasks, { text: newtodo, completed: false }]);
    settodo('');
  };

  const deleteTodo = (index) => settasks(tasks.filter((_, i) => i !== index));

  const toggleTodo = (index) => {
    settasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    if (editText.trim() === '') return;
    settasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: editText } : task
      )
    );
    setEditIndex(null);
    setEditText('');
  };

  // Improve task with AI
  const getAISuggestion = async (task) => {
    try {
      const res = await fetch(import.meta.env.VITE_OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: `You must ONLY rewrite the task into a short, clear, specific action.

Rules:
- Output ONLY the improved task
- Do NOT explain anything
- Do NOT ask questions
- Keep it under 12 words

Task: ${task}

Improved Task:`,
          stream: false,
        }),
      });
      const data = await res.json();
      return data.response;
    } catch (err) {
      console.error('AI Error:', err);
    }
  };

  const handleImprove = async () => {
    if (newtodo.trim() === '') return;

    setloading(true);
    try{
    const improved = await getAISuggestion(newtodo);
    if (improved) settodo(improved);
    else alert('AI not responding. Check Ollama.');
    }catch(err){
        console.error(err);
       alert('Cannot connect to Ollama. Is it running?')
    }
     setloading(false);
  };

  // Break task into steps
  const getTaskSteps = async (task) => {
    try {
      const res = await fetch(import.meta.env.VITE_OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: `Break this task into 3-5 short actionable steps.
Only return steps as a list. No explanation.

Task: ${task}`,
          stream: false,
          options: { temperature: 0.2, num_predict: 100 },
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
  const taskToBreak = newtodo;
  settodo('');

  try {
    const result = await getTaskSteps(taskToBreak);
    if (result) {
      setSteps(result);
      setcurrentTaskForSteps(taskToBreak);
    } else {
      alert('AI did not return steps. Check Ollama server.');
      setSteps('');
      setcurrentTaskForSteps('');
    }
  } catch (err) {
    console.error(err);
    alert('Cannot connect to Ollama. Is it running?');
    setSteps('');
    setcurrentTaskForSteps('');
  }
  setStepsLoading(false);
};

  const handleCancel = () => {
    setSteps('');
    setcurrentTaskForSteps('');
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4 font-sans">
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
            className="flex-1 p-3 border border-pink-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm placeholder-pink-300"
          />
          <button
            onClick={addTodo}
            className="px-5 py-3 bg-pink-400 text-white font-semibold rounded-r-xl hover:bg-pink-500 transition transform hover:scale-105 shadow-md"
          >
            Add
          </button>
          <button
            onClick={handleImprove}
            className="px-2 py-1 m-1 bg-pink-400 text-white font-semibold rounded-xl hover:bg-pink-500 shadow-md"
          >
            {loading ? 'Loading...' : 'Improve with AI✨'}
          </button>
          <button
            onClick={handleBreakTask}
            className="px-3 py-2 m-1 bg-pink-400 text-white font-semibold rounded-xl"
          >
            {stepsLoading ? '...' : 'Break task into steps'}
          </button>
        </div>

        {steps && (
          <div className="mt-4 p-3 bg-blue-50 rounded-xl">
            <pre className="text-pink-400 font-semibold">{currentTaskForSteps}</pre>
            <h2 className="font-semibold text-blue-600 mb-2">Steps:</h2>
            <pre className="text-sm text-blue-800 whitespace-pre-wrap">{steps}</pre>
            <button
              onClick={handleCancel}
              className="bg-pink-400 px-2 rounded-xl"
            >
              X
            </button>
          </div>
        )}

        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between mb-3 p-3 bg-pink-100 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {editIndex === index ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 p-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    onClick={() => saveEdit(index)}
                    className="ml-2 px-4 py-1 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition transform hover:scale-105"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`flex-1 text-lg ${
                      task.completed
                        ? 'line-through text-pink-300 font-semibold'
                        : 'text-pink-700 font-medium'
                    }`}
                  >
                    {task.text}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleTodo(index)}
                      className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-xl hover:bg-yellow-300 hover:scale-105 transition"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 hover:scale-105 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      className="px-3 py-1 bg-red-200 text-red-700 rounded-xl hover:bg-red-300 hover:scale-105 transition"
                    >
                      Delete
                    </button>
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
import React, { useState } from "react";
import TodoItem from "./components/Todoitem";
import Header from "./components/Header";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (idx) => {
    setTodos(todos.map((todo, i) =>
      i === idx ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Header />
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mt-6">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            className="border rounded px-2 py-1 flex-1"
            type="text"
            placeholder="やることを入力"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="bg-blue-500 text-white rounded px-4 py-1" type="submit">
            追加
          </button>
        </form>
        <ul className="space-y-2">
          {todos.map((todo, idx) => (
            <TodoItem
              key={idx}
              todo={todo}
              onToggle={() => toggleTodo(idx)}
              onDelete={() => deleteTodo(idx)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className="flex items-center justify-between p-2 border rounded hover:bg-gray-100">
            <span
                className={`flex-1 cursor-pointer ${todo.done ? "line-through text-gray-400" : ""}`}
                onClick={onToggle}
            >
                {todo.text}
            </span>
            <button className="ml-3 text-red-500 hover:underline" onClick={onDelete}>
                削除
            </button>
        </li>
    );
}

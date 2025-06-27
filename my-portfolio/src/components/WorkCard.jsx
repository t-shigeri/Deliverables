import React from "react";

function WorkCard({ image, title, description, link }) {
  return (
    <div className="bg-white shadow-md rounded overflow-hidden">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </a>
    </div>
  );
}

export default WorkCard;

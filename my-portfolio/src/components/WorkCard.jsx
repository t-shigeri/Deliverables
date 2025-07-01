import React from "react";

function WorkCard({ image, title, description, link }) {
  return (
    <div className="work-card">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} className="work-image" />
        <div className="work-text">
          <h3 className="work-title">{title}</h3>
          <p className="work-subtitle">{description}</p>
        </div>
      </a>
    </div>
  );
}

export default WorkCard;

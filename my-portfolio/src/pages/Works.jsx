import React from 'react';
import WorkCard from '../components/WorkCard';
import '../style/works.css';
import works from '../data/works.json';

function Works() {
  return (
    <div className="works-wrapper">
      <h2 className="works-title">WORKS</h2>
      <div className="works-list">
        {works.map((work, index) => (
          <WorkCard
            key={index}
            image={work.image}
            title={work.title}
            description={work.description}
            link={work.link}
          />
        ))}
      </div>
    </div>
  );
}

export default Works;

import React, { useEffect, useState } from 'react';
import WorkCard from '../components/WorkCard';
import '../style/works.css';

function Works() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch('/data/works.json')
      .then((res) => {
        if (!res.ok) throw new Error('データ取得失敗');
        return res.json();
      })
      .then((data) => setWorks(data))
      .catch((err) => console.error('Fetchエラー:', err));
  }, []);

  return (
    <div className="works-wrapper">
      <h2 className="works-title">WORKS</h2>
      <div className="works-list">
        {works.map((work) => (
          <WorkCard
            key={work.id || work.title} // IDがなければtitleを代用
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

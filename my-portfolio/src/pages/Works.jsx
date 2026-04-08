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
        {works.map((work) => {
          const isComingSoon = work.status === 'coming';

          return (
            <WorkCard
              key={work.id || work.title}
              image={work.image}
              title={work.title}
              description={
                isComingSoon
                  ? `${work.description}（現在　デプロイ前）`
                  : work.description
              }
              link={isComingSoon ? null : work.link}
              disabled={isComingSoon}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Works;
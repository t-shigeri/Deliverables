import React from 'react';
import WorkCard from '../components/WorkCard';
import '../style/works.css';


function Works() {
  const works = [
    {
      image: '/assets/portfolioimage.png',
      title: 'ポートフォリオサイト',
      description: 'ReactとViteで制作。私のポートフォリオ。',
      link: 'https://example.com/portfolio',
    },
    {
      image: '/assets/pc.png',
      title: 'トイレ検索アプリ',
      description: 'React + Map API + Tailwindで開発。近場のトイレを検索することができる。',
      link: 'https://example.com/toilet-app',
    },
  ];

  return (
    <div className="works-wrapper">
      <h2 className="works-title">作品一覧</h2>
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

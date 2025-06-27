import WorkCard from '../components/WorkCard';
function Works() {
    const works = [
        {
            image: '/assets/portfolio.png',
            title: 'ポートフォリオサイト',
            description: 'ReactとViteで制作。私のポートフォリオ。',
            link: 'https://example.com/portfolio',
        },
        {
            image: '/assets/portfolio.png',
            title: 'トイレ検索アプリ',
            description: 'React + Map API + Tailwindで開発。近場のトイレを検索することができる。',
            link: 'https://example.com/toilet-app',
        },
    ];

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-center">作品一覧</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {works.map((work, index) => (
                    <WorkCard
                        key={index}
                        image={work.image}
                        title={work.title}
                        description={work.description}
                        link={work.link} />
                ))}
            </div>
        </div>
    );
}

export default Works;

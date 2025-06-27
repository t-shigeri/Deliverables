const WorkCard = ({ image, title, description, link }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          詳しく見る
        </a>
      </div>
    </div>
  );
};

export default WorkCard;

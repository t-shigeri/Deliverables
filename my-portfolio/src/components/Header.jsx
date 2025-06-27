import { Link } from 'react-router-dom';

const Header = () => (
  <header className="p-4 bg-white shadow-md">
    <nav className="flex justify-center gap-6">
      <Link to="/" className="hover:underline">ホーム</Link>
      <Link to="/about" className="hover:underline">自己紹介</Link>
      <Link to="/works" className="hover:underline">作品</Link>
      <Link to="/contact" className="hover:underline">お問い合わせ</Link>
    </nav>
  </header>
);

export default Header;

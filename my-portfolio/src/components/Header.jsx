import React from 'react';

export default function Header() {
    const scrollTo = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="site-header">
            <nav className="nav-bar">
                <button onClick={() => scrollTo('about')}>自己紹介</button>
                <button onClick={() => scrollTo('works')}>制作実績</button>
                <button onClick={() => scrollTo('contact')}>お問い合わせ</button>
            </nav>
        </header>
    );
}

import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🚻 WashMap!</div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <a href="/">ホーム</a>
          </li>
          <li>
            <a href="#map">マップを見る</a>
          </li>
          {/* 必要に応じてリンクを追加 */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

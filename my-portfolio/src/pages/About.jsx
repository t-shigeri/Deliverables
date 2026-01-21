import React, { useEffect, useState } from "react";
import "../style/aboutDigest.css"; // ← 新しく作るCSS

export default function About() {
  const [githubUser, setGithubUser] = useState(null);
  const username = "t-shigeri";

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => setGithubUser(data))
      .catch((err) => console.error("GitHub情報の取得に失敗:", err));
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target); // 1回表示したら終わり
            }
          });
        },
        {
          root: null,
          threshold: 0.15,              // 15%見えたら発火
          rootMargin: "0px 0px -10% 0px" // 少し早めに発火
        }
      );

      targets.forEach((el) => io.observe(el));

      return () => io.disconnect();
    }, []);

  return (
    <main className="digest" id="about">
      {/* HERO */}
      <header className="digest-hero">
        <span className="digest-hero-bg" aria-hidden="true">
          ABOUT
        </span>
        <p className="digest-kicker">ABOUT</p>

        <h1 className="digest-title">
          Shigeri
          <br />
          Enta
        </h1>

        <p className="digest-lead">
          React を中心に、遊び心ある UI とアニメーションで
          “触って気持ちいい体験”をつくります。
        </p>

        <div className="digest-tags" aria-label="categories">
          <span className="digest-tag">FRONTEND</span>
          <span className="digest-tag">UI / UX</span>
          <span className="digest-tag">ANIMATION</span>
          <span className="digest-tag">FUKUOKA</span>
        </div>

        <a className="digest-cta" href="#message">
          SCROLL <span aria-hidden="true">↓</span>
        </a>
      </header>

      {/* MESSAGE */}
      <section className="digest-section reveal" id="message">
        <div className="digest-section-head">
          <h2 className="digest-section-title">MESSAGE</h2>
          <p className="digest-section-sub">つくる理由</p>
        </div>

        <div className="digest-body">
          <p className="digest-text">
            画面を触った瞬間に「楽しい」「使いやすい」と感じてもらえる体験が好きです。
            小さな動き・余白・導線まで含めて “体験としてのUI” を意識して開発しています。
          </p>

          <a className="digest-more" href="#value">
            VIEW MORE <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* VALUE */}
      <section className="digest-section reveal" id="value">
        <div className="digest-section-head">
          <h2 className="digest-section-title">VALUE</h2>
          <p className="digest-section-sub">強み</p>
        </div>

        <div className="digest-grid">
          <article className="digest-card">
            <h3 className="digest-card-title">体験から逆算</h3>
            <p className="digest-card-text">
              ユーザーがどう感じるかを起点に、UIを組み立てます。
            </p>
          </article>

          <article className="digest-card">
            <h3 className="digest-card-title">アニメーション設計</h3>
            <p className="digest-card-text">
              目立たせるより、伝わる・気持ちいい動きを選びます。
            </p>
          </article>

          <article className="digest-card">
            <h3 className="digest-card-title">チームでの調整</h3>
            <p className="digest-card-text">
              UIの方向性をまとめ、統一感ある画面に整えるのが得意です。
            </p>
          </article>

          <article className="digest-card">
            <h3 className="digest-card-title">改善の回転</h3>
            <p className="digest-card-text">
              試作→検証→切り戻しをコミット単位で回して磨きます。
            </p>
          </article>
        </div>
      </section>

      {/* TECHNOLOGY + GitHub Card */}
      <section className="digest-section reveal" id="tech">
        <div className="digest-section-head">
          <h2 className="digest-section-title">TECHNOLOGY</h2>
          <p className="digest-section-sub">技術</p>
        </div>

        <div className="digest-split">
          <div className="digest-tech">
            <ul className="digest-list">
              <li><span className="digest-bullet" /> React / Vite</li>
              <li><span className="digest-bullet" /> HTML / CSS / JavaScript</li>
              <li><span className="digest-bullet" /> Java / Python</li>
              <li><span className="digest-bullet" /> Git / GitHub</li>
              <li><span className="digest-bullet" /> API（fetch）</li>
            </ul>

            <a className="digest-more" href="#profile">
              VIEW MORE <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* GitHub profile */}
          <div id="profile" className="digest-profile">
            <div className="digest-profile-card">
              <div className="digest-profile-top">
                <div className="digest-avatar">
                  {githubUser ? (
                    <img
                      src={githubUser.avatar_url}
                      alt="GitHubアイコン"
                      loading="lazy"
                    />
                  ) : (
                    <div className="digest-avatar-skeleton" />
                  )}
                </div>

                <div className="digest-profile-meta">
                  <p className="digest-profile-name">
                    {githubUser ? (githubUser.name || username) : "Loading..."}
                  </p>
                  <p className="digest-profile-handle">@{username}</p>
                </div>
              </div>

              {githubUser && (
                <div className="digest-profile-stats">
                  <p>公開リポジトリ数：{githubUser.public_repos}</p>
                  <p>フォロワー数：{githubUser.followers}</p>
                </div>
              )}

              <a
                className="digest-btn"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHubを見る →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOBBY（軽く） */}
      <section className="digest-section reveal" id="hobby">
        <div className="digest-section-head">
          <h2 className="digest-section-title">HOBBY</h2>
          <p className="digest-section-sub">趣味</p>
        </div>

        <div className="digest-body">
          <p className="digest-text">
            映画 / ポケカ / アコースティックギター。作品づくりの気分転換にもなってます。
          </p>
        </div>
      </section>
    </main>
  );
}


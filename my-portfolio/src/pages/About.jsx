import React, { useEffect, useState } from 'react';
import '../style/github.css'; // ← github.css を読み込み

export default function About() {
  const [githubUser, setGithubUser] = useState(null);
  const username = "t-shigeri"; // ← ご自身のGitHubユーザー名に書き換え

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => setGithubUser(data))
      .catch((err) => console.error("GitHub情報の取得に失敗:", err));
  }, []);

  return (
    <section className="about-text" id="about">
      <h2 className="section-title">自己紹介</h2>
      <p>
        私は福岡情報ITクリエイター専門学校に通う専門学生で、主に JavaScript / Java / Python を学んでいます。
        フロントエンドでは React を使った遊び心あるUIや、アニメーションに力を入れた開発を得意としています。
      </p>

      {githubUser && (
        <section className="github-profile-section">
          <div className="github-card">
            <img
              src={githubUser.avatar_url}
              alt="GitHubアイコン"
              className="github-avatar"
            />
            <div className="github-info">
              <h3>{githubUser.name}（@{githubUser.login}）</h3>
              <p>公開リポジトリ数：{githubUser.public_repos}</p>
              <p>フォロワー数：{githubUser.followers}</p>
              <a
                href={githubUser.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                GitHubを見る →
              </a>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

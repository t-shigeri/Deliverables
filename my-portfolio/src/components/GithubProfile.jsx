import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

export default function GithubProfile() {
    return (
        <section className="github-profile-section" id="github">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                GitHub
            </motion.h2>

            <motion.div
                className="github-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <img
                    src="https://avatars.githubusercontent.com/u/00000000?v=4"
                    alt="GitHubアイコン"
                    className="github-avatar"
                />
                <div className="github-info">
                    <h3><FaGithub /> enta-sakari</h3>
                    <p>React / Flask / Java を中心に学んでいる専門学生。遊び心あるUIや、アニメーションに力を入れた開発が得意です。</p>
                    <a
                        href="https://github.com/enta-sakari"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                    >
                        GitHub プロフィールを見る →
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

import React from 'react';
import { motion } from 'framer-motion';

const works = [
    {
        title: "トイレ検索アプリ",
        description: "React + Google Maps API を使用して、現在地周辺のトイレを探せるアプリ。",
        github: "https://github.com/t-shigeri/Deliverables/tree/main/washmap/nearby-toilet-app"
    },
    {
        title: "学生管理システム",
        description: "Java + JSP + H2 DB による学生情報管理。登録・更新・一覧表示機能を担当。MVC構成で開発。",
        github: "https://github.com/t-shigeri/point"
    },
    {
        title: "顔認識アプリ",
        description: "AWS Rekognition を用いたPython Flaskアプリで顔画像から個人を識別。VSCodeで開発・検証。",
    },
];

export default function Works() {
    return (
        <section className="works-section" id="works">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                制作実績
            </motion.h2>

            <div className="works-list">
                {works.map((work, index) => (
                    <motion.div
                        key={index}
                        className="work-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 }}
                    >
                        <h3>{work.title}</h3>
                        <p>{work.description}</p>
                        {work.github && (
                            <a
                                href={work.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-link"
                            >
                                GitHub リポジトリを見る →
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

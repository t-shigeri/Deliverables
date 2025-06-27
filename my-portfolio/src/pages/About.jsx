import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <section className="about-section" id="about">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                自己紹介
            </motion.h2>
            <motion.p
                className="about-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                ITの専門学校でフロントエンドからバックエンドまで幅広く学んでいます。React、Flask、Java Pythonを使った開発経験があり、遊び心あるUIやアニメーション表現を通して、ユーザーに驚きと楽しさを届けるのが得意です。
            </motion.p>
        </section>
    );
}

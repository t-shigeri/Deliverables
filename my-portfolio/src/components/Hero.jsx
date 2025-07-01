import React from 'react';
import { motion } from 'framer-motion';
import '../style/hero.css'; // 必ず追加すること！

const name = "Enta Shigeri";
const catchphrase = "--Portfolio--";

export default function Hero() {
  return (
    <section className="hero">
      <div className="bird-background"></div>

      <motion.h1
        className="hero-name"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {name.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {catchphrase.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}

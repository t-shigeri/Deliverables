import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <section className="contact-section" id="contact">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                お問い合わせ
            </motion.h2>

            {!submitted ? (
                <motion.form
                    className="contact-form"
                    action="https://formspree.io/f/manorjzd"
                    method="POST"
                    onSubmit={() => setSubmitted(true)}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <input type="text" name="name" placeholder="お名前" required />
                    <input type="email" name="email" placeholder="メールアドレス" required />
                    <textarea name="message" placeholder="メッセージ" required></textarea>
                    <button type="submit">送信</button>
                </motion.form>
            ) : (
                <motion.p
                    className="thanks-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    お問い合わせありがとうございました！
                </motion.p>
            )}
        </section>
    );
}

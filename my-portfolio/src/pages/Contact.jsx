import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // 送信処理をフックする
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.target);

        // Formspreeのエンドポイントにfetch送信
        const response = await fetch('https://formspree.io/f/manorjzd', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
        });

        if (response.ok) {
            setSubmitted(true);
            e.target.reset();
        } else {
            setError('送信に失敗しました。時間を置いてお試しください。');
        }
    };

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
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <input type="text" name="name" placeholder="お名前" required />
                    <input type="email" name="email" placeholder="メールアドレス" required />
                    <textarea name="message" placeholder="メッセージ" required />
                    <button type="submit">送信</button>
                    {error && (
                        <div className="form-error">{error}</div>
                    )}
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

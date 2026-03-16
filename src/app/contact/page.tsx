"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import styles from './Contact.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <div className={styles.contactPage}>
      <Header />
      <main className={`${styles.main} container`}>
        {submitted ? (
          <div className={styles.successMessage}>
            <h2>문의가 성공적으로 접수되었습니다.</h2>
            <p>빠른 시일 내에 답변 드리겠습니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>문의하기</h2>
            <input 
              type="text" 
              placeholder="성함" 
              required 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
              className={styles.input}
            />
            <input 
              type="email" 
              placeholder="이메일" 
              required 
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})} 
              className={styles.input}
            />
            <input 
              type="text" 
              placeholder="제목" 
              required 
              value={form.subject} 
              onChange={e => setForm({...form, subject: e.target.value})} 
              className={styles.input}
            />
            <textarea 
              placeholder="문의 내용" 
              required 
              rows={8} 
              value={form.message} 
              onChange={e => setForm({...form, message: e.target.value})} 
              className={styles.textarea}
            />
            <button type="submit" className={styles.submitBtn}>
              문의 남기기
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

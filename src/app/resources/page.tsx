'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackgroundDecor from '../../components/BackgroundDecor';
import styles from './Resources.module.css';

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/posts?type=resource');
      const data = await res.json();
      setResources(data);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <BackgroundDecor />
      <Header />
      <main className="container">
        <section className={styles.hero}>
          <h1>자료실</h1>
          <p>공유 가능한 다양한 기술 자료와 양식을 다운로드 받으실 수 있습니다.</p>
        </section>

        <section className={styles.content}>
          {loading ? (
            <div className={styles.loading}>자료를 불러오는 중입니다...</div>
          ) : resources.length === 0 ? (
            <div className={styles.empty}>등록된 자료가 없습니다.</div>
          ) : (
            <div className={styles.grid}>
              {resources.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.category}>자료</span>
                    <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className={styles.preview}>{item.content.substring(0, 100)}...</p>
                  
                  {item.fileUrls && JSON.parse(item.fileUrls).length > 0 && (
                    <div className={styles.files}>
                      {JSON.parse(item.fileUrls).map((url: string, idx: number) => (
                        <a 
                          key={idx} 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.downloadBtn}
                        >
                          📎 {decodeURIComponent(url.split('/').pop() || '파일 다운로드')}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

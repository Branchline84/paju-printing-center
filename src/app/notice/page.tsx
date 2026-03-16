"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';
import styles from './NoticePage.module.css';
import Link from 'next/link';

interface Post {
  id: number;
  type: string;
  title: string;
  createdAt: string;
}

export default function NoticePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'notice' | 'news'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = '/api/posts';
      const params = new URLSearchParams();
      if (activeTab !== 'all') {
        params.append('type', activeTab);
      }
      if (searchTerm) params.append('q', searchTerm);
      
      const res = await fetch(`${url}?${params.toString()}`);
      const data = await res.json();
      
      if (activeTab === 'all') {
        // Only show notice and news in this page
        const filtered = data.filter((p: any) => p.type === 'notice' || p.type === 'news');
        setPosts(filtered);
      } else {
        setPosts(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [activeTab, searchTerm]);

  return (
    <div className={styles.noticePage}>
      <Header />
      
      <section className={styles.banner}>
        <div className="container">
          <h1>{t('notice')}</h1>
          <p>파주인쇄소공인특화지원센터의 공식 보도자료와 공지사항을 확인하실 수 있습니다.</p>
        </div>
      </section>

      <main className="container">
        <div className={styles.boardHeader}>
          <div className={styles.tabs}>
            <button 
              className={activeTab === 'all' ? styles.active : ''} 
              onClick={() => setActiveTab('all')}
            >
              전체
            </button>
            <button 
              className={activeTab === 'notice' ? styles.active : ''} 
              onClick={() => setActiveTab('notice')}
            >
              공지사항
            </button>
            <button 
              className={activeTab === 'news' ? styles.active : ''} 
              onClick={() => setActiveTab('news')}
            >
              센터소식
            </button>
          </div>
          
          <div className={styles.searchWrapper}>
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="제목으로 검색" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          {loading ? (
            <div className={styles.emptyState}>데이터를 불러오는 중입니다...</div>
          ) : posts.length > 0 ? (
            <table className={styles.boardTable}>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>번호</th>
                  <th style={{ width: '120px' }}>구분</th>
                  <th>제목</th>
                  <th style={{ width: '150px' }}>작성일</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <td>{posts.length - index}</td>
                    <td>
                      <span className={`${styles.badge} ${post.type === 'notice' ? styles.notice : styles.news}`}>
                        {post.type === 'notice' ? '공지사항' : '센터소식'}
                      </span>
                    </td>
                    <td className={styles.titleCell}>
                      <Link href={`/notice/${post.id}`} className={styles.titleLink}>
                        {post.title}
                      </Link>
                    </td>
                    <td className={styles.dateCell}>
                      {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>검색 결과가 없습니다.</div>
          )}
        </div>
      </main>

      <footer style={{ marginTop: '100px', padding: '60px 0', background: '#f5f5f7', textAlign: 'center', borderTop: '1px solid #e5e5e7' }}>
        <p className={styles.dateCell}>© 2024 Paju Printing Center. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

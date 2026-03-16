"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Notice.module.css';
import Link from 'next/link';
import { getYouTubeThumbnailUrl } from '@/lib/utils';

interface Post {
  id: number;
  type: string;
  title: string;
  createdAt: string;
  content: string;
  imageUrls?: string;
  videoUrl?: string;
}

export default function Notice() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'notice' | 'news'>('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const typeParam = activeTab === 'all' ? '' : `type=${activeTab}`;
        const res = await fetch(`/api/posts?${typeParam}`);
        const data = await res.json();
        
        if (activeTab === 'all') {
          // Filter only notice and news for the home page notice section
          const filtered = data.filter((p: any) => p.type === 'notice' || p.type === 'news');
          setPosts(filtered.slice(0, 6)); // Show top 6
        } else {
          setPosts(data.slice(0, 6));
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    fetchPosts();
  }, [activeTab]);

  return (
    <section className={styles.noticeSection}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h3 className={styles.sectionTitle}>{t('notice')}</h3>
            <p className={styles.sectionSubtitle}>파주인쇄소공인특화지원센터의 최신 소식을 카드뉴스로 만나보세요.</p>
          </div>
          <div className={styles.tabs}>
            <button 
              className={activeTab === 'all' ? styles.activeTab : ''} 
              onClick={() => setActiveTab('all')}
            >
              전체
            </button>
            <button 
              className={activeTab === 'notice' ? styles.activeTab : ''} 
              onClick={() => setActiveTab('notice')}
            >
              공지사항
            </button>
            <button 
              className={activeTab === 'news' ? styles.activeTab : ''} 
              onClick={() => setActiveTab('news')}
            >
              센터소식
            </button>
          </div>
        </div>

        <div className={styles.cardGrid}>
          {loading ? (
            <div className={styles.emptyState}>데이터를 불러오는 중입니다...</div>
          ) : posts.length > 0 ? (
            posts.map((item, index) => (
              <div key={item.id} className={styles.cardItem} style={{ animationDelay: `${index * 0.1}s` }}>
                <Link href={`/notice/${item.id}`} className={styles.cardLink}>
                  <div className={styles.imagePlaceholder}>
                    <div className={styles.overlay}>
                      <span className={`${styles.category} ${item.type === 'notice' ? styles.categoryNotice : styles.categoryNews}`}>
                        {item.type === 'notice' ? '공지사항' : '센터소식'}
                      </span>
                    </div>
                    <div 
                      className={styles.cardThumb} 
                      style={{ 
                        background: (() => {
                          try {
                            const urls = JSON.parse(item.imageUrls || '[]');
                            if (urls.length > 0) return `url(${urls[0]}) center/cover no-repeat`;
                            
                            if (item.videoUrl) {
                              const thumb = getYouTubeThumbnailUrl(item.videoUrl);
                              if (thumb) return `url(${thumb}) center/cover no-repeat`;
                            }

                            return item.type === 'notice' ? 'linear-gradient(135deg, #003366, #0055aa)' : 'linear-gradient(135deg, #0055aa, #4488ff)';
                          } catch (e) {
                            return item.type === 'notice' ? 'linear-gradient(135deg, #003366, #0055aa)' : 'linear-gradient(135deg, #0055aa, #4488ff)';
                          }
                        })()
                      }}
                    >
                      {(() => {
                        try {
                          const urls = JSON.parse(item.imageUrls || '[]');
                          if (urls.length > 0) return null;
                          if (item.videoUrl && getYouTubeThumbnailUrl(item.videoUrl)) return null;
                          return <span className={styles.thumbText}>BUSINESS INFO</span>;
                        } catch (e) { return <span className={styles.thumbText}>BUSINESS INFO</span>; }
                      })()}
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{item.title}</h4>
                    <p className={styles.cardExcerpt}>{item.content.length > 80 ? item.content.substring(0, 80) + '...' : item.content}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardDate}>{new Date(item.createdAt).toISOString().split('T')[0]}</span>
                      <span className={styles.readMore}>자세히 보기 &rarr;</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>등록된 소식이 없습니다.</div>
          )}
        </div>

        <div className={styles.moreAction}>
          <Link href="/notice" className={styles.viewAllBtn}>전체 소식 보기</Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Notice.module.css';
import Link from 'next/link';
import { getYouTubeThumbnailUrl } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  type: string;
  imageUrls?: string;
  videoUrl?: string;
  category?: string;
}

export default function SupportProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/posts?type=support');
        const data = await res.json();
        setProjects(data.slice(0, 3)); // Only show top 3 on home
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <section className={styles.noticeSection} style={{ background: '#f5f5f7' }}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h3 className={styles.sectionTitle}>지원사업소개</h3>
            <p className={styles.sectionSubtitle}>성장을 돕는 맞춤형 지원 프로그램을 카드뉴스로 확인하세요.</p>
          </div>
        </div>

        <div className={styles.cardGrid}>
          {loading ? (
            <div className={styles.emptyState}>지원사업을 불러오는 중입니다...</div>
          ) : projects.length > 0 ? (
            projects.map((item) => (
              <div key={item.id} className={styles.cardItem}>
                <Link href={`/support/${item.id}`} className={styles.cardLink}>
                  <div className={styles.imagePlaceholder}>
                    <div className={styles.overlay}>
                      <span className={styles.category} style={{ background: '#003366' }}>지원사업</span>
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

                            return 'linear-gradient(135deg, #1c1c1e, #3a3a3c)';
                          } catch (e) {
                            return 'linear-gradient(135deg, #1c1c1e, #3a3a3c)';
                          }
                        })()
                      }}
                    >
                      {(() => {
                        try {
                          const urls = JSON.parse(item.imageUrls || '[]');
                          if (urls.length > 0) return null;
                          if (item.videoUrl && getYouTubeThumbnailUrl(item.videoUrl)) return null;
                          return <span className={styles.thumbText}>SUPPORT</span>;
                        } catch (e) { return <span className={styles.thumbText}>SUPPORT</span>; }
                      })()}
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{item.title}</h4>
                    <p className={styles.cardExcerpt}>{item.content.length > 80 ? item.content.substring(0, 80) + '...' : item.content}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardDate}>{new Date(item.createdAt).toISOString().split('T')[0]}</span>
                      <span className={styles.readMore}>사업 신청하기 &rarr;</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>현재 모집 중인 지원사업이 없습니다.</div>
          )}
        </div>

        <div className={styles.moreAction}>
          <Link href="/support" className={styles.viewAllBtn}>모든 지원사업 보기</Link>
        </div>
      </div>
    </section>
  );
}

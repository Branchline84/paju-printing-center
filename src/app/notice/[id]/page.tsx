"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '../NoticeDetail.module.css';
import { getYouTubeEmbedUrl } from '@/lib/utils';

export default function NoticeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className={styles.loading}>정보를 불러오는 중입니다...</div>;
  if (!post) return <div className={styles.loading}>게시물을 찾을 수 없습니다.</div>;

  const images = post.imageUrls ? JSON.parse(post.imageUrls) : [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div style={{ background: '#fff' }}>
      <Header />
      <main className="container">
        <div className={styles.detailContainer}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            &larr; 목록으로 돌아가기
          </button>

          <header className={styles.header}>
            <span className={styles.category}>
              {post.type === 'notice' ? '공지사항' : post.type === 'news' ? '센터소식' : '지원사업'}
            </span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>작성일: {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>작성자: {post.author || '관리자'}</span>
            </div>
          </header>

          {images.length > 0 && (
            <div className={styles.sliderContainer}>
              <div 
                className={styles.sliderWrapper} 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((url: string, idx: number) => (
                  <div key={idx} className={styles.slide}>
                    <img 
                      src={url} 
                      alt={`image-${idx}`} 
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        if (img.naturalWidth > img.naturalHeight) {
                          img.style.objectFit = 'cover'; // For landscape, fill to look premium
                        } else {
                          img.style.objectFit = 'contain'; // For portrait, show all
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {images.length > 1 && (
                <>
                  <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevSlide}>&#10094;</button>
                  <button className={`${styles.navBtn} ${styles.next}`} onClick={nextSlide}>&#10095;</button>
                  <div className={styles.dots}>
                    {images.map((_: any, idx: number) => (
                      <button 
                        key={idx} 
                        className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ''}`} 
                        onClick={() => setCurrentSlide(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className={styles.content}>
            {post.content}
          </div>

          {post.videoUrl && (
            <div className={styles.videoContainer}>
              <iframe 
                src={getYouTubeEmbedUrl(post.videoUrl)} 
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

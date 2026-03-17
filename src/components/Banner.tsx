"use client";

import React, { useState, useEffect } from 'react';
import styles from './Banner.module.css';
import BannerDashboard from './BannerDashboard';
import { getProxyUrl } from '@/lib/utils';

const DEFAULT_BANNERS = [
  { 
    id: 1, 
    title: "파주인쇄소공인특화지원센터", 
    subtitle: "소공인의 경쟁력이 파주의 경쟁력입니다", 
    image: "/main_banner_1.jpg" 
  },
  { 
    id: 2, 
    title: "2024년 지원사업 안내", 
    subtitle: "파주 인쇄 소공인을 위한 맞춤형 지원", 
    image: "/banner_printing_office.png" 
  },
  { 
    id: 3, 
    title: "함께 성장하는 파주 인쇄 파트너", 
    subtitle: "센터와 함께 비전을 실현하세요", 
    image: "/banner_printing_office.png" 
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState<any[]>(DEFAULT_BANNERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBanners(data.map((b: any) => ({
              id: b.id,
              title: b.title,
              subtitle: b.subtitle,
              image: getProxyUrl(b.imageUrl) || "/banner_printing_office.png"
            })));
          }
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading && banners === DEFAULT_BANNERS) {
    // Optionally show a skeleton or just wait for client-side load
  }

  const currentBanner = banners[current] || DEFAULT_BANNERS[0];

  return (
    <section className={styles.banner}>
      <img 
        src={currentBanner.image} 
        alt="Background" 
        className={styles.bannerImg}
        key={currentBanner.image} 
      />
      
      <div className={styles.slidesContainer}>
        {banners.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`${styles.slide} ${index === current ? styles.active : ''}`}
          >
            <div className={`${styles.content} container`}>
              <div className={styles.textSide}>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.subtitle}>{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashboardWrapper}>
        <div className="container">
          <BannerDashboard />
        </div>
      </div>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <button 
            key={index} 
            className={`${styles.dot} ${index === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}

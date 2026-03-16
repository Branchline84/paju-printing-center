"use client";

import React, { useState, useEffect } from 'react';
import styles from './Banner.module.css';
import BannerDashboard from './BannerDashboard';

const banners = [
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.banner}>
      {/* Universal Background that switches with slide */}
      <img 
        src={banners[current].image} 
        alt="Background" 
        className={styles.bannerImg}
        key={banners[current].image} // Force re-render/animation if needed
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

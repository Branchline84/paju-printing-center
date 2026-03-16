"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Greetings.module.css';

export default function Greetings() {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.greetingsSection}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.textContent}>
            <h3 className={styles.sectionTitle}>{t('greetings')}</h3>
            <div className={`${styles.message} ${!isExpanded ? styles.collapsed : ''}`}>
              {language === 'ko' ? (
                <>
                  <p>반갑습니다. 파주인쇄소공인특화지원센터 홈페이지를 방문해 주셔서 감사합니다.</p>
                  <p>우리 센터는 대한민국 인쇄 산업의 중심인 파주에서 소공인분들의 경쟁력 강화와 지속 가능한 성장을 목표로 설립되었습니다.</p>
                  <p className={styles.extraContent}>4차 산업혁명과 디지털 전환이라는 급변하는 환경 속에서도, 인쇄 소공인 여러분이 흔들림 없이 자긍심을 가지고 본업에 전념할 수 있도록 든든한 버팀목이 되겠습니다.</p>
                  <p className={styles.extraContent}>현장의 생생한 목소리에 귀 기울이며, 맞춤형 교육과 첨단 장비 지원, 판로 개척에 이르기까지 실질적이고 혁신적인 솔루션을 아낌없이 지원하겠습니다.</p>
                  <p>파주 인쇄 산업의 새로운 도약과 상생하는 미래를 위해 저희 센터가 언제나 함께하겠습니다. 감사합니다.</p>
                </>
              ) : (
                <>
                  <p>Welcome. Thank you for visiting the Paju Printing Micro-Enterprise Specialization Support Center.</p>
                  <p>Our center was established to strengthen the competitiveness and sustainable growth of printing micro-enterprises in Paju, the heart of Korea's printing industry.</p>
                  <p className={styles.extraContent}>In a rapidly changing environment of digital transformation, we will be a reliable support so that you can focus on your craft with pride and stability.</p>
                  <p className={styles.extraContent}>We will listen to the vivid voices from the field and provide practical and innovative solutions, from customized education and advanced equipment support to market development.</p>
                  <p>Our center will always be with you for a new leap and a future of shared prosperity for the Paju printing industry. Thank you.</p>
                </>
              )}
            </div>
            
            <button 
              className={styles.moreBtn} 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '접기 ▲' : '인사말 전체보기 ▼'}
            </button>
            
            <div className={styles.signatureArea}>
              <span className={styles.label}>파주인쇄소공인특화지원센터 센터장</span>
              <span className={styles.signature}>박용완</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

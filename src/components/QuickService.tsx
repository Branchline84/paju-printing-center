"use client";

import React from 'react';
import styles from './QuickService.module.css';
import { useLanguage } from '@/context/LanguageContext';

const services = [
  { 
    icon: '🤝', 
    title: '정부지원사업 매칭', 
    desc: '소공인특화자금 및 각종 정부지원사업 정보제공 및 신청 상담',
    enTitle: 'Government Project Matching',
    enDesc: 'Specialized funds and various government support matching'
  },
  { 
    icon: '💡', 
    title: '맞춤형 현장 컨설팅', 
    desc: '인쇄공정개선, 마케팅 등 분야별 전문가 진단',
    enTitle: 'Customized Consulting',
    enDesc: 'Expert diagnosis in process improvement and marketing'
  },
  { 
    icon: '🤖', 
    title: '디지털 전환 교육', 
    desc: '스마트 제조 설비, AI 기반 콘텐츠 제작 등 실무 교육 운영',
    enTitle: 'Digital Transformation',
    enDesc: 'Practical training in smart manufacturing and AI tools'
  },
  { 
    icon: '🌐', 
    title: '협업 네트워크 구축', 
    desc: '소공인 간 정보 교류를 위한 간담회 및 공동비즈니스 모델 발굴',
    enTitle: 'Collaborative Network',
    enDesc: 'Networking events and shared business model discovery'
  },
  { 
    icon: '📣', 
    title: '홍보 및 판로 지원', 
    desc: '홍보영상제작 지원 및 지역 문화행사 연계 판로 확대',
    enTitle: 'PR & Market Expansion',
    enDesc: 'Support for PR videos and cultural event networking'
  },
  { 
    icon: '🏢', 
    title: '센터 공공인프라 제공', 
    desc: '센터 회의실, 교육장 등 센터의 공공 인프라 제공',
    enTitle: 'Public Infrastructure',
    enDesc: 'Provision of meeting rooms and training facilities'
  },
];

export default function QuickService() {
  const { language } = useLanguage();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.titleSide}>
            <h2 className={styles.mainTitle}>OUR<br />SERVICE</h2>
            <div className={styles.line}></div>
            <p className={styles.subTitle}>{language === 'ko' ? '특화지원센터' : 'Support Center'}</p>
            <div className={styles.desc}>
              {language === 'ko' ? (
                <>
                  <p><strong>혁신하는 소공인, 도약하는 파주 인쇄산업</strong></p>
                  <p>센터의 특화 지원 사업을 통해<br />비즈니스 경쟁력을 높이십시오.</p>
                </>
              ) : (
                <>
                  <p><strong>Innovative Artisans, Leaping Paju Printing Industry</strong></p>
                  <p>Enhance your business competitiveness<br />through our specialized support projects.</p>
                </>
              )}
            </div>
          </div>
          <div className={styles.gridSide}>
            {services.map((item, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.text}>
                  <h4 className={styles.cardTitle}>{language === 'ko' ? item.title : item.enTitle}</h4>
                  <p className={styles.cardDesc}>{language === 'ko' ? item.desc : item.enDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

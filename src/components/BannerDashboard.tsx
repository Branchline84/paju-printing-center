"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BannerDashboard.module.css';

interface NewsItem {
  title: string;
  link: string;
}

const DEFAULT_NEWS: NewsItem[] = [
  { title: "소상공인 경영애로 해소 위해 '맞춤형 컨설팅' 지원 확대", link: '/notice' },
  { title: "파주출판단지 인쇄 소공인 대상 '친환경 잉크 기술 교육' 신청 접수", link: '/notice' },
  { title: "2024년 상반기 정책자금 지원 공고: 최저 금리 2.5% 적용", link: '/notice' },
  { title: "파주시, 인쇄 협업 시스템 고도화 사업 참여 업체 모집", link: '/notice' }
];

export default function BannerDashboard() {
  const router = useRouter();
  const [newsList, setNewsList] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [currentNews, setCurrentNews] = useState(0);
  const [showSafetyQuiz, setShowSafetyQuiz] = useState(false);
  const [showCheckQuiz, setShowCheckQuiz] = useState(false);
  const [weather, setWeather] = useState({ temp: '...', status: '전송 중', dust: '좋음' });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news/external');
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setNewsList(data);
          console.log("External news loaded:", data.length);
        }
      } catch (e) {
        console.error("External news fetch error:", e);
      }
    };

    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.76&longitude=126.77&current_weather=true');
        const data = await res.json();
        if (data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          setWeather(prev => ({ ...prev, temp: `${temp}°C`, status: '구름조금' }));
        }
      } catch (e) {
        setWeather({ temp: '2.4°C', status: '맑음', dust: '좋음' });
      }
    };

    if (newsList === DEFAULT_NEWS) {
      fetchNews();
    }
    fetchWeather();

    const tickerTimer = setInterval(() => {
      setCurrentNews((cur) => (cur + 1) % newsList.length);
    }, 4500);

    return () => clearInterval(tickerTimer);
  }, [newsList]);

  const handleNewsClick = () => {
    const activeNews = newsList[currentNews];
    if (activeNews && activeNews.link.startsWith('http')) {
      window.open(activeNews.link, '_blank');
    } else {
      router.push('/notice');
    }
  };

  const handleWeatherClick = () => {
    window.open('https://weather.naver.com/today/02480101', '_blank');
  };

  return (
    <>
      <div className={styles.dashboard}>
        {/* Weather Card */}
        <div className={styles.card} onClick={handleWeatherClick}>
          <div className={styles.cardHeader}>● 실시간 파주 기상</div>
          <div className={styles.weatherGrid}>
            <div className={styles.temp}>{weather.temp}</div>
            <div className={styles.weatherInfo}>
              <div className={styles.cardTitle}>{weather.status}</div>
              <div className={`${styles.dustBadge} ${styles.dustGood}`}>미세먼지 좋음</div>
            </div>
          </div>
        </div>

        {/* Safety Quiz Card */}
        <div className={styles.card} onClick={() => setShowSafetyQuiz(true)}>
          <div className={styles.cardHeader}>● 안전문화 확산</div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>중대재해처벌법 대비</div>
            <div className={styles.cardDesc}>우리 공장은 얼마나 준비되어 있을까요? 자가진단 해보기</div>
          </div>
        </div>

        {/* Micro-biz Check Card */}
        <div className={styles.card} onClick={() => setShowCheckQuiz(true)}>
          <div className={styles.cardHeader}>● 지원대상 확인</div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>소공인 자격 체커</div>
            <div className={styles.cardDesc}>매출액과 근로자 수로 간편하게 지원 대상 여부를 확인하세요.</div>
          </div>
        </div>

        {/* News Card (Integrated Ticker) */}
        <div className={styles.card} onClick={handleNewsClick}>
          <div className={styles.cardHeader}>● 실시간 소공인 뉴스</div>
          <div className={styles.newsCardContent}>
            {newsList.map((news, index) => (
              <div 
                key={index} 
                className={`${styles.newsItem} ${index === currentNews ? styles.activeNews : ''}`}
              >
                {news.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Modal: Safety */}
      {showSafetyQuiz && (
        <div className={styles.modalOverlay} onClick={() => setShowSafetyQuiz(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShowSafetyQuiz(false)}>✕</button>
            <div className={styles.modalTag}>안전 진단</div>
            <h2>중대재해처벌법 대비 자가진단</h2>
            <div className={styles.quizQuestion}>
              Q. 사업장 내 유해·위험요인을 파악하고 개선하는 절차(위험성평가)를 주기적으로 실시하고 있나요?
            </div>
            <div className={styles.quizOptions}>
              <button className={styles.optionBtn} onClick={() => alert('훌륭합니다! 정기적인 교육도 잊지 마세요.')}>예, 정기적으로 실시하고 있습니다.</button>
              <button className={styles.optionBtn} onClick={() => alert('센터의 컨설팅 지원이 필요합니다. 관리자에게 문의하세요.')}>아니오, 절차가 필요합니다.</button>
              <button className={styles.optionBtn} onClick={() => alert('센터를 방문해 주시면 위험성평가 가이드를 제공해 드립니다.')}>잘 모르겠습니다.</button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal: Check */}
      {showCheckQuiz && (
        <div className={styles.modalOverlay} onClick={() => setShowCheckQuiz(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShowCheckQuiz(false)}>✕</button>
            <div className={styles.modalTag}>자격 확인</div>
            <h2>소공인 지원대상 확인</h2>
            <div className={styles.quizQuestion}>
              귀사의 주된 업종이 제조(C)이며, 상시 근로자 수가 어떻게 되시나요?
            </div>
            <div className={styles.quizOptions}>
              <button className={styles.optionBtn} onClick={() => alert('상시근로자 10인 미만 소공인 지원 대상에 해당됩니다!')}>10인 미만 (상시근로자)</button>
              <button className={styles.optionBtn} onClick={() => alert('상시근로자 10인 이상은 일반 중소기업 지원 프로그램을 확인해 보세요.')}>10인 이상</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

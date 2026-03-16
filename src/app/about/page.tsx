"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from './About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <Header />
      
      <section className={styles.hero}>
        <div className="container">
          <h1>파주 인쇄 소공인의 든든한 거점,<br />파주소공인특화지원센터가 함께합니다</h1>
          <p>전통의 가치를 지키고 미래의 경쟁력을 만드는 상생의 파트너</p>
        </div>
      </section>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}><span>01</span> 설립 배경 및 목적</h2>
            <div className={styles.contentBox}>
              <p>파주출판단지 내 인쇄·출판 소공인은 지역 경제를 지탱하는 핵심 동력입니다. 하지만 급격한 원자재 가격 상승과 산업 구조 변화로 인해 많은 업체가 경영상의 어려움을 겪고 있습니다.</p>
              <p style={{ marginTop: '20px' }}>파주소공인특화지원센터는 소공인이 정보 부족으로 지원에서 소외되지 않도록, 상시 열려있는 상담 체계를 통해 실질적인 성장을 돕고자 설립되었습니다.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}><span>02</span> 센터 운영 및 상담 시스템</h2>
            <div className={styles.contentBox}>
              <p>센터는 소공인 누구에게나 열려 있는 개방형 거점 공간으로 운영됩니다.</p>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <h3><b>Core 01</b> 전문 매니저 상시 상담</h3>
                  <p>센터 내 전문 매니저가 상주하여 경영 애로사항, 정부 지원사업 신청, 각종 행정 절차에 대한 1:1 맞춤 상담을 제공합니다.</p>
                </div>
                <div className={styles.card}>
                  <h3><b>Core 02</b> 상시 개방형 공용 공간</h3>
                  <p>소규모 회의, 업체 간 간담회, 정보 공유를 위해 센터 내 상담실과 회의 공간을 평일 주간 상시 무료로 개방합니다.</p>
                </div>
                <div className={styles.card}>
                  <h3><b>Core 03</b> 분야별 전문가 자문 연계</h3>
                  <p>세무, 법률, 정책 등 고도의 전문성이 필요한 분야는 자문협의회를 통한 전문가 연결을 지원합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}><span>03</span> 주요 특화 사업</h2>
            <div className={styles.contentBox}>
              <p>현장의 변화를 이끄는 실무 중심의 프로그램을 운영합니다.</p>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <h3><b>Project 01</b> 디지털 및 스마트 제조 교육</h3>
                  <p>디지털 인쇄 기기 조작 및 스마트 생산관리 시스템(MES) 활용 등 실무 역량 강화 교육을 실시합니다.</p>
                </div>
                <div className={styles.card}>
                  <h3><b>Project 02</b> 인쇄 공정 개선 컨설팅</h3>
                  <p>전문가가 현장을 진단하여 작업 동선 최적화와 공정 효율화를 제안하고 생산성 향상을 돕습니다.</p>
                </div>
                <div className={styles.card}>
                  <h3><b>Project 03</b> 중대재해 및 안전 교육</h3>
                  <p>안전 전담 인력이 부족한 소공인을 위해 법령 이해와 현장 자가진단 등 안전문화 정착을 지원합니다.</p>
                </div>
                <div className={styles.card}>
                  <h3><b>Project 04</b> 미래 인재 및 가업승계 지원</h3>
                  <p>청년 인턴십 연계 및 업체별 홍보 콘텐츠 제작 지원을 통해 지속 가능한 경영 기반을 마련합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}><span>04</span> 센터의 약속</h2>
            <div className={styles.promiseBox}>
              <h2>"함께 뛰는 러닝메이트"</h2>
              <p>우리는 단순한 지원기관을 넘어, 파주 인쇄 소공인들이 언제든 찾아와 고민을 나누고 해답을 얻을 수 있는<br />
              <strong>'열린 사랑방'</strong>이자 <strong>'성장 허브'</strong>가 되겠습니다.</p>
            </div>
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className="container">
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <h4>위치</h4>
                <p>경기도 파주시 서패동 470-1, 첨단 302호</p>
              </div>
              <div className={styles.infoItem}>
                <h4>상담 전화</h4>
                <p>031-941-6001</p>
              </div>
              <div className={styles.infoItem}>
                <h4>운영 시간</h4>
                <p>평일 09:00 ~ 18:00 (상시 상담 가능)</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className={styles.quickMenu}>
        <Link href="/contact" className={styles.reservationBtn}>
          <span>📅</span>
          상담예약
        </Link>
      </div>

      <Footer />
    </div>
  );
}

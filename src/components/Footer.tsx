import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>파주인쇄소공인특화지원센터</h3>
            <p>소공인의 꿈을 현실로, 함께 성장하는 파주</p>
          </div>
          <div className={styles.info}>
            <p>경기도 파주시 서패동 470-1, 첨단 302호</p>
            <p>Tel: 031-941-6001 | Email: sogongin3@naver.com</p>
            <p className={styles.copy}>© 2026 Paju Printing Center. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

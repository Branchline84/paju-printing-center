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
            <p>경기도 파주시 문발로 453 (문발동) 2층</p>
            <p>Tel: 031-955-0000 | Email: info@pajupc.or.kr</p>
            <p className={styles.copy}>© 2024 Paju Printing Center. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

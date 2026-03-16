import React from 'react';
import styles from './BackgroundDecor.module.css';

export default function BackgroundDecor() {
  return (
    <div className={styles.decorContainer}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>
      <div className={styles.pattern}></div>
    </div>
  );
}

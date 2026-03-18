"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (search.trim()) {
      router.push(`/notice?q=${encodeURIComponent(search.trim())}`);
      setSearch(''); // Clear search after navigation
      setIsMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={`${styles.topBar} container`}>
        <div className={styles.utility}>
          <Link href="/">{t('home')}</Link>
          <Link href="/contact">{t('contact')}</Link>
          <div className={styles.langSwitch}>
            <button 
              className={language === 'ko' ? styles.active : ''} 
              onClick={() => setLanguage('ko')}
            >
              KOR
            </button>
            <span>|</span>
            <button 
              className={language === 'en' ? styles.active : ''} 
              onClick={() => setLanguage('en')}
            >
              ENG
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.mainHeader} container`}>
        <div className={styles.logo}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Logo" className={styles.logoImg} />
            <div className={styles.logoText}>
              <span className={styles.title}>{t('centerName')}</span>
              <span className={styles.subtitle}>{t('centerSubtitle')} (v1.2 TEST)</span>
            </div>
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>{t('intro')}</Link>
          <Link href="/notice" onClick={() => setIsMobileMenuOpen(false)}>{t('notice')}</Link>
          <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)}>자료실</Link>
          <Link href="/support" onClick={() => setIsMobileMenuOpen(false)}>{t('projects')}</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t('contact')}</Link>
          <Link href="/signup" className={styles.signupBtn} onClick={() => setIsMobileMenuOpen(false)}>{t('signup')}</Link>
          
          <div className={styles.mobileSearch}>
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>
        </nav>

        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>🔍</button>
        </div>

        <button 
          className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.activeMenu : ''}`} 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {isMobileMenuOpen && <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />}
    </header>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import styles from './SupportPage.module.css';
import Link from 'next/link';

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const url = searchTerm ? `/api/posts?type=support&q=${searchTerm}` : '/api/posts?type=support';
        const res = await fetch(url);
        const data = await res.json();
        setProjects(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    const timer = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getBadgeClass = (type: string) => {
    return styles.facility; // Current simplistic style, can be enhanced
  };

  const getTypeName = (type: string) => {
    return '지원사업';
  };

  return (
    <div className={styles.noticePage}>
      <Header />
      
      <section className={styles.banner}>
        <div className="container">
          <h1>지원사업소개</h1>
          <p>파주 인쇄 소공인의 경쟁력 제고를 위한 다양한 맞춤형 지원 프로그램을 소개합니다.</p>
        </div>
      </section>

      <main className="container">
        <div className={styles.boardHeader}>
          <div style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 600 }}>
            총 <span style={{ color: '#003366' }}>{projects.length}</span>건의 지원사업이 있습니다.
          </div>
          
          <div className={styles.searchWrapper}>
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="사업명으로 검색" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#86868b' }}>데이터를 불러오는 중입니다...</div>
          ) : projects.length > 0 ? (
            <table className={styles.boardTable}>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>번호</th>
                  <th style={{ width: '120px' }}>분야</th>
                  <th>사업명</th>
                  <th style={{ width: '150px' }}>등록일</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.id}>
                    <td>{projects.length - index}</td>
                    <td>
                      <span className={`${styles.badge} ${styles.facility}`}>
                        지원사업
                      </span>
                    </td>
                    <td className={styles.titleCell}>
                      <Link href={`/support/${project.id}`} className={styles.titleLink}>
                        {project.title}
                      </Link>
                    </td>
                    <td className={styles.dateCell}>{new Date(project.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '60px', textAlign: 'center', color: '#86868b' }}>등록된 지원사업이 없습니다.</div>
          )}
        </div>
      </main>

      <footer style={{ marginTop: '100px', padding: '60px 0', background: '#f5f5f7', textAlign: 'center', borderTop: '1px solid #e5e5e7' }}>
        <p className={styles.dateCell}>© 2024 Paju Printing Center. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

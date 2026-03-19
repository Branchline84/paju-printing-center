"use client";

import React, { useState } from 'react';
import styles from './Status.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface Member {
  id: number;
  name: string;
  company: string | null;
  phone: string | null;
  representative: string | null;
  mainProducts: string | null;
  imageUrls: string | null;
  videoUrl: string | null;
}

interface Stats {
  totalMembers: number;
  supportCount2026: number;
  operationYears: number;
}

export default function StatusClient({ initialStats, initialMembers }: { initialStats: Stats, initialMembers: Member[] }) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredMembers = initialMembers.filter(m => 
    (m.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.mainProducts || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className={styles.statusPage}>
      <section className={styles.titleSection}>
        <div className="container">
          <h1 className={styles.mainTitle}>{t('status')}</h1>
          <p className={styles.subTitle}>파주인쇄소공인특화지원센터와 함께 성장하는 우수 소공인들을 소개합니다.</p>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>등록 소공인</div>
              <div className={styles.statValue}>{initialStats.totalMembers}<span className={styles.statUnit}>개사</span></div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>2026년 지원 신청</div>
              <div className={styles.statValue}>{initialStats.supportCount2026}<span className={styles.statUnit}>건</span></div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>센터 운영연도</div>
              <div className={styles.statValue}>{initialStats.operationYears}<span className={styles.statUnit}>년차</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentArea}>
        <div className="container">
          <div className={styles.filterRow}>
            <div className={styles.searchBox}>
              <input 
                type="text" 
                placeholder="업체명 또는 생산품을 검색하세요" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={styles.searchBtn}>🔍</button>
            </div>
          </div>

          <table className={styles.businessTable}>
            <thead>
              <tr>
                <th>업체명</th>
                <th>주요생산품</th>
                <th style={{ width: '120px', textAlign: 'center' }}>상세정보</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <React.Fragment key={member.id}>
                  <tr>
                    <td>
                      <div className={styles.companyName}>{member.company || '미등록 업체'}</div>
                      <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>대표: {member.representative || '-'}</div>
                    </td>
                    <td>{member.mainProducts || '-'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className={styles.viewBtn}
                        onClick={() => toggleExpand(member.id)}
                      >
                        {expandedId === member.id ? '닫기' : '업체보기'}
                      </button>
                    </td>
                  </tr>
                  
                  {expandedId === member.id && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={3}>
                        <div className={styles.detailsContent}>
                          <div className={styles.detailsGrid}>
                            <div className={styles.detailsInfo}>
                              <h4>{member.company} 상세 정보</h4>
                              <ul className={styles.infoList}>
                                <li className={styles.infoItem}>
                                  <span className={styles.infoLabel}>대표자</span>
                                  <span className={styles.infoValue}>{member.representative || '-'}</span>
                                </li>
                                <li className={styles.infoItem}>
                                  <span className={styles.infoLabel}>연락처</span>
                                  <span className={styles.infoValue}>{member.phone || '-'}</span>
                                </li>
                                <li className={styles.infoItem}>
                                  <span className={styles.infoLabel}>주요생산품</span>
                                  <span className={styles.infoValue}>{member.mainProducts || '-'}</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className={styles.mediaArea}>
                              {member.imageUrls && (
                                <div className={styles.imageGrid} style={{ marginBottom: '20px' }}>
                                  {JSON.parse(member.imageUrls).map((url: string, idx: number) => (
                                    <div 
                                      key={idx} 
                                      className={styles.imageItem} 
                                      style={{ backgroundImage: `url("${url}")` }}
                                      onClick={() => window.open(url, '_blank')}
                                    />
                                  ))}
                                </div>
                              )}
                              
                              {member.videoUrl && (
                                <div className={styles.videoWrapper}>
                                  {getYouTubeId(member.videoUrl) ? (
                                    <iframe
                                      src={`https://www.youtube.com/embed/${getYouTubeId(member.videoUrl)}`}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  ) : (
                                    <div style={{ padding: '20px', color: '#888', textAlign: 'center' }}>
                                      <a href={member.videoUrl} target="_blank" rel="noopener noreferrer">동영상 링크 보기</a>
                                    </div>
                                  )}
                                </div>
                              )}

                              {!member.imageUrls && !member.videoUrl && (
                                <div style={{ padding: '40px', background: '#f1f5f9', borderRadius: '12px', textAlign: 'center', color: '#64748b' }}>
                                  등록된 이미지나 동영상이 없습니다.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

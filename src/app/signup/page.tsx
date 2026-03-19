"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Signup.module.css';

export default function SignUpPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    phone: '', 
    representative: '', 
    mainProducts: '', 
    imageUrls: [] as string[], 
    videoUrl: '',
    isPublicConsent: false
  });
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
        // 최대 5장 제한 체크
        if (form.imageUrls.length + (i + 1) > 5) {
            alert('이미지는 최대 5장까지만 등록 가능합니다.');
            break;
        }

        try {
            const formData = new FormData();
            formData.append('file', files[i]);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.url) {
                // 한 장씩 즉시 상태 업데이트 (사용자 피드백 개선)
                setForm(prev => ({ 
                    ...prev, 
                    imageUrls: [...prev.imageUrls, data.url] 
                }));
            } else {
                alert(data.error || '업로드 실패');
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    }

    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/members', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          imageUrls: JSON.stringify(form.imageUrls),
          isPublicConsent: form.isPublicConsent
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Signup failed', error);
      alert('가입 신청 중 오류가 발생했습니다.');
    }
  };

  if (submitted) {
    return (
      <div className={styles.signupPage}>
        <Header />
        <main className="container">
          <div className={styles.successArea}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>가입 신청이 완료되었습니다</h2>
            <p style={{ color: '#86868b', fontSize: '18px' }}>관리자가 정보를 확인한 후 연락드리겠습니다. 잠시만 기다려 주세요.</p>
            <button 
              onClick={() => window.location.href = '/'}
              className={styles.submitBtn} 
              style={{ padding: '12px 32px', marginTop: '40px' }}
            >
              메인으로 돌아가기
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.signupPage}>
      <Header />
      
      {!showForm ? (
        <section className={styles.introSection}>
          <div className="container">
            <div className={styles.titleArea}>
              <h1 className={styles.mainTitle}>
                파주 인쇄 소공인의 경쟁력,<br />이제 센터가 현장에서 함께 만듭니다.
              </h1>
              <p className={styles.subTitle}>
                업무에만 집중하십시오. 복잡한 정부 지원 정보와 행정 절차는 <br />
                파주소공인특화지원센터가 대신 분석합니다.
              </p>
            </div>

            <div className={styles.noticeBox} style={{ background: '#f5f5f7', border: 'none', marginBottom: '40px' }}>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#1d1d1f', textAlign: 'center' }}>
                본 홈페이지 회원가입(무료)은 귀사의 사업 현황을 정확히 파악하여,<br />
                <b>최적화된 지원책을 매칭해 드리기 위한 첫 단계</b>입니다.
              </p>
            </div>

            <div className={styles.processGrid}>
              <div className={styles.processCard}>
                <span className={styles.stepIcon}>🏠</span>
                <h3 className={styles.stepTitle}>현장 방문 및 진단</h3>
                <p className={styles.stepDesc}>가입 정보를 바탕으로 전담 매니저가 사업장을 직접 찾아가 현장의 애로사항을 청취합니다.</p>
              </div>
              <div className={styles.processCard}>
                <span className={styles.stepIcon}>🤝</span>
                <h3 className={styles.stepTitle}>맞춤형 사업 매칭</h3>
                <p className={styles.stepDesc}>실태조사 데이터를 분석하여 귀사에 즉시 적용 가능한 교육, 컨설팅, 직접 지원 사업을 연결합니다.</p>
              </div>
              <div className={styles.processCard}>
                <span className={styles.stepIcon}>📱</span>
                <h3 className={styles.stepTitle}>상시 정보 제공</h3>
                <p className={styles.stepDesc}>급변하는 정책 자금 및 인쇄 산업 지원 소식을 등록하신 연락처로 가장 먼저 전달해 드립니다.</p>
              </div>
            </div>

            <div className={styles.noticeBox}>
              <h3 className={styles.noticeTitle}>📌 회원 가입 필수 고지</h3>
              <ul className={styles.noticeList}>
                <li className={styles.noticeItem}>
                  <b>가입 비용</b>
                  <span>무료 (본 센터는 소상공인시장진흥공단 지원으로 운영되는 공공 지원 기관입니다)</span>
                </li>
                <li className={styles.noticeItem}>
                  <b>정보 보호</b>
                  <span>수집된 정보는 소공인 지원을 위한 현황 파악 및 상담 기초 자료로 활용되며, 업체명, 대표자, 주요생산품, 이미지 및 동영상 등은 홈페이지 '소공인현황' 서비스를 통해 외부에 공개될 수 있습니다.</span>
                </li>
              </ul>
            </div>

            <div className={styles.highlightBanner}>
              <p className={styles.highlightText}>
                "지금 가입하시면, 귀사의 사업장으로 찾아가는<br />1:1 상담 예약을 함께 진행해 드립니다."
              </p>
              <button className={styles.actionBtn} onClick={() => setShowForm(true)}>
                무료 회원가입 및 상담 신청
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.formSection}>
          <div className="container">
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2>회원가입 신청</h2>
                <p style={{ color: '#86868b' }}>신청 정보를 입력해 주세요.</p>
              </div>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className={styles.inputGroup}>
                    <label>회사명</label>
                    <input type="text" placeholder="사업장 명칭" required value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>대표자명</label>
                    <input type="text" placeholder="대표 성함" required value={form.representative} onChange={e => setForm({...form, representative: e.target.value})} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className={styles.inputGroup}>
                    <label>이름 (담당자)</label>
                    <input type="text" placeholder="담당자 성함" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>연락처</label>
                    <input type="tel" placeholder="010-0000-0000" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>이메일</label>
                  <input type="email" placeholder="example@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>

                <div className={styles.inputGroup}>
                  <label>주요생산품</label>
                  <input type="text" placeholder="예: 옵셋인쇄, 디지털인쇄, 제본 등" required value={form.mainProducts} onChange={e => setForm({...form, mainProducts: e.target.value})} />
                </div>

                <div className={styles.inputGroup}>
                  <label>업체 이미지 업로드 (최대 5장)</label>
                  <input type="file" multiple accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {form.imageUrls.map((url, i) => (
                      <div key={i} style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '4px', 
                        backgroundImage: `url("${url}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: '1px solid #ddd' 
                      }} />
                    ))}
                    {uploading && <div style={{ fontSize: '12px', alignSelf: 'center' }}>업로드 중...</div>}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>홍보 동영상 URL (YouTube)</label>
                  <input type="text" placeholder="https://www.youtube.com/watch?v=..." value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} />
                </div>

                <div 
                  className={styles.checkboxGroup} 
                  onClick={() => setForm({...form, isPublicConsent: !form.isPublicConsent})}
                >
                  <input 
                    type="checkbox" 
                    checked={form.isPublicConsent} 
                    onChange={() => {}} // onClick handles it
                  />
                  <span className={styles.checkboxLabel}>
                    <b>[필수]</b> 위 입력한 업체 정보(업체명, 대표자, 생산품, 이미지 등)를 파주소공인특화지원센터 홈페이지 <b>'소공인현황' 페이지에 공개</b>하는 것에 동의합니다.
                  </span>
                </div>

                <button 
                  type="submit" 
                  className={styles.submitBtn} 
                  disabled={uploading || !form.isPublicConsent}
                  style={{ opacity: (uploading || !form.isPublicConsent) ? 0.5 : 1 }}
                >
                  가입 및 상담 신청하기
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)} 
                  style={{ background: 'none', border: 'none', color: '#86868b', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}
                >
                  이전으로 돌아가기
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}

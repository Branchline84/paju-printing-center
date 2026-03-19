'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Admin.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackgroundDecor from '../../components/BackgroundDecor';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'banners' | 'members' | 'inquiries' | 'resources' | 'settings'>('posts');
  const [data, setData] = useState<any[]>([]);
  const [settings, setSettings] = useState({ supportCount2026: 0, operationYears: 1 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [newPost, setNewPost] = useState({
    title: '',
    type: 'notice',
    content: '',
    author: '관리자',
    imageUrls: [] as string[],
    fileUrls: [] as string[],
    videoUrl: ''
  });

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    representative: '',
    mainProducts: '',
    imageUrls: [] as string[],
    videoUrl: '',
    approved: false
  });

  const [newBanner, setNewBanner] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    order: 0,
    isActive: true
  });

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resourceFileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'settings') {
        const res = await fetch('/api/settings');
        const result = await res.json();
        setSettings(result);
        return;
      }

      let url = '/api/posts';
      if (activeTab === 'banners') url = '/api/banners';
      if (activeTab === 'members') url = '/api/members';
      if (activeTab === 'inquiries') url = '/api/inquiries';
      if (activeTab === 'resources') url = '/api/posts?type=resource';

      const res = await fetch(url);
      const result = await res.json();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    let url = `/api/posts/${id}`;
    if (activeTab === 'banners') url = `/api/banners/${id}`;
    if (activeTab === 'members') url = `/api/members/${id}`;
    
    const res = await fetch(url, { method: 'DELETE' });
    if (res.ok) fetchData();
  };

  const handleApprove = async (id: number) => {
    const res = await fetch(`/api/members/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: true })
    });
    if (res.ok) fetchData();
  };

  const handleResolve = async (id: number, status: string) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) fetchData();
  };

  const handleSubmitSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (res.ok) {
      alert('설정이 저장되었습니다.');
      fetchData();
    }
  };

  const handleSubmitMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PATCH' : 'POST';
    const url = editingId ? `/api/members/${editingId}` : '/api/members';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newMember,
        imageUrls: JSON.stringify(newMember.imageUrls)
      })
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingId(null);
      setNewMember({ name: '', email: '', company: '', phone: '', representative: '', mainProducts: '', imageUrls: [], videoUrl: '', approved: false });
      fetchData();
      alert(editingId ? '회원 정보가 수정되었습니다.' : '회원이 등록되었습니다.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
        try {
            const file = files[i];
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload-direct', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('업로드 중 오류 발생');

            const newBlob = await response.json();
            if (newBlob.url) {
                setNewPost(prev => ({
                    ...prev,
                    imageUrls: [...prev.imageUrls, newBlob.url]
                }));
            }
        } catch (error) {
            console.error('Upload failed', error);
        }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResourceFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
        try {
            const file = files[i];
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload-direct', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('업로드 중 오류 발생');

            const newBlob = await response.json();
            if (newBlob.url) {
                setNewPost(prev => ({
                    ...prev,
                    fileUrls: [...prev.fileUrls, newBlob.url]
                }));
            }
        } catch (error) {
            console.error('Upload failed', error);
        }
    }
    setUploading(false);
    if (resourceFileInputRef.current) resourceFileInputRef.current.value = '';
  };

  const handleBannerFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-direct', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('업로드 중 오류 발생');

        const newBlob = await response.json();
        if (newBlob.url) {
            setNewBanner(prev => ({ ...prev, imageUrl: newBlob.url }));
        }
    } catch (error) {
        console.error('Upload failed', error);
    }
    setUploading(false);
    if (bannerInputRef.current) bannerInputRef.current.value = '';
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PATCH' : 'POST';
    const url = editingId ? `/api/posts/${editingId}` : '/api/posts';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newPost,
        imageUrls: newPost.imageUrls,
        fileUrls: newPost.fileUrls
      })
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingId(null);
      setNewPost({ title: '', type: 'notice', content: '', author: '관리자', imageUrls: [], fileUrls: [], videoUrl: '' });
      fetchData();
      alert(editingId ? '게시물이 수정되었습니다.' : '게시물이 등록되었습니다.');
    }
  };

  const handleSubmitBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PATCH' : 'POST';
    const url = editingId ? `/api/banners/${editingId}` : '/api/banners';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBanner)
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingId(null);
      setNewBanner({ title: '', subtitle: '', imageUrl: '', order: 0, isActive: true });
      fetchData();
      alert(editingId ? '배너가 수정되었습니다.' : '배너가 등록되었습니다.');
    }
  };

  const insertFormatting = (type: string) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const selected = text.substring(start, end);

    let formatted = selected;
    if (type === 'bold') formatted = `**${selected}**`;
    if (type === 'italic') formatted = `*${selected}*`;
    if (type === 'header') formatted = `### ${selected}`;
    if (type === 'list') formatted = `\n- ${selected}`;
    if (type === 'quote') formatted = `\n> ${selected}`;
    if (type === 'link') formatted = `[${selected}](url)`;

    setNewPost({ ...newPost, content: before + formatted + after });
  };

  const renderMarkdown = (text: string) => {
    if (!text) return '';
    let html = text
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      .replace(/> (.*)/g, '<blockquote>$1</blockquote>')
      .replace(/\[(.*)\]\((.*)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/- (.*)/g, '<li>$1</li>')
      .replace(/\n/g, '<br/>');
    
    if (html.includes('<li>')) {
        html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    }
    return html;
  };

  const getProxyUrl = (url: string) => url;

  return (
    <div className={styles.adminPage}>
      <BackgroundDecor />
      <Header />
      <main className="container">
        <div className={styles.adminHeader}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0 }}>관리자 대시보드</h2>
            <button onClick={handleLogout} className={styles.cancelBtn}>로그아웃</button>
          </div>
            <div className={styles.adminTabs}>
              <button className={activeTab === 'posts' ? styles.active : ''} onClick={() => setActiveTab('posts')}>게시물 관리</button>
              <button className={activeTab === 'resources' ? styles.active : ''} onClick={() => setActiveTab('resources')}>자료실 관리</button>
              <button className={activeTab === 'banners' ? styles.active : ''} onClick={() => setActiveTab('banners')}>배너 관리</button>
              <button className={activeTab === 'members' ? styles.active : ''} onClick={() => setActiveTab('members')}>소공인 관리</button>
              <button className={activeTab === 'inquiries' ? styles.active : ''} onClick={() => setActiveTab('inquiries')}>문의 내역</button>
              <button className={activeTab === 'settings' ? styles.active : ''} onClick={() => setActiveTab('settings')}>통계/설정</button>
            </div>
          </div>
  
          <div className={styles.actionRow}>
            <h3>{activeTab === 'posts' ? '전체 게시물' : activeTab === 'resources' ? '자료실 목록' : activeTab === 'banners' ? '배너 목록' : activeTab === 'members' ? '소공인 목록' : activeTab === 'settings' ? '시스템 통계 설정' : '문의 접수 내역'}</h3>
            {(activeTab === 'posts' || activeTab === 'resources' || activeTab === 'banners' || activeTab === 'members') && (
              <button className={styles.createBtn} onClick={() => {
                  setEditingId(null);
                  if (activeTab === 'posts' || activeTab === 'resources') {
                      setNewPost({ title: '', type: activeTab === 'resources' ? 'resource' : 'notice', content: '', author: '관리자', imageUrls: [], fileUrls: [], videoUrl: '' });
                  } else if (activeTab === 'banners') {
                      setNewBanner({ title: '', subtitle: '', imageUrl: '', order: 0, isActive: true });
                  } else if (activeTab === 'members') {
                      setNewMember({ name: '', email: '', company: '', phone: '', representative: '', mainProducts: '', imageUrls: [], videoUrl: '', approved: false });
                  }
                  setIsModalOpen(true);
              }}>
                  + {activeTab === 'banners' ? '새 배너 등록' : activeTab === 'members' ? '새 소공인 등록' : '새 게시물 작성'}
              </button>
            )}
          </div>
  
          <section className={styles.contentTable}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>데이터를 불러오는 중...</div>
            ) : activeTab === 'settings' ? (
              <div style={{ padding: '40px', maxWidth: '600px' }}>
                <form onSubmit={handleSubmitSettings}>
                  <div className={styles.formGroup}>
                    <label>2026년 지원사업 신청 건수 (수동)</label>
                    <input type="number" value={settings.supportCount2026} onChange={e => setSettings({...settings, supportCount2026: parseInt(e.target.value)})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>센터 운영연도 (수동)</label>
                    <input type="number" value={settings.operationYears} onChange={e => setSettings({...settings, operationYears: parseInt(e.target.value)})} />
                  </div>
                  <button type="submit" className={styles.submitBtn}>설정 저장하기</button>
                </form>
              </div>
            ) : (
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>ID</th>
                    <th>{activeTab === 'members' ? '업체명/이메일' : activeTab === 'inquiries' ? '내용/이메일' : '제목'}</th>
                    <th style={{ width: '120px' }}>{activeTab === 'members' ? '대표자' : '유형/상태'}</th>
                    <th style={{ width: '150px' }}>날짜</th>
                    <th style={{ width: '120px' }}>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <div 
                          style={{ fontWeight: 600, color: '#003366', cursor: 'pointer' }}
                          onClick={() => {
                            if (activeTab === 'members') {
                              setEditingId(item.id);
                              setNewMember({
                                ...item,
                                imageUrls: item.imageUrls ? JSON.parse(item.imageUrls) : []
                              });
                              setIsModalOpen(true);
                            } else {
                              setSelectedPost(item);
                            }
                          }}
                        >
                          {item.company || item.title || item.name || item.subject}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{item.email || item.message?.substring(0, 30)}</div>
                      </td>
                      <td>
                        {activeTab === 'members' ? (
                          <span>{item.representative || '-'}</span>
                        ) : (
                          <span className={styles.badge}>
                            {activeTab === 'resources' ? '자료' : item.type || item.status || (item.isActive ? '활성' : '비활성')}
                          </span>
                        )}
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {(activeTab === 'posts' || activeTab === 'resources' || activeTab === 'banners' || activeTab === 'members') && (
                            <button 
                              className={styles.editActionBtn}
                              onClick={() => {
                                  setEditingId(item.id);
                                  if (activeTab === 'banners') {
                                      setNewBanner({...item});
                                  } else if (activeTab === 'members') {
                                      setNewMember({
                                          ...item,
                                          imageUrls: item.imageUrls ? JSON.parse(item.imageUrls) : []
                                      });
                                  } else {
                                      setNewPost({
                                          ...item,
                                          imageUrls: item.imageUrls ? JSON.parse(item.imageUrls) : [],
                                          fileUrls: item.fileUrls ? JSON.parse(item.fileUrls) : []
                                      });
                                  }
                                  setIsModalOpen(true);
                              }}
                            >수정</button>
                          )}
                          {activeTab === 'members' && !item.approved && (
                            <button className={styles.approveBtn} onClick={() => handleApprove(item.id)}>승인</button>
                          )}
                          <button className={styles.deleteActionBtn} onClick={() => handleDelete(item.id)}>삭제</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
      </main>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{editingId ? '수정하기' : '새로 만들기'}</h3>
            {activeTab === 'banners' ? (
                <form onSubmit={handleSubmitBanner}>
                    <div className={styles.formGroup}><label>제목</label><input type="text" value={newBanner.title} onChange={e => setNewBanner({...newBanner, title: e.target.value})} required /></div>
                    <div className={styles.formGroup}><label>이미지</label><input type="file" ref={bannerInputRef} onChange={handleBannerFileUpload} /></div>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={() => setIsModalOpen(false)}>취소</button>
                        <button type="submit" disabled={uploading}>저장</button>
                    </div>
                </form>
            ) : activeTab === 'members' ? (
                <form onSubmit={handleSubmitMember}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className={styles.formGroup}><label>회사명</label><input type="text" value={newMember.company} onChange={e => setNewMember({...newMember, company: e.target.value})} required /></div>
                      <div className={styles.formGroup}><label>대표자명</label><input type="text" value={newMember.representative} onChange={e => setNewMember({...newMember, representative: e.target.value})} required /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className={styles.formGroup}><label>담당자명</label><input type="text" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required /></div>
                      <div className={styles.formGroup}><label>연락처</label><input type="text" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} required /></div>
                    </div>
                    <div className={styles.formGroup}><label>이메일</label><input type="email" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} required /></div>
                    <div className={styles.formGroup}><label>주요생산품</label><input type="text" value={newMember.mainProducts} onChange={e => setNewMember({...newMember, mainProducts: e.target.value})} required /></div>
                    <div className={styles.formGroup}>
                      <label>업체 이미지</label>
                      <input type="file" multiple onChange={async (e) => {
                        const files = e.target.files;
                        if (!files) return;
                        setUploading(true);
                        const urls = [...newMember.imageUrls];
                        for (let i = 0; i < files.length; i++) {
                          const fd = new FormData();
                          fd.append('file', files[i]);
                          const res = await fetch('/api/upload-direct', { method: 'POST', body: fd });
                          const data = await res.json();
                          if (data.url) urls.push(data.url);
                        }
                        setNewMember({...newMember, imageUrls: urls});
                        setUploading(false);
                      }} />
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                        {newMember.imageUrls.map((url, i) => (
                          <div key={i} style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '8px', 
                            backgroundImage: `url("${url}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #ddd' 
                          }} />
                        ))}
                      </div>
                    </div>
                    <div className={styles.formGroup}><label>동영상 URL (YouTube)</label><input type="text" value={newMember.videoUrl} onChange={e => setNewMember({...newMember, videoUrl: e.target.value})} /></div>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={() => setIsModalOpen(false)}>취소</button>
                        <button type="submit" disabled={uploading}>저장</button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSubmitPost}>
                    <div className={styles.formGroup}>
                        <label>구분</label>
                        <select value={newPost.type} onChange={e => setNewPost({...newPost, type: e.target.value})}>
                            <option value="notice">공지사항</option>
                            <option value="news">센터소식</option>
                            <option value="resource">자료실</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}><label>제목</label><input type="text" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required /></div>
                    <div className={styles.formGroup}><label>이미지</label><input type="file" multiple ref={fileInputRef} onChange={handleFileUpload} /></div>
                    <div className={styles.formGroup}><label>첨부파일</label><input type="file" multiple ref={resourceFileInputRef} onChange={handleResourceFileUpload} /></div>
                    <div className={styles.formGroup}><label>내용</label>
                        <textarea ref={textareaRef} value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} required />
                    </div>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={() => setIsModalOpen(false)}>취소</button>
                        <button type="submit" disabled={uploading}>저장</button>
                    </div>
                </form>
            )}
          </div>
        </div>
      )}

      {selectedPost && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{selectedPost.title || selectedPost.subject}</h3>
            <div style={{ whiteSpace: 'pre-wrap', minHeight: '100px' }}>{selectedPost.content || selectedPost.message}</div>
            <div style={{ marginTop: '20px' }}>
                <button className={styles.submitBtn} onClick={() => setSelectedPost(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

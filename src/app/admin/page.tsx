"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import styles from './Admin.module.css';
import { getYouTubeEmbedUrl } from '@/lib/utils';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'inquiries' | 'banners'>('posts');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null); // For viewing content
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  
  // New post state
  const [newPost, setNewPost] = useState({
    title: '',
    type: 'notice',
    content: '',
    author: '관리자',
    imageUrls: [] as string[],
    videoUrl: ''
  });

  // New banner state
  const [newBanner, setNewBanner] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    order: 0,
    isActive: true
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/members'); // Protected API
        if (res.ok) {
          setIsAuth(true);
          fetchData();
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      }
    };
    checkAuth();
  }, [activeTab, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
      router.push('/admin/login');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (newPost.imageUrls.length + files.length > 10) {
      alert('최대 10장까지만 업로드 가능합니다.');
      return;
    }

    setUploading(true);
    const newUrls = [...newPost.imageUrls];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          newUrls.push(data.url);
        }
      } catch (error) {
        console.error('Upload failed', error);
      }
    }
    
    setNewPost({ ...newPost, imageUrls: newUrls });
    setUploading(false);
  };

  const handleBannerFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setNewBanner({ ...newBanner, imageUrl: data.url });
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
    setUploading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${activeTab}`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (error) {
      console.error('Failed to fetch', error);
    }
    setLoading(false);
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/posts/${editingId}` : '/api/posts';
      const method = editingId ? 'PATCH' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPost,
          imageUrls: JSON.stringify(newPost.imageUrls)
        })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingId(null);
        setNewPost({ title: '', type: 'notice', content: '', author: '관리자', imageUrls: [], videoUrl: '' });
        fetchData();
        alert(editingId ? '게시물이 수정되었습니다.' : '게시물이 등록되었습니다.');
      }
    } catch (error) {
      console.error('Error saving post', error);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const url = activeTab === 'banners' ? `/api/banners/${id}` : `/api/posts/${id}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        alert('삭제되었습니다.');
      }
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const handleSubmitBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/banners/${editingId}` : '/api/banners';
      const method = editingId ? 'PATCH' : 'POST';
      
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
    } catch (error) {
      console.error('Error saving banner', error);
    }
  };

  const startEditPost = (post: any) => {
    setEditingId(post.id);
    if (activeTab === 'posts') {
      setNewPost({
        title: post.title,
        type: post.type,
        content: post.content,
        author: post.author || '관리자',
        imageUrls: post.imageUrls ? JSON.parse(post.imageUrls) : [],
        videoUrl: post.videoUrl || ''
      });
    } else if (activeTab === 'banners') {
      setNewBanner({
        title: post.title,
        subtitle: post.subtitle || '',
        imageUrl: post.imageUrl,
        order: post.order || 0,
        isActive: post.isActive ?? true
      });
    }
    setIsModalOpen(true);
  };

  const handleApprove = async (id: number) => {
    try {
      const res = await fetch('/api/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approved: true })
      });
      if (res.ok) {
        fetchData();
        alert('회원 가입이 승인되었습니다.');
      }
    } catch (error) {
      console.error('Approval failed', error);
    }
  };

  const handleResolve = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Resolve failed', error);
    }
  };

  if (!isAuth) return null;

  return (
    <div className={styles.adminPage}>
      <Header />
      <main className="container">
          <div className={styles.adminHeader}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0 }}>관리자 대시보드</h2>
              <button 
                onClick={handleLogout}
                style={{ 
                  padding: '8px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid #d2d2d7', 
                  background: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#ff3b30'
                }}
              >
                🔒 로그아웃
              </button>
            </div>
            <div className={styles.adminTabs}>
              <button className={activeTab === 'posts' ? styles.active : ''} onClick={() => setActiveTab('posts')}>게시물 관리</button>
              <button className={activeTab === 'banners' ? styles.active : ''} onClick={() => setActiveTab('banners')}>배너 관리</button>
              <button className={activeTab === 'members' ? styles.active : ''} onClick={() => setActiveTab('members')}>회원 가입</button>
              <button className={activeTab === 'inquiries' ? styles.active : ''} onClick={() => setActiveTab('inquiries')}>문의 내역</button>
            </div>
          </div>

        <div className={styles.actionRow}>
          <h3>{activeTab === 'posts' ? '전체 게시물' : activeTab === 'banners' ? '배너 목록' : activeTab === 'members' ? '회원 목록' : '문의 접수 내역'}</h3>
          {(activeTab === 'posts' || activeTab === 'banners') && (
            <button className={styles.createBtn} onClick={() => {
              setEditingId(null);
              if (activeTab === 'posts') {
                setNewPost({ title: '', type: 'notice', content: '', author: '관리자', imageUrls: [], videoUrl: '' });
              } else {
                setNewBanner({ title: '', subtitle: '', imageUrl: '', order: 0, isActive: true });
              }
              setIsModalOpen(true);
            }}>
              + {activeTab === 'posts' ? '새 게시물 작성' : '새 배너 등록'}
            </button>
          )}
        </div>

        <section className={styles.contentTable}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>데이터를 불러오는 중...</div>
          ) : (
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>{activeTab === 'posts' || activeTab === 'banners' ? '제목' : '이름/이메일'}</th>
                  {activeTab === 'banners' && <th style={{ width: '150px' }}>미리보기</th>}
                  {activeTab === 'members' && <th>회사/연락처</th>}
                  {activeTab === 'inquiries' && <th>문의내용</th>}
                  <th style={{ width: '120px' }}>유형/상태</th>
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
                        style={{ fontWeight: 600, color: (item.title && activeTab === 'posts') ? '#003366' : 'inherit', cursor: (item.title && activeTab === 'posts') ? 'pointer' : 'default' }}
                        onClick={() => activeTab === 'posts' && setSelectedPost(item)}
                      >
                        {item.title || item.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#86868b' }}>{activeTab === 'banners' ? item.subtitle : item.email}</div>
                    </td>
                    {activeTab === 'banners' && (
                      <td>
                        <div style={{ width: '100px', height: '50px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #eee' }}>
                          <img src={item.imageUrl} alt="banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </td>
                    )}
                    {activeTab === 'members' && (
                      <td>
                        <div>{item.company || '-'}</div>
                        <div style={{ fontSize: '12px', color: '#86868b' }}>{item.phone || '-'}</div>
                      </td>
                    )}
                    {activeTab === 'inquiries' && (
                      <td>
                        <div style={{ fontWeight: 500 }}>{item.subject}</div>
                        <div style={{ fontSize: '12px', color: '#86868b', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.message}
                        </div>
                      </td>
                    )}
                    <td>
                      <span style={{ 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        background: (item.approved || item.status === 'resolved' || (activeTab === 'banners' && item.isActive)) ? '#e8f5e9' : '#f0f0f2',
                        color: (item.approved || item.status === 'resolved' || (activeTab === 'banners' && item.isActive)) ? '#2e7d32' : '#1d1d1f',
                        fontWeight: 600
                      }}>
                        {activeTab === 'banners' ? (item.isActive ? '활성' : '비활성') : 
                         (item.type === 'notice' ? '공지' : item.type === 'news' ? '소식' : 
                         item.type === 'support' ? '지원사업' :
                         (item.status === 'resolved' ? '처리완료' : item.status === 'pending' ? '미처리' : 
                         (item.approved ? '승인완료' : '승인대기')))}
                      </span>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {(activeTab === 'posts' || activeTab === 'banners') && (
                          <>
                            <button 
                              className={styles.editActionBtn} 
                              onClick={() => startEditPost(item)}
                            >
                              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              수정
                            </button>
                            <button 
                              className={styles.deleteActionBtn} 
                              onClick={() => handleDeletePost(item.id)}
                            >
                              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                              </svg>
                              삭제
                            </button>
                          </>
                        )}
                        {activeTab === 'members' && !item.approved && (
                          <button 
                            className={styles.approveBtn} 
                            onClick={() => handleApprove(item.id)}
                          >
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            회원 승인
                          </button>
                        )}
                        {activeTab === 'inquiries' && (
                          <button 
                            className={item.status === 'resolved' ? styles.editActionBtn : styles.approveBtn} 
                            onClick={() => handleResolve(item.id, item.status === 'resolved' ? 'pending' : 'resolved')}
                          >
                            {item.status === 'resolved' ? (
                              <>
                                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                  <path d="M23 4v6h-6M1 20v-6h6" />
                                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                                </svg>
                                재오픈
                              </>
                            ) : (
                              <>
                                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                완료
                              </>
                            )}
                          </button>
                        )}
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
            <h3>{activeTab === 'banners' ? (editingId ? '배너 수정' : '새 배너 등록') : (editingId ? '게시물 수정' : '새 게시물 작성')}</h3>
            {activeTab === 'banners' ? (
              <form onSubmit={handleSubmitBanner}>
                <div className={styles.formGroup}>
                  <label>제목</label>
                  <input 
                    type="text" 
                    value={newBanner.title} 
                    onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>부제목</label>
                  <input 
                    type="text" 
                    value={newBanner.subtitle} 
                    onChange={(e) => setNewBanner({...newBanner, subtitle: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>배너 이미지 {uploading && <span style={{ fontSize: '12px', color: '#003366' }}>(업로드 중...)</span>}</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleBannerFileUpload}
                    />
                    {newBanner.imageUrl && (
                      <div style={{ width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                        <img src={newBanner.imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>순서 (작은 숫자가 앞)</label>
                  <input 
                    type="number" 
                    value={newBanner.order} 
                    onChange={(e) => setNewBanner({...newBanner, order: parseInt(e.target.value)})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input 
                      type="checkbox" 
                      checked={newBanner.isActive} 
                      onChange={(e) => setNewBanner({...newBanner, isActive: e.target.checked})}
                    />
                    활성화 여부
                  </label>
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                  }}>취소</button>
                  <button type="submit" className={styles.submitBtn}>{editingId ? '수정 완료' : '등록하기'}</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitPost}>
                <div className={styles.formGroup}>
                  <label>구분</label>
                  <select 
                    value={newPost.type} 
                    onChange={(e) => setNewPost({...newPost, type: e.target.value})}
                  >
                    <option value="notice">공지사항</option>
                    <option value="news">센터소식</option>
                    <option value="support">지원사업</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>제목</label>
                  <input 
                    type="text" 
                    value={newPost.title} 
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>이미지 첨부 (최대 10장) {uploading && <span style={{ fontSize: '12px', color: '#003366' }}>(업로드 중...)</span>}</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      disabled={newPost.imageUrls.length >= 10}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                      {newPost.imageUrls.map((url, idx) => (
                        <div key={idx} style={{ position: 'relative', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ddd' }}>
                          <img src={url} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button 
                            type="button"
                            onClick={() => setNewPost({ ...newPost, imageUrls: newPost.imageUrls.filter((_, i) => i !== idx) })}
                            style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', cursor: 'pointer' }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>동영상 URL (선택)</label>
                  <input 
                    type="text" 
                    placeholder="Youtube 또는 영상 링크"
                    value={newPost.videoUrl} 
                    onChange={(e) => setNewPost({...newPost, videoUrl: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>내용</label>
                  <textarea 
                    value={newPost.content} 
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                  }}>취소</button>
                  <button type="submit" className={styles.submitBtn}>{editingId ? '수정 완료' : '등록하기'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {selectedPost && (
        <div className={styles.modal}>
          <div className={styles.modalContent} style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span className={styles.badge} style={{ background: '#f0f0f2', padding: '4px 12px' }}>
                {selectedPost.type === 'notice' ? '공지사항' : selectedPost.type === 'news' ? '센터소식' : '지원사업'}
              </span>
              <button onClick={() => setSelectedPost(null)} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>{selectedPost.title}</h2>
            
            {selectedPost.imageUrls && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                {(() => {
                  try {
                    const urls = JSON.parse(selectedPost.imageUrls);
                    return Array.isArray(urls) ? urls.map((url, idx) => (
                      <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
                        <img src={url} alt={`preview-${idx}`} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      </div>
                    )) : null;
                  } catch (e) { return null; }
                })()}
              </div>
            )}

            {selectedPost.videoUrl && (
              <div style={{ marginBottom: '20px', background: '#000', borderRadius: '12px', overflow: 'hidden', paddingBottom: '56.25%', position: 'relative' }}>
                <iframe 
                  src={getYouTubeEmbedUrl(selectedPost.videoUrl)} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div style={{ fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-wrap', color: '#1d1d1f' }}>
              {selectedPost.content}
            </div>
            
            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #f2f2f2', display: 'flex', justifyContent: 'flex-end' }}>
              <button className={styles.submitBtn} onClick={() => setSelectedPost(null)}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

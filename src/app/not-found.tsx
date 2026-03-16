"use client";

export default function NotFound() {
  return (
    <div style={{ padding: "100px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <p style={{ color: "#666", margin: "20px 0" }}>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <a href="/" style={{ color: "#003366", textDecoration: "underline" }}>홈으로 돌아가기</a>
    </div>
  );
}

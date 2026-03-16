"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: "100px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>문제가 발생했습니다.</h2>
      <p style={{ color: "#666", margin: "20px 0" }}>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 20px",
          background: "#003366",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </div>
  );
}

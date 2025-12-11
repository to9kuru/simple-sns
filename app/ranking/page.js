"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "simple_sns_posts_v1";

export default function Ranking() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setPosts(Array.isArray(raw) ? raw : []);
    } catch {
      setPosts([]);
    }
  }, []);

  const sorted = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 50);

  return (
    <div className="glass">
      <h1>⭐ いいねランキング</h1>
      {sorted.length === 0 && <div className="post-meta">ランキングはまだありません</div>}
      {sorted.map((p) => (
        <div key={p.id} className="glass-sm post-card">
          <a href={`/post/${p.id}`}>{p.text}</a>
          <div className="post-meta">👍 {p.likes}</div>
        </div>
      ))}
      <div style={{ marginTop: 12 }}>
        <a href="/">← タイムラインへ戻る</a>
      </div>
    </div>
  );
}

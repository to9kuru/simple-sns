"use client";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem("posts") || "[]"));
  }, []);

  const sorted = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 5);

  return (
    <div className="glass">
      <h1>⭐ いいねトップ5</h1>

      {sorted.map((p) => (
        <div className="glass" key={p.id}>
          <a href={`/post/${p.id}`}>{p.text}</a>
          <div>👍 {p.likes}</div>
        </div>
      ))}

      <a href="/" style={{ display: "block", marginTop: 20 }}>
        ← 戻る
      </a>
    </div>
  );
}

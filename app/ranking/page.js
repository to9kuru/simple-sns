"use client";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(saved);
  }, []);

  const top5 = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">ナイスすぎランキング</h2>

      {top5.length === 0 && <p>まだ投稿がありません</p>}

      {top5.map((p, i) => (
        <div key={p.id} className="glass p-4 rounded-xl">
          <div className="font-bold">#{i + 1}</div>
          <div>{p.text}</div>
          <div className="mt-2">❤️ {p.likes}</div>
        </div>
      ))}
    </div>
  );
}

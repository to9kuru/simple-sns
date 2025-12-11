"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "simple_sns_posts_v1";

function ensurePostShape(post) {
  return {
    id: post.id ?? Date.now(),
    text: post.text ?? "",
    likes: typeof post.likes === "number" ? post.likes : 0,
    replies: Array.isArray(post.replies) ? post.replies : [],
    created: post.created ?? new Date().toISOString(),
  };
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setPosts(raw.map(ensurePostShape));
    } catch {
      setPosts([]);
    }
  }, []);

  const savePosts = (next) => {
    const normalized = next.map(ensurePostShape);
    setPosts(normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  };

  const addPost = () => {
    if (!text.trim()) return;
    const newPost = {
      id: Date.now(),
      text: text.trim(),
      likes: 0,
      replies: [],
      created: new Date().toISOString(),
    };
    savePosts([newPost, ...posts]);
    setText("");
  };

  const likePost = (id) => {
    savePosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const top5 = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 5);

  return (
    <>
      <div className="glass">
        <h2>新規投稿</h2>
        <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} />
        <div style={{ marginTop: 8 }}>
          <button onClick={addPost}>投稿</button>
        </div>
      </div>

      <div className="glass">
        <h3>🔥 いいねトップ5</h3>
        {top5.length === 0 ? (
          <div className="post-meta">投稿がありません</div>
        ) : (
          top5.map((p) => (
            <div key={p.id} className="glass-sm post-card" style={{ marginBottom: 8 }}>
              <a href={`/post/${p.id}`}>{p.text}</a>
              <div className="post-meta">👍 {p.likes}</div>
            </div>
          ))
        )}
      </div>

      <h3 style={{ marginTop: 8 }}>タイムライン（新しい順）</h3>
      {posts.length === 0 && <div className="post-meta">まだ投稿がありません</div>}
      {posts.map((p) => (
        <div key={p.id} className="glass post-card">
          <div>{p.text}</div>
          <div className="post-meta flex-between">
            <div className="row">
              <button onClick={() => likePost(p.id)}>👍 {p.likes}</button>
              <a href={`/post/${p.id}`} style={{ marginLeft: 10 }}>返信を見る</a>
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{new Date(p.created).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </>
  );
}

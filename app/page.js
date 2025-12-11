"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(saved);
  }, []);

  const addPost = () => {
    if (!text.trim()) return;

    const newPost = {
      id: Date.now(),
      text,
      likes: 0,
      replies: [],
      created: new Date().toISOString(),
    };

    const newPosts = [newPost, ...posts];
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
    setText("");
  };

  const like = (id) => {
    const newPosts = posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <main>
      <h1>Simple SNS</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="投稿を書く"
        rows={3}
      />

      <br />
      <button onClick={addPost}>投稿</button>

      <h2>タイムライン</h2>

      {posts.map((p) => (
        <div
          key={p.id}
          style={{
            background: "#fff",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
          }}
        >
          <p>{p.text}</p>

          <button onClick={() => like(p.id)}>👍 {p.likes}</button>
          <a href={`/post/${p.id}`} style={{ marginLeft: "10px" }}>
            返信を見る
          </a>
        </div>
      ))}
    </main>
  );
}

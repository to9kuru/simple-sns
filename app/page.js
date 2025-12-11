"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(saved);
  }, []);

  const savePosts = (data) => {
    setPosts(data);
    localStorage.setItem("posts", JSON.stringify(data));
  };

  const addPost = () => {
    if (!text.trim()) return;
    const newPost = {
      id: Date.now(),
      text,
      likes: 0,
      replies: [],
      created: new Date().toISOString(),
    };
    savePosts([newPost, ...posts]);
    setText("");
  };

  const likePost = (id) => {
    const newPosts = posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    savePosts(newPosts);
  };

  return (
    <>
      <div className="glass">
        <h2>新規投稿</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
        <button onClick={addPost}>投稿</button>
      </div>

      <h2>タイムライン</h2>
      {posts.map((p) => (
        <div className="glass" key={p.id}>
          <p>{p.text}</p>
          <button onClick={() => likePost(p.id)}>👍 {p.likes}</button>
          <a href={`/post/${p.id}`} style={{ marginLeft: 10 }}>
            返信
          </a>
        </div>
      ))}
    </>
  );
}

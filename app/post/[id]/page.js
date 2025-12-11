"use client";

import { useState, useEffect } from "react";

export default function PostDetail({ params }) {
  const id = parseInt(params.id);
  const [post, setPost] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    const found = saved.find((p) => p.id === id);
    setPost(found);
  }, [id]);

  const addReply = () => {
    if (!reply.trim()) return;
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");

    const newPosts = saved.map((p) =>
      p.id === id
        ? {
            ...p,
            replies: [
              {
                text: reply,
                created: new Date().toISOString(),
              },
              ...(p.replies || []),
            ],
          }
        : p
    );

    localStorage.setItem("posts", JSON.stringify(newPosts));
    setPost(newPosts.find((p) => p.id === id));
    setReply("");
  };

  if (!post) return <p>読み込み中…</p>;

  return (
    <main>
      <h1>投稿詳細</h1>
      <p>{post.text}</p>

      <h2>返信を書く</h2>
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        rows={3}
      />
      <br />
      <button onClick={addReply}>返信</button>

      <h2>返信一覧</h2>
      {post.replies?.map((r, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "8px",
            margin: "10px 0",
            borderRadius: "6px",
          }}
        >
          {r.text}
        </div>
      ))}

      <a href="/" style={{ display: "block", marginTop: "20px" }}>
        ← タイムラインへ戻る
      </a>
    </main>
  );
}

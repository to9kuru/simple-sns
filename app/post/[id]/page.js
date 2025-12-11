"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "simple_sns_posts_v1";

export default function PostDetail({ params }) {
  const id = Number(params.id);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const normalized = Array.isArray(raw) ? raw : [];
      setPosts(normalized);
      setPost(normalized.find((p) => Number(p.id) === id) ?? null);
    } catch {
      setPosts([]);
      setPost(null);
    }
  }, [id]);

  const savePosts = (next) => {
    setPosts(next);
    const found = next.find((p) => Number(p.id) === id) ?? null;
    setPost(found);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addReply = () => {
    if (!replyText.trim()) return;
    const next = posts.map((p) =>
      Number(p.id) === id
        ? { ...p, replies: [{ text: replyText.trim(), likes: 0, created: new Date().toISOString() }, ...(p.replies || [])] }
        : p
    );
    savePosts(next);
    setReplyText("");
  };

  const likePost = () => {
    const next = posts.map((p) => (Number(p.id) === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
    savePosts(next);
  };

  const likeReply = (indexFromTop) => {
    // replies shown newest-first; indexFromTop is index in displayed order
    const current = posts.map((p) => {
      if (Number(p.id) !== id) return p;
      const replies = Array.isArray(p.replies) ? p.replies.slice() : [];
      // displayed newest-first, but stored oldest-first; convert:
      const storedIndex = replies.length - 1 - indexFromTop;
      if (storedIndex >= 0 && replies[storedIndex]) {
        replies[storedIndex] = { ...replies[storedIndex], likes: (replies[storedIndex].likes || 0) + 1 };
      }
      return { ...p, replies };
    });
    savePosts(current);
  };

  if (!post) {
    return (
      <div className="glass">
        <div className="post-meta">投稿が見つかりません（または読み込み中）</div>
        <div style={{ marginTop: 12 }}>
          <a href="/">← タイムラインへ戻る</a>
        </div>
      </div>
    );
  }

  const displayedReplies = Array.isArray(post.replies) ? [...post.replies].reverse() : [];

  return (
    <>
      <div className="glass">
        <h2>投稿</h2>
        <div style={{ whiteSpace: "pre-wrap" }}>{post.text}</div>
        <div className="post-meta row" style={{ marginTop: 10 }}>
          <button onClick={likePost}>👍 {post.likes || 0}</button>
          <div style={{ marginLeft: 8, fontSize: 12, color: "#64748b" }}>{new Date(post.created).toLocaleString()}</div>
        </div>
      </div>

      <div className="glass">
        <h3>返信を書く</h3>
        <textarea rows={3} value={replyText} onChange={(e) => setReplyText(e.target.value)} />
        <div style={{ marginTop: 8 }}>
          <button onClick={addReply}>返信</button>
        </div>
      </div>

      <div className="glass">
        <h3>返信一覧（新しい順）</h3>
        {displayedReplies.length === 0 && <div className="post-meta">返信はまだありません</div>}
        {displayedReplies.map((r, idx) => (
          <div key={idx} className="glass-sm post-card" style={{ marginBottom: 8 }}>
            <div style={{ whiteSpace: "pre-wrap" }}>{r.text}</div>
            <div className="row" style={{ marginTop: 8, justifyContent: "space-between" }}>
              <button onClick={() => likeReply(idx)}>❤️ {r.likes || 0}</button>
              <div style={{ fontSize: 12, color: "#64748b" }}>{new Date(r.created).toLocaleString()}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 12 }}>
          <a href="/">← タイムラインへ戻る</a>
        </div>
      </div>
    </>
  );
}

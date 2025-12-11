"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(saved);
  }, []);

  const save = (data) => {
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
    save([newPost, ...posts]);
    setText("");
  };

  const togglePostLike = (id) => {
    const newData = posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    save(newData);
  };

  const addReply = (postId) => {
    if (!replyText.trim()) return;
    const newData = posts.map((p) =>
      p.id === postId
        ? {
            ...p,
            replies: [
              {
                text: replyText,
                likes: 0,
                created: new Date().toISOString(),
              },
              ...p.replies,
            ],
          }
        : p
    );
    save(newData);
    setReplyText("");
  };

  const likeReply = (postId, index) => {
    const newData = posts.map((p) => {
      if (p.id !== postId) return p;
      const r = [...p.replies];
      r[index].likes += 1;
      return { ...p, replies: r };
    });
    save(newData);
  };

  return (
    <div className="space-y-4">

      {/* 投稿入力 */}
      <div className="glass p-4 rounded-xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full"
          placeholder="いまどうしてる？"
        />
        <button onClick={addPost} className="glass-btn mt-2">
          投稿
        </button>
      </div>

      {/* 投稿一覧 */}
      {posts.map((p) => (
        <div key={p.id} className="glass p-4 rounded-xl">
          <div>{p.text}</div>

          <div className="flex gap-2 mt-3">
            <button onClick={() => togglePostLike(p.id)} className="glass-btn">
              ❤️ {p.likes}
            </button>
            <button
              className="glass-btn"
              onClick={() =>
                setActivePost(activePost === p.id ? null : p.id)
              }
            >
              💬 返信
            </button>
          </div>

          {/* 返信欄（ページ遷移なし） */}
          {activePost === p.id && (
            <div className="mt-3 space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={2}
                className="w-full"
              />
              <button
                onClick={() => addReply(p.id)}
                className="glass-btn w-full"
              >
                返信する
              </button>
            </div>
          )}

          {/* 返信一覧 */}
          <div className="mt-4 space-y-2">
            {p.replies.map((r, i) => (
              <div key={i} className="glass p-3 rounded-lg">
                <div>{r.text}</div>
                <button
                  onClick={() => likeReply(p.id, i)}
                  className="glass-btn mt-1"
                >
                  ❤️ {r.likes}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

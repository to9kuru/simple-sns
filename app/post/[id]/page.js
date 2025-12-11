"use client";
import { useState, useEffect } from "react";


export default function PostDetail({ params }) {
const id = parseInt(params.id);
const [posts, setPosts] = useState([]);
const [post, setPost] = useState(null);
const [reply, setReply] = useState("");


useEffect(() => {
const saved = JSON.parse(localStorage.getItem("posts") || "[]");
setPosts(saved);
setPost(saved.find((p) => p.id === id));
}, [id]);


const savePosts = (data) => {
setPosts(data);
setPost(data.find((p) => p.id === id));
localStorage.setItem("posts", JSON.stringify(data));
};


const addReply = () => {
if (!reply.trim()) return;
const newPosts = posts.map((p) =>
p.id === id
? {
...p,
replies: [
{ text: reply, likes: 0, created: new Date().toISOString() },
...p.replies,
],
}
: p
);
savePosts(newPosts);
setReply("");
};


const likeReply = (i) => {
const newPosts = posts.map((p) => {
if (p.id !== id) return p;
const r = [...p.replies];
r[i].likes += 1;
return { ...p, replies: r };
});
savePosts(newPosts);
};


if (!post) return <p>読み込み中…</p>;


return (
<>
<div className="glass">
<h2>投稿</h2>
<p>{post.text}</p>
</div>


<div className="glass">
<h3>返信を書く</h3>
<textarea
rows={3}
value={reply}
onChange={(e) => setReply(e.target.value)}
style={{ width: "100%" }}
/>
<button onClick={addReply}>返信</button>
</div>


<h3>返信一覧</h3>
{post.replies.map((r, i) => (
<div className="glass" key={i}>
{r.text}
<div>
{post.replies
  .slice()
  .reverse()
  .map((r, i) => (
    <div className="glass p-3 mb-3 rounded-xl border border-white/20 shadow-sm" key={i}>
      <div className="text-sm">{r.text}</div>

      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => toggleReplyLike(id, i)}
          className="px-2 py-1 text-xs rounded-md backdrop-blur-md bg-white/30 border border-white/20 shadow"
        >
          ❤️ {r.likes}
        </button>
      </div>
    </div>
  ))}

"use client";
const [posts, setPosts] = useState([]);
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


const likeReply = (index) => {
const newPosts = posts.map((p) => {
if (p.id !== id) return p;
const newReplies = [...p.replies];
newReplies[index].likes += 1;
return { ...p, replies: newReplies };
});
savePosts(newPosts);
};


if (!post) return <p>読み込み中…</p>;


return (
<main>
<div className="glass">
<h2>投稿</h2>
<p>{post.text}</p>
</div>


<div className="glass" style={{ marginTop: 20 }}>
<h3>返信を書く</h3>
<textarea
value={reply}
onChange={(e) => setReply(e.target.value)}
rows={3}
style={{ width: "100%" }}
/>
<button onClick={addReply}>返信</button>
</div>


<div style={{ marginTop: 20 }}>
<h3>返信一覧</h3>
{post.replies.map((r, i) => (
<div className="glass" key={i} style={{ marginBottom: 12 }}>
{r.text}
<div>
<button onClick={() => likeReply(i)}>👍 {r.likes}</button>
</div>
</div>
))}
</div>


<a href="/" style={{ marginTop: 30, display: "block" }}>← 戻る</a>
</main>
);
}

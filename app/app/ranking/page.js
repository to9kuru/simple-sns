"use client";
import { useEffect, useState } from "react";


export default function Ranking() {
const [posts, setPosts] = useState([]);


useEffect(() => {
setPosts(JSON.parse(localStorage.getItem("posts") || "[]"));
}, []);


const top = [...posts].sort((a, b) => b.likes - a.likes);


return (
<main>
<div className="glass">
<h1>⭐ いいねランキング</h1>
{top.map((p) => (
<div key={p.id} style={{ marginBottom: 10 }}>
<a href={`/post/${p.id}`}>{p.text}</a>
<div>👍 {p.likes}</div>
</div>
))}
</div>
<a href="/" style={{ marginTop: 20, display: "block" }}>← 戻る</a>
</main>
);
}

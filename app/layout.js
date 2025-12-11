export const metadata = {
title: "Simple SNS",
};


export default function RootLayout({ children }) {
return (
<html lang="ja">
<body class="min-h-screen bg-gray-100 text-black">
<header class="w-full backdrop-blur-xl bg-white/30 border-b border-white/20 sticky top-0 z-50">
<nav class="max-w-3xl mx-auto flex items-center justify-between p-4">
<a href="/" class="font-semibold">Simple SNS</a>
<div class="flex items-center gap-4 text-sm">
<a href="/ranking" class="hover:underline">ランキング</a>
<a href="/settings" class="hover:underline">設定</a>
</div>
</nav>
</header>
<div className="top-menu">
<a href="/ranking">⭐ ランキング</a>
</div>
{children}
<footer class="text-center text-xs text-gray-500 py-6">© Simple SNS</footer>
</body>
</html>
);
}

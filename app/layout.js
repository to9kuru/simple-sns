export const metadata = {
title: "Simple SNS",
};


export default function RootLayout({ children }) {
return (
<html lang="ja">
<body>
<div className="top-menu">
<a href="/ranking">⭐ ランキング</a>
</div>
{children}
</body>
</html>
);
}

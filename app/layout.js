import "./globals.css";

export const metadata = {
  title: "Simple SNS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <div className="container">
          <header className="header">
            <div className="glass glass-sm header-inner">
              <a href="/" style={{ fontWeight: 700 }}>Simple SNS</a>
              <div className="row">
                <a href="/ranking" style={{ padding: "6px 8px" }}>⭐ ランキング</a>
                <a href="/settings" style={{ padding: "6px 8px" }}>設定</a>
              </div>
            </div>
          </header>

          <main>{children}</main>

          <footer className="center">
            <div style={{ marginTop: 20 }}>© Simple SNS</div>
          </footer>
        </div>
      </body>
    </html>
  );
}

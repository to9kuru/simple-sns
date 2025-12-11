export const metadata = {
  title: "Simple SNS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-100 text-black">

        <header className="w-full backdrop-blur-xl bg-white/30 border-b border-white/20 sticky top-0 z-50">
          <nav className="max-w-3xl mx-auto flex items-center justify-between p-4">
            <a href="/" className="font-semibold">Simple SNS</a>
            <div className="flex items-center gap-4 text-sm">
              <a href="/ranking" className="hover:underline">ランキング</a>
              <a href="/settings" className="hover:underline">設定</a>
            </div>
          </nav>
        </header>

        <main className="max-w-3xl mx-auto mt-6 p-4 glass">
          {children}
        </main>

        <footer className="text-center text-xs text-gray-500 py-6">
          © Simple SNS
        </footer>
      </body>
    </html>
  );
}

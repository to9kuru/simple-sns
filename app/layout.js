import "../styles/globals.css";

export const metadata = {
  title: "Simple SNS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-gradient-to-b from-[#dfe9f3] to-[#ffffff] min-h-screen p-4">
        <div className="max-w-xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Simple SNS</h1>
            <a
              href="/ranking"
              className="px-3 py-1 rounded-xl backdrop-blur-md bg-white/30 border border-white/20 shadow"
            >
              ナイスすぎランキング
            </a>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}

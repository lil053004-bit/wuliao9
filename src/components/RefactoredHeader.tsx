export default function RefactoredHeader() {
  return (
    <header className="relative w-full px-5 pt-4 pb-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg leading-tight tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.2)' }}>
          AIによる銘柄診断
        </h1>

        <div className="flex justify-between items-end">
          <h2 className="text-base text-white font-semibold leading-snug drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
            AIがあなたの銘柄を徹底分析
          </h2>

          <div className="w-20 h-20 flex-shrink-0">
            <img
              src="/assets/图层 3.png"
              alt="AI"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

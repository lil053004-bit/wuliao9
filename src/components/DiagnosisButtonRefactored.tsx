interface DiagnosisButtonRefactoredProps {
  onClick: () => void;
  stockCode?: string;
  disabled?: boolean;
  text?: string;
}

export default function DiagnosisButtonRefactored({ onClick, stockCode, disabled = false, text }: DiagnosisButtonRefactoredProps) {
  const buttonText = text || (stockCode ? `${stockCode} AI診断` : 'AI診断');

  return (
    <div className="w-full px-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className="relative w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          minHeight: '64px',
        }}
      >
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: 'url(/assets/按钮.png)',
            minHeight: '64px',
          }}
        >
          <span className="text-white font-bold text-base pr-8">
            {buttonText}
          </span>
        </div>
      </button>
    </div>
  );
}

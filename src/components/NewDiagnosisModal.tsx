import { X, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import RobotScholarIcon from './RobotScholarIcon';

interface NewDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  stockCode: string;
  stockName: string;
  stockPrice: string;
  priceChange: string;
  onLineConversion: () => void;
  isStreaming?: boolean;
  isConnecting?: boolean;
}

const formatAnalysisText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    const formattedLine = line.replace(/(\d+\.?\d*%?|\d+円|[+-]\d+\.?\d*)/g, (match) => {
      return `<span class="text-blue-600 font-semibold text-lg">${match}</span>`;
    });

    const isBold = line.includes('###') || line.includes('**') || line.match(/^[\d]+\./);
    const cleanLine = formattedLine.replace(/###|\*\*/g, '');

    if (isBold) {
      return `<div key="${index}" class="font-bold text-blue-900 mt-4 mb-2">${cleanLine}</div>`;
    }

    return `<div key="${index}" class="text-gray-700">${cleanLine}</div>`;
  }).join('');
};

export default function NewDiagnosisModal({
  isOpen,
  onClose,
  analysis,
  stockCode,
  stockName,
  stockPrice,
  priceChange,
  onLineConversion,
  isStreaming = false,
  isConnecting = false,
}: NewDiagnosisModalProps) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-modal-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm" style={{ touchAction: 'none' }}>
      <div className="relative w-full max-w-2xl max-h-[95vh]">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 scale-75 sm:scale-100">
          <RobotScholarIcon />
        </div>

        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-blue-glow-lg overflow-hidden border border-blue-400/50 mt-16 sm:mt-20" style={{ touchAction: 'auto' }}>
          <div className="relative sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-2 sm:px-5 sm:py-3 flex items-center justify-between border-b border-blue-400/30 backdrop-blur-sm z-10">
          <div className="flex-1 text-center pr-8">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
              {stockName}（{stockCode}）AIによる銘柄診断レポート
            </h2>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 p-1 sm:p-2 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
            style={{ pointerEvents: 'auto' }}
            aria-label="閉じる"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)] px-3 py-3 sm:px-5 sm:py-4 space-y-3 sm:space-y-4">

          <h3 className="text-lg sm:text-xl font-bold text-blue-900 text-center mb-4">AI診断結果</h3>

          <div className="relative bg-blue-50 backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-5 border border-blue-300/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>

            <div className="relative space-y-2 sm:space-y-3">
              <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-blue-200/50 backdrop-blur-sm">
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
                  {isConnecting ? (
                    <div className="text-center py-4">
                      <p className="text-blue-600 font-semibold">接続中...</p>
                    </div>
                  ) : (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: formatAnalysisText(analysis) }} />
                      {isStreaming && (
                        <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1"></span>
                      )}
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={onLineConversion}
                disabled={isConnecting || isStreaming}
                className="relative z-10 w-full bg-gradient-to-r from-[#06C755] to-[#05b04b] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-[#05b04b] hover:to-[#049c42] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                style={{ pointerEvents: 'auto' }}
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                LINEで詳細な診断レポートを受け取る
              </button>

              <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-600/30">
                <p className="text-xs sm:text-sm text-green-700 leading-relaxed">
                  メッセージを送信した瞬間にAI診断が始まり、最新レポートが即座に届きます。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative sticky bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent px-3 py-3 sm:px-5 sm:py-4 border-t border-blue-300/30 backdrop-blur-sm">
          <p className="text-[12px] sm:text-xs text-blue-600 text-center">
            「AI 株式 アシスタント」を追加して、銘柄コード「{stockName}」または「{stockCode}」を送信
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

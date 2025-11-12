import { useEffect, useState } from 'react';
import RobotScholarIcon from './RobotScholarIcon';

export default function DiagnosisProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const animateProgress = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) {
            return prev + Math.random() * 15;
          } else if (prev < 98) {
            return prev + Math.random() * 2;
          }
          return prev;
        });
      }, 100);
    };

    animateProgress();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-blue-glow-lg border-2 border-blue-400/50 p-8">
        <RobotScholarIcon />

        <div className="mb-6">
          <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">AI診断を実行中</h3>
          <p className="text-sm text-blue-600 text-center">市場データを分析しています...</p>
        </div>

        <div className="relative w-full h-3 bg-blue-50 rounded-full overflow-hidden mb-3 border border-blue-200">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out shadow-blue-glow"
            style={{ width: `${Math.min(progress, 99)}%` }}
          />
        </div>

        <div className="mb-6 text-center">
          <span className="text-sm font-semibold text-blue-600">
            {Math.floor(Math.min(progress, 99))}%
          </span>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300/50 rounded-lg p-6">
          <div className="space-y-3 text-sm">
            <p className="text-blue-900 font-semibold text-center text-base">
              📊 データはAIによって深度分析中です
            </p>
            <p className="text-blue-700 text-center">
              しばらくお待ちください
            </p>
            <div className="pt-3 border-t border-blue-200">
              <p className="text-xs text-blue-600 text-center leading-relaxed">
                すべてのデータは公開されている市場情報を使用しており、データの真実性と有効性を保証します。本分析は最新のAI技術により、財務指標、業界動向、市場トレンドを総合的に評価しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

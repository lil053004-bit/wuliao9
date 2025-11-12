import { TrendingUp, TrendingDown } from 'lucide-react';
import { StockInfo, StockPrice } from '../types/stock';

interface MobileStockPriceCardProps {
  info: StockInfo;
  latestPrice?: StockPrice;
}

export default function MobileStockPriceCard({ info, latestPrice }: MobileStockPriceCardProps) {
  const isPositive = info.change.includes('+') || parseFloat(info.change) > 0;
  const changeColor = isPositive ? 'text-green-500' : info.change === '0.0' ? 'text-gray-400' : 'text-red-500';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className="rounded-2xl shadow-2xl overflow-hidden bg-cover bg-center relative"
      style={{
        backgroundImage: 'url(/assets/矩形 2 拷贝 3.png)',
      }}
    >
      <div className="absolute inset-0 bg-white/90"></div>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl font-bold text-gray-900">{info.price}</span>
              <TrendIcon className={`w-12 h-12 ${isPositive ? 'text-blue-500' : 'text-red-500'}`} />
            </div>
            <div className={`text-2xl font-bold ${changeColor} flex items-center gap-2`}>
              <span>{info.change}</span>
              <span>{info.changePercent}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 font-semibold">初期終値</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.open || info.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 font-semibold">高値</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.high || info.price}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 font-semibold">当日終値</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.close || info.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 font-semibold">売買高</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.volume || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-blue-600 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{info.name}</span>
          <span className="text-sm text-blue-100">({info.code})</span>
        </div>
        <span className="text-xs text-blue-100">{info.timestamp}</span>
      </div>
    </div>
  );
}

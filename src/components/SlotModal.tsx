import { useState, useRef, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import type { SlotGame } from "@/data/slots";
import { useGameStore, gameStore } from "@/store/gameStore";

const SYMBOLS_BY_CATEGORY: Record<string, string[]> = {
  "Египет":      ["📜", "🏺", "👁", "🔱", "🦅", "💎", "⚱️", "☀️", "🐍", "👑"],
  "Мифология":   ["⚡", "🔱", "🌊", "🔥", "🌪️", "🦄", "🐲", "🪄", "⚔️", "👑"],
  "Космос":      ["🚀", "🌌", "🪐", "👽", "💫", "🛸", "🌠", "🔭", "🌑", "👑"],
  "Животные":    ["🐺", "🦁", "🐯", "🦊", "🦅", "🐘", "🦂", "🐲", "🦋", "👑"],
  "Пираты":      ["⚓", "💀", "🦜", "🗡️", "🔭", "🗺️", "🌊", "💣", "🏴‍☠️", "👑"],
  "Азия":        ["🐉", "🌸", "⛩️", "🪔", "🎐", "🀄", "🎎", "🏯", "🌺", "👑"],
  "Ретро":       ["💎", "🔔", "⭐", "🃏", "🎲", "🪙", "🏆", "💛", "🎯", "👑"],
  "Мегавейс":    ["💎", "🌈", "⚡", "🔥", "💥", "🌟", "🏆", "🎯", "🔮", "👑"],
  "Приключения": ["⚔️", "🔮", "🗝️", "🐉", "🌟", "🏹", "💎", "🏰", "🛡️", "👑"],
  "Тёмный мир":  ["💀", "🌑", "🔥", "⚔️", "🦇", "🕸️", "🧿", "🌙", "🪦", "👑"],
};

const DEFAULT_SYMBOLS = ["💎", "🔔", "⭐", "🃏", "🎲", "🪙", "🏆", "⚡", "🔥", "👑"];

const MULTIPLIERS: Record<string, number> = {
  "👑": 100, "💎": 20, "🏆": 15, "👽": 12, "🐉": 12, "🐲": 12,
  "⚡": 10, "🔥": 10, "🌟": 10, "🌈": 10, "🔮": 10, "🌌": 8,
  "🚀": 8, "🦁": 8, "⚔️": 7, "🔱": 7, "🌊": 6, "🦅": 6,
  "📜": 5, "🏺": 5, "⚓": 5, "🐺": 5, "🌸": 5, "🔔": 4,
  "⭐": 4, "🃏": 3, "🎲": 3, "🪙": 3, "💀": 6, "🌙": 5,
};

function getSymbols(category: string) {
  return SYMBOLS_BY_CATEGORY[category] ?? DEFAULT_SYMBOLS;
}

function buildReel(symbols: string[], size = 30) {
  return Array.from({ length: size }, () => symbols[Math.floor(Math.random() * symbols.length)]);
}

const REEL_COUNT = 5;

interface ReelProps {
  symbols: string[];
  spinning: boolean;
  stopped: boolean;
  result: string[];
}

function Reel({ symbols, spinning, stopped, result }: ReelProps) {
  const [display, setDisplay] = useState<string[]>([symbols[0], symbols[1], symbols[2]]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    if (spinning && !stopped) {
      timerRef.current = setInterval(() => {
        idxRef.current = (idxRef.current + 1) % symbols.length;
        setDisplay([
          symbols[idxRef.current % symbols.length],
          symbols[(idxRef.current + 1) % symbols.length],
          symbols[(idxRef.current + 2) % symbols.length],
        ]);
      }, 60);
    } else if (stopped) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplay(result);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [spinning, stopped, result, symbols]);

  return (
    <div className="flex flex-col gap-1">
      {display.map((sym, i) => (
        <div key={i} className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl text-xl sm:text-2xl select-none border transition-all duration-100 ${i === 1 ? "border-accent/60 bg-accent/10 scale-105 shadow-lg shadow-accent/20" : "border-white/10 bg-black/40"}`}>
          {sym}
        </div>
      ))}
    </div>
  );
}

interface DepositModalProps { onClose: () => void; }
function DepositModal({ onClose }: DepositModalProps) {
  const [amount, setAmount] = useState(1000);
  const [result, setResult] = useState<{ credited: number; bonus: number } | null>(null);
  const PRESETS = [500, 1000, 2000, 5000, 10000];

  function handleDeposit() {
    const res = gameStore.deposit(amount);
    setResult(res);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-sm bg-gray-950 border border-accent/40 rounded-3xl p-6 shadow-2xl shadow-accent/20">
        <div className="flex items-center justify-between mb-5">
          <div className="font-display font-black text-xl text-white">Пополнение баланса</div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-muted-foreground hover:text-white transition-all">
            <Icon name="X" size={16} />
          </button>
        </div>
        {result ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-accent font-black text-2xl mb-1">+{result.credited.toLocaleString()} ₽</div>
            {result.bonus > 0 && <div className="text-green-400 text-sm font-medium mb-3">Включая бонус: +{result.bonus.toLocaleString()} ₽</div>}
            <div className="text-muted-foreground text-sm mb-5">Баланс пополнен успешно!</div>
            <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-accent to-amber-400 text-black font-bold rounded-xl">Играть!</button>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground mb-3">Сумма пополнения (₽)</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {PRESETS.map(p => (
                <button key={p} onClick={() => setAmount(p)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${amount === p ? "bg-accent text-black border-accent font-bold" : "border-accent/20 text-muted-foreground hover:border-accent/50 hover:text-white"}`}>
                  {p.toLocaleString()}
                </button>
              ))}
            </div>
            <input type="number" value={amount} min={100} onChange={e => setAmount(Math.max(100, Number(e.target.value)))} className="w-full px-4 py-3 bg-black/50 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/60 mb-3 text-lg font-bold" />
            <div className="text-xs text-muted-foreground mb-4">💳 Visa / Mastercard / СБП / Крипто</div>
            <button onClick={handleDeposit} className="w-full py-4 bg-gradient-to-r from-accent to-amber-400 text-black font-black text-lg rounded-xl hover:shadow-xl hover:shadow-accent/30 transition-all">
              Пополнить {amount.toLocaleString()} ₽
            </button>
          </>
        )}
      </div>
    </div>
  );
}

interface Props { slot: SlotGame; onClose: () => void; }

export default function SlotModal({ slot, onClose }: Props) {
  const player = useGameStore();
  const symbols = getSymbols(slot.category);
  const [reels] = useState(() => Array.from({ length: REEL_COUNT }, () => buildReel(symbols)));
  const [spinning, setSpinning] = useState(false);
  const [stoppedArr, setStoppedArr] = useState(Array(REEL_COUNT).fill(false));
  const [results, setResults] = useState<string[][]>(() => Array.from({ length: REEL_COUNT }, () => [symbols[0], symbols[1], symbols[2]]));
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [message, setMessage] = useState("Нажми SPIN!");
  const [winAnim, setWinAnim] = useState(false);
  const [history, setHistory] = useState<{ sym: string; amount: number }[]>([]);
  const [showDeposit, setShowDeposit] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const currentBalance = player.mode === "demo" ? player.demoBalance : player.realBalance;

  function clearTimers() { timers.current.forEach(clearTimeout); timers.current = []; }

  const spin = useCallback(() => {
    if (spinning || currentBalance < bet) return;
    clearTimers();
    gameStore.deductBalance(bet);
    setLastWin(null);
    setWinAnim(false);
    setMessage("Крутим...");
    setStoppedArr(Array(REEL_COUNT).fill(false));
    setSpinning(true);

    const willWin = Math.random() < 0.28;
    const winSym = symbols[Math.floor(Math.random() * (symbols.length - 1))];

    const newResults: string[][] = Array.from({ length: REEL_COUNT }, (_, ri) => {
      const top = symbols[Math.floor(Math.random() * symbols.length)];
      const mid = willWin && ri <= 2 ? winSym : symbols[Math.floor(Math.random() * symbols.length)];
      const bot = symbols[Math.floor(Math.random() * symbols.length)];
      return [top, mid, bot];
    });
    setResults(newResults);

    Array.from({ length: REEL_COUNT }).forEach((_, i) => {
      const t = setTimeout(() => {
        setStoppedArr(prev => { const n = [...prev]; n[i] = true; return n; });
        if (i === REEL_COUNT - 1) {
          const t2 = setTimeout(() => { setSpinning(false); evaluate(newResults, bet); }, 300);
          timers.current.push(t2);
        }
      }, 600 + i * 400);
      timers.current.push(t);
    });
  }, [spinning, currentBalance, bet, symbols]);

  function evaluate(res: string[][], betAmt: number) {
    const midRow = res.map(r => r[1]);
    const counts: Record<string, number> = {};
    midRow.forEach(s => { counts[s] = (counts[s] ?? 0) + 1; });
    const wildCount = counts["👑"] ?? 0;
    let bestVal = 0, bestSym = "", bestCount = 0;

    Object.entries(counts).forEach(([sym, cnt]) => {
      if (sym === "👑") return;
      const total = cnt + wildCount;
      const mult = MULTIPLIERS[sym] ?? 2;
      if (total >= 3 && total * mult > bestVal) { bestVal = total * mult; bestSym = sym; bestCount = total; }
    });
    if (wildCount >= 3 && !bestSym) { bestCount = wildCount; bestSym = "👑"; bestVal = wildCount * 100; }

    if (bestCount >= 3) {
      const prize = betAmt * bestVal;
      gameStore.addWin(prize);
      setLastWin(prize);
      setWinAnim(true);
      const label = bestCount === 5 ? "🎉 ДЖЕКПОТ!" : bestCount === 4 ? "🔥 БОЛЬШОЙ ВЫИГРЫШ!" : "✨ ВЫИГРЫШ!";
      setMessage(`${label} ×${bestVal} = +${prize}`);
      setHistory(h => [{ sym: bestSym, amount: prize }, ...h.slice(0, 5)]);
    } else {
      setMessage("Попробуй ещё раз!");
      setHistory(h => [{ sym: "✗", amount: 0 }, ...h.slice(0, 5)]);
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  useEffect(() => () => clearTimers(), []);

  const BET_STEPS = [5, 10, 25, 50, 100, 200, 500];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 via-gray-950 to-black border border-accent/40 rounded-3xl shadow-2xl shadow-accent/20 overflow-hidden max-h-[96vh] overflow-y-auto">

          {/* Header */}
          <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur flex items-center justify-between px-4 sm:px-6 py-3 border-b border-accent/10">
            <div className="flex items-center gap-3 min-w-0">
              <img src={slot.image} alt={slot.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-display font-black text-sm sm:text-base text-white leading-tight truncate">{slot.name}</div>
                <div className="text-[10px] text-muted-foreground">{slot.provider} · 5 барабанов · {slot.lines} линий · RTP {slot.rtp}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex rounded-xl overflow-hidden border border-accent/20 text-xs font-bold">
                <button onClick={() => gameStore.setMode("demo")} className={`px-2.5 py-1.5 transition-all ${player.mode === "demo" ? "bg-accent text-black" : "text-muted-foreground hover:text-white"}`}>Демо</button>
                <button onClick={() => gameStore.setMode("real")} className={`px-2.5 py-1.5 transition-all ${player.mode === "real" ? "bg-accent text-black" : "text-muted-foreground hover:text-white"}`}>Реальные</button>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 text-muted-foreground hover:text-white transition-all flex-shrink-0">
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>

          {/* Balance bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-black/30 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${player.mode === "demo" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>
                {player.mode === "demo" ? "ДЕМО" : "РЕАЛЬНЫЕ"}
              </span>
              <span className="font-black text-white text-sm">{currentBalance.toLocaleString()} {player.mode === "demo" ? "🪙" : "₽"}</span>
            </div>
            <button
              onClick={() => player.mode === "real" ? setShowDeposit(true) : gameStore.addDemoBalance(1000)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${player.mode === "real" ? "bg-accent/20 border-accent/30 text-accent hover:bg-accent/30" : "bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"}`}
            >
              <Icon name="Plus" size={12} />
              {player.mode === "real" ? "Пополнить" : "+1000"}
            </button>
          </div>

          {/* Reels */}
          <div className="px-3 sm:px-5 pt-4 pb-2">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-200 ${winAnim ? "bg-accent animate-pulse" : "bg-accent/20"}`} style={{ animationDelay: `${i * 60}ms` }} />
              ))}
            </div>

            <div className="relative bg-black/70 rounded-2xl border-2 border-accent/20 p-2 sm:p-3 mb-3 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,197,50,0.04)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-accent/20 pointer-events-none" />
              <div className="flex gap-1.5 sm:gap-2 justify-center">
                {reels.map((syms, i) => (
                  <Reel key={i} symbols={syms} spinning={spinning} stopped={stoppedArr[i]} result={results[i]} />
                ))}
              </div>
            </div>

            {/* Message */}
            <div className={`text-center h-6 mb-3 transition-all duration-300 ${winAnim ? "scale-110" : ""}`}>
              <span className={`font-bold text-xs sm:text-sm ${lastWin ? "text-accent" : "text-muted-foreground"}`}>{message}</span>
            </div>

            {/* Bet row */}
            <div className="flex items-center justify-between gap-2 mb-3 bg-black/40 rounded-2xl px-3 sm:px-4 py-2.5 border border-white/5">
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Ставка</div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { const i = BET_STEPS.indexOf(bet); if (i > 0) setBet(BET_STEPS[i - 1]); }} disabled={spinning || bet === BET_STEPS[0]} className="w-6 h-6 rounded-lg border border-accent/30 text-accent text-xs font-bold hover:bg-accent/20 disabled:opacity-30">−</button>
                  <span className="text-base font-black text-accent w-10 text-center">{bet}</span>
                  <button onClick={() => { const i = BET_STEPS.indexOf(bet); if (i < BET_STEPS.length - 1) setBet(BET_STEPS[i + 1]); }} disabled={spinning || bet === BET_STEPS[BET_STEPS.length - 1]} className="w-6 h-6 rounded-lg border border-accent/30 text-accent text-xs font-bold hover:bg-accent/20 disabled:opacity-30">+</button>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Выигрыш</div>
                <div className="text-base font-black text-accent">{lastWin ? `+${lastWin.toLocaleString()}` : "—"}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Max</div>
                <div className="text-sm font-bold text-yellow-400">{slot.maxWin}</div>
              </div>
            </div>

            {/* SPIN */}
            <button onClick={spin} disabled={spinning || currentBalance < bet}
              className="w-full py-4 bg-gradient-to-r from-accent via-amber-400 to-accent text-black font-black text-xl rounded-2xl hover:shadow-2xl hover:shadow-accent/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 uppercase tracking-widest mb-2">
              {spinning ? "⏳ Крутится..." : "🎰 SPIN"}
            </button>

            {currentBalance < bet && (
              <button onClick={() => player.mode === "real" ? setShowDeposit(true) : gameStore.addDemoBalance(1000)}
                className="w-full py-2.5 border border-accent/30 rounded-xl text-accent text-sm font-semibold hover:bg-accent/10 transition-all mb-2">
                {player.mode === "real" ? "💳 Пополнить счёт" : "🪙 Получить монеты"}
              </button>
            )}

            {/* History */}
            {history.length > 0 && (
              <div className="mb-2">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">Последние спины</div>
                <div className="flex gap-1.5 flex-wrap">
                  {history.map((h, i) => (
                    <div key={i} className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${h.amount > 0 ? "border-accent/30 bg-accent/10 text-accent" : "border-white/10 bg-white/5 text-muted-foreground"}`}>
                      <span>{h.sym}</span>
                      {h.amount > 0 && <span>+{h.amount}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center gap-1 pb-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${winAnim ? "bg-amber-400 animate-pulse" : "bg-accent/20"}`} style={{ animationDelay: `${i * 60}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} />}
    </>
  );
}

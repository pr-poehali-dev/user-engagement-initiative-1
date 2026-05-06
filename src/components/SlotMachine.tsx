import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎", "🐾", "7️⃣", "🔔", "🍀"];

const PAYOUTS: Record<string, number> = {
  "🍒": 2,
  "🍋": 3,
  "🍊": 4,
  "🍇": 5,
  "⭐": 8,
  "💎": 15,
  "🐾": 20,
  "7️⃣": 50,
  "🔔": 10,
  "🍀": 12,
};

const REEL_COUNT = 3;
const VISIBLE_SYMBOLS = 3;

function getRandomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function generateReel(size = 20) {
  return Array.from({ length: size }, () => getRandomSymbol());
}

interface ReelProps {
  symbols: string[];
  spinning: boolean;
  result: string;
  delay: number;
  stopped: boolean;
}

function Reel({ symbols, spinning, result, delay, stopped }: ReelProps) {
  const [displaySymbols, setDisplaySymbols] = useState([
    symbols[0], symbols[1], symbols[2],
  ]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    if (spinning && !stopped) {
      intervalRef.current = setInterval(() => {
        idxRef.current = (idxRef.current + 1) % symbols.length;
        setDisplaySymbols([
          symbols[(idxRef.current) % symbols.length],
          symbols[(idxRef.current + 1) % symbols.length],
          symbols[(idxRef.current + 2) % symbols.length],
        ]);
      }, 80);
    } else if (stopped) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplaySymbols([result, getRandomSymbol(), getRandomSymbol()]);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spinning, stopped, result]);

  return (
    <div className="relative w-24 h-48 bg-black/60 rounded-2xl border-2 border-accent/30 overflow-hidden flex flex-col items-center justify-center gap-1">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none z-10" />
      <div className="absolute top-[calc(50%-28px)] left-0 right-0 h-14 border-y-2 border-accent/60 z-20 pointer-events-none" />
      {displaySymbols.map((sym, i) => (
        <div
          key={i}
          className={`text-4xl select-none transition-all duration-100 ${i === 0 ? "text-white/60 scale-75" : i === 1 ? "text-white scale-110 z-30" : "text-white/60 scale-75"}`}
        >
          {sym}
        </div>
      ))}
    </div>
  );
}

export default function SlotMachine() {
  const [reelSymbols] = useState(() => Array.from({ length: REEL_COUNT }, () => generateReel()));
  const [spinning, setSpinning] = useState(false);
  const [stoppedReels, setStoppedReels] = useState<boolean[]>([false, false, false]);
  const [results, setResults] = useState<string[]>(["🐾", "🐾", "🐾"]);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [message, setMessage] = useState("Нажми SPIN, чтобы начать!");
  const [winAnimation, setWinAnimation] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAllTimeouts() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function spin() {
    if (spinning || balance < bet) return;

    clearAllTimeouts();
    setBalance((b) => b - bet);
    setLastWin(null);
    setMessage("Крутим барабаны...");
    setWinAnimation(false);

    const newResults = Array.from({ length: REEL_COUNT }, () => getRandomSymbol());

    // ~20% chance of win — force match
    const willWin = Math.random() < 0.28;
    if (willWin) {
      const winSymbol = newResults[0];
      newResults[1] = winSymbol;
      newResults[2] = winSymbol;
    }

    setResults(newResults);
    setSpinning(true);
    setStoppedReels([false, false, false]);

    // Stop reels one by one
    [0, 1, 2].forEach((i) => {
      const t = setTimeout(() => {
        setStoppedReels((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });

        if (i === 2) {
          setTimeout(() => {
            setSpinning(false);
            evaluateResult(newResults, bet);
          }, 300);
        }
      }, 900 + i * 600);
      timeoutsRef.current.push(t);
    });
  }

  function evaluateResult(res: string[], betAmount: number) {
    if (res[0] === res[1] && res[1] === res[2]) {
      const multiplier = PAYOUTS[res[0]] ?? 2;
      const win = betAmount * multiplier;
      setBalance((b) => b + win);
      setLastWin(win);
      setMessage(`🎉 ВЫИГРЫШ! +${win} монет!`);
      setWinAnimation(true);
    } else if (res[0] === res[1] || res[1] === res[2] || res[0] === res[2]) {
      const win = Math.floor(betAmount * 1.5);
      setBalance((b) => b + win);
      setLastWin(win);
      setMessage(`✨ Почти! +${win} монет`);
    } else {
      setMessage("Попробуй ещё раз!");
    }
  }

  function addCredits() {
    setBalance((b) => b + 500);
    setMessage("Пополнено +500 монет!");
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Machine body */}
      <div className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black border-2 border-accent/40 rounded-3xl p-8 shadow-2xl shadow-accent/20 w-full max-w-md">
        {/* Top lights */}
        <div className="flex justify-center gap-3 mb-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${winAnimation ? "bg-accent animate-pulse" : "bg-accent/30"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <span className="text-accent font-display font-black text-2xl tracking-widest uppercase">🐾 Paw Play</span>
        </div>

        {/* Reels */}
        <div className="flex gap-4 justify-center mb-6">
          {reelSymbols.map((symbols, i) => (
            <Reel
              key={i}
              symbols={symbols}
              spinning={spinning}
              result={results[i]}
              delay={i * 600}
              stopped={stoppedReels[i]}
            />
          ))}
        </div>

        {/* Win message */}
        <div className={`text-center h-8 mb-4 transition-all duration-300 ${winAnimation ? "scale-110" : ""}`}>
          <span className={`font-bold text-sm ${lastWin ? "text-accent" : "text-muted-foreground"}`}>
            {message}
          </span>
        </div>

        {/* Balance & Bet */}
        <div className="flex justify-between items-center mb-6 bg-black/40 rounded-xl px-5 py-3">
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Баланс</div>
            <div className="text-xl font-black text-white">{balance} 🪙</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ставка</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBet((b) => Math.max(5, b - 5))}
                disabled={spinning}
                className="w-6 h-6 rounded-full border border-accent/40 text-accent hover:bg-accent/20 text-sm font-bold disabled:opacity-40"
              >
                −
              </button>
              <span className="text-xl font-black text-accent w-10 text-center">{bet}</span>
              <button
                onClick={() => setBet((b) => Math.min(100, b + 5))}
                disabled={spinning}
                className="w-6 h-6 rounded-full border border-accent/40 text-accent hover:bg-accent/20 text-sm font-bold disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Выигрыш</div>
            <div className="text-xl font-black text-accent">{lastWin ? `+${lastWin}` : "—"}</div>
          </div>
        </div>

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={spinning || balance < bet}
          className="w-full py-5 bg-gradient-to-r from-accent via-amber-400 to-accent text-black font-black text-xl rounded-2xl hover:shadow-2xl hover:shadow-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 uppercase tracking-wider"
        >
          {spinning ? "Крутится..." : "🎰 SPIN"}
        </button>

        {/* Add credits */}
        {balance < bet && (
          <button
            onClick={addCredits}
            className="w-full mt-3 py-3 border border-accent/30 rounded-xl text-accent text-sm font-semibold hover:bg-accent/10 transition-all"
          >
            + Пополнить баланс
          </button>
        )}

        {/* Bottom lights */}
        <div className="flex justify-center gap-3 mt-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${winAnimation ? "bg-amber-400 animate-pulse" : "bg-accent/30"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Paytable */}
      <div className="bg-black/40 border border-accent/20 rounded-2xl p-5 w-full max-w-md">
        <div className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-3">Таблица выплат (×ставку)</div>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(PAYOUTS).map(([sym, mult]) => (
            <div key={sym} className="flex flex-col items-center gap-1 bg-black/30 rounded-xl p-2">
              <span className="text-2xl">{sym}</span>
              <span className="text-accent font-bold text-xs">×{mult}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

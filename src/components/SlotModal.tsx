import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import type { SlotGame } from "@/data/slots";

const SYMBOLS_BY_CATEGORY: Record<string, string[]> = {
  "Фрукты":       ["🍒", "🍋", "🍊", "🍇", "🍓", "🍉", "🍑", "⭐"],
  "Приключения":  ["⚔️", "🔮", "💰", "🗝️", "🐉", "🌟", "🏹", "💎"],
  "Египет":       ["🏺", "👁️", "🐍", "☀️", "🦅", "📜", "🔱", "💎"],
  "Космос":       ["🚀", "🌌", "⭐", "🪐", "👽", "💫", "🌠", "🛸"],
  "Животные":     ["🐾", "🦊", "🐺", "🦁", "🐯", "🦋", "🦅", "🐘"],
  "Мифология":    ["⚡", "🔱", "🌊", "🔥", "🌪️", "🦄", "🐲", "🪄"],
  "Пираты":       ["🏴‍☠️", "⚓", "💀", "🦜", "💎", "🗺️", "🔭", "🌊"],
  "Азия":         ["🐉", "🌸", "🎎", "🀄", "⛩️", "🪔", "🎐", "🌺"],
  "Ретро":        ["🎰", "🃏", "🎲", "🪙", "💛", "🔔", "⭐", "7️⃣"],
  "Мегавейс":     ["💎", "🌈", "⚡", "🔥", "💥", "🌟", "🏆", "👑"],
};

const DEFAULT_SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎", "🐾", "7️⃣", "🔔", "🍀"];

function getSymbols(category: string) {
  return SYMBOLS_BY_CATEGORY[category] ?? DEFAULT_SYMBOLS;
}

function buildReel(symbols: string[], size = 24) {
  return Array.from({ length: size }, () => symbols[Math.floor(Math.random() * symbols.length)]);
}

const PAYOUTS: Record<string, number> = {
  "🍒": 2, "🍋": 3, "🍊": 4, "🍇": 5, "⭐": 8, "💎": 15, "🐾": 20,
  "7️⃣": 50, "🔔": 10, "🍀": 12, "⚔️": 6, "🔮": 8, "💰": 10, "🗝️": 7,
  "🐉": 18, "🌟": 12, "🏹": 5, "🏺": 6, "👁️": 8, "🐍": 5, "☀️": 7,
  "🦅": 9, "📜": 4, "🔱": 12, "🚀": 8, "🌌": 10, "🪐": 9, "👽": 11,
  "💫": 7, "🌠": 8, "🛸": 12, "🐾": 20, "🦊": 6, "🐺": 8, "🦁": 12,
  "🐯": 10, "🦋": 5, "🐘": 7, "⚡": 10, "🌊": 6, "🔥": 8, "🌪️": 9,
  "🦄": 15, "🪄": 12, "🏴‍☠️": 10, "⚓": 5, "💀": 8, "🦜": 6, "🗺️": 7,
  "🔭": 6, "🌸": 5, "🎎": 6, "🀄": 9, "⛩️": 8, "🪔": 6, "🎐": 5,
  "🌺": 6, "🎰": 8, "🃏": 6, "🎲": 5, "🪙": 4, "💛": 3, "🌈": 12,
  "💥": 9, "🏆": 15, "👑": 18,
};

interface ReelProps {
  symbols: string[];
  spinning: boolean;
  stopped: boolean;
  result: string;
}

function Reel({ symbols, spinning, stopped, result }: ReelProps) {
  const [display, setDisplay] = useState([symbols[0], symbols[1], symbols[2]]);
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
      }, 70);
    } else if (stopped) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplay([result, symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]]);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [spinning, stopped, result]);

  return (
    <div className="relative w-20 sm:w-24 h-44 sm:h-52 bg-black/70 rounded-2xl border-2 border-accent/30 overflow-hidden flex flex-col items-center justify-center gap-2">
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 pointer-events-none z-10" />
      <div className="absolute top-[calc(50%-26px)] left-0 right-0 h-[52px] border-y-2 border-accent/70 z-20 pointer-events-none bg-accent/5" />
      {display.map((sym, i) => (
        <div key={i} className={`text-3xl sm:text-4xl select-none leading-none transition-all duration-75 ${i === 1 ? "scale-125 z-30 drop-shadow-lg" : "opacity-40 scale-75"}`}>
          {sym}
        </div>
      ))}
    </div>
  );
}

interface Props {
  slot: SlotGame;
  onClose: () => void;
}

export default function SlotModal({ slot, onClose }: Props) {
  const symbols = getSymbols(slot.category);
  const [reels] = useState(() => Array.from({ length: 3 }, () => buildReel(symbols)));
  const [spinning, setSpinning] = useState(false);
  const [stopped, setStopped] = useState([false, false, false]);
  const [results, setResults] = useState([symbols[0], symbols[0], symbols[0]]);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [message, setMessage] = useState("Нажми SPIN!");
  const [win, setWin] = useState(false);
  const [history, setHistory] = useState<{ result: string; amount: number }[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() { timers.current.forEach(clearTimeout); timers.current = []; }

  function spin() {
    if (spinning || balance < bet) return;
    clearTimers();
    setBalance(b => b - bet);
    setLastWin(null);
    setWin(false);
    setMessage("Крутим...");
    setStopped([false, false, false]);
    setSpinning(true);

    const newRes = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    if (Math.random() < 0.30) { newRes[1] = newRes[0]; newRes[2] = newRes[0]; }
    setResults(newRes);

    [0, 1, 2].forEach(i => {
      const t = setTimeout(() => {
        setStopped(prev => { const n = [...prev]; n[i] = true; return n; });
        if (i === 2) {
          const t2 = setTimeout(() => {
            setSpinning(false);
            evaluate(newRes, bet);
          }, 300);
          timers.current.push(t2);
        }
      }, 800 + i * 550);
      timers.current.push(t);
    });
  }

  function evaluate(res: string[], betAmt: number) {
    if (res[0] === res[1] && res[1] === res[2]) {
      const mult = PAYOUTS[res[0]] ?? 3;
      const prize = betAmt * mult;
      setBalance(b => b + prize);
      setLastWin(prize);
      setMessage(`🎉 ДЖЕКПОТ! ×${mult} = +${prize}!`);
      setWin(true);
      setHistory(h => [{ result: `${res[0]}${res[1]}${res[2]}`, amount: prize }, ...h.slice(0, 4)]);
    } else if (res[0] === res[1] || res[1] === res[2] || res[0] === res[2]) {
      const prize = Math.floor(betAmt * 1.5);
      setBalance(b => b + prize);
      setLastWin(prize);
      setMessage(`✨ Близко! +${prize}`);
      setHistory(h => [{ result: `${res[0]}${res[1]}${res[2]}`, amount: prize }, ...h.slice(0, 4)]);
    } else {
      setMessage("Попробуй ещё раз!");
      setHistory(h => [{ result: `${res[0]}${res[1]}${res[2]}`, amount: 0 }, ...h.slice(0, 4)]);
    }
  }

  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-gray-900 via-gray-950 to-black border border-accent/40 rounded-3xl shadow-2xl shadow-accent/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-accent/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{slot.emoji}</span>
            <div>
              <div className="font-display font-black text-lg text-white leading-tight">{slot.name}</div>
              <div className="text-xs text-muted-foreground">{slot.provider} · RTP {slot.rtp}% · Max {slot.maxWin}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl border border-accent/20 text-muted-foreground hover:text-white hover:border-accent/50 transition-all">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Top lights */}
        <div className="flex justify-center gap-2 pt-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${win ? "bg-accent animate-pulse" : "bg-accent/25"}`} style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>

        {/* Reels */}
        <div className="flex gap-3 justify-center px-6 py-5">
          {reels.map((syms, i) => (
            <Reel key={i} symbols={syms} spinning={spinning} stopped={stopped[i]} result={results[i]} />
          ))}
        </div>

        {/* Message */}
        <div className={`text-center h-7 mb-3 px-6 transition-all duration-300 ${win ? "scale-110" : ""}`}>
          <span className={`font-bold text-sm ${lastWin ? "text-accent" : "text-muted-foreground"}`}>{message}</span>
        </div>

        {/* Stats row */}
        <div className="mx-6 mb-4 grid grid-cols-3 bg-black/50 rounded-2xl overflow-hidden border border-accent/10">
          <div className="flex flex-col items-center py-3 border-r border-accent/10">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Баланс</span>
            <span className="text-lg font-black text-white">{balance}<span className="text-sm ml-1">🪙</span></span>
          </div>
          <div className="flex flex-col items-center py-3 border-r border-accent/10">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Ставка</span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setBet(b => Math.max(5, b - 5))} disabled={spinning} className="w-5 h-5 rounded-full border border-accent/30 text-accent text-xs font-bold hover:bg-accent/20 disabled:opacity-40">−</button>
              <span className="text-lg font-black text-accent w-8 text-center">{bet}</span>
              <button onClick={() => setBet(b => Math.min(200, b + 5))} disabled={spinning} className="w-5 h-5 rounded-full border border-accent/30 text-accent text-xs font-bold hover:bg-accent/20 disabled:opacity-40">+</button>
            </div>
          </div>
          <div className="flex flex-col items-center py-3">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Выигрыш</span>
            <span className="text-lg font-black text-accent">{lastWin ? `+${lastWin}` : "—"}</span>
          </div>
        </div>

        {/* Spin */}
        <div className="px-6 mb-4">
          <button
            onClick={spin}
            disabled={spinning || balance < bet}
            className="w-full py-4 bg-gradient-to-r from-accent via-amber-400 to-accent text-black font-black text-xl rounded-2xl hover:shadow-2xl hover:shadow-accent/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 uppercase tracking-wider"
          >
            {spinning ? "Крутится..." : "🎰 SPIN"}
          </button>
          {balance < bet && (
            <button onClick={() => { setBalance(b => b + 500); setMessage("+500 монет!"); }} className="w-full mt-2 py-2.5 border border-accent/30 rounded-xl text-accent text-sm font-semibold hover:bg-accent/10 transition-all">
              + Пополнить баланс
            </button>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mx-6 mb-5">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">История спинов</div>
            <div className="flex gap-2 flex-wrap">
              {history.map((h, i) => (
                <div key={i} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${h.amount > 0 ? "border-accent/30 bg-accent/10 text-accent" : "border-white/10 bg-white/5 text-muted-foreground"}`}>
                  <span>{h.result}</span>
                  {h.amount > 0 && <span>+{h.amount}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom lights */}
        <div className="flex justify-center gap-2 pb-5">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${win ? "bg-amber-400 animate-pulse" : "bg-accent/25"}`} style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

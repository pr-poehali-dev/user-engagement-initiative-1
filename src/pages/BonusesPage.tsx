import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import { useGameStore, gameStore } from "@/store/gameStore";

const DAILY_BONUSES = [
  { day: 1,  reward: "50 монет",    icon: "🎁", claimed: false },
  { day: 2,  reward: "100 монет",   icon: "💰", claimed: false },
  { day: 3,  reward: "5 фриспинов", icon: "🎰", claimed: false },
  { day: 4,  reward: "200 монет",   icon: "💎", claimed: false },
  { day: 5,  reward: "10 фриспинов",icon: "⚡", claimed: false },
  { day: 6,  reward: "500 монет",   icon: "🏆", claimed: false },
  { day: 7,  reward: "1000 монет",  icon: "👑", claimed: false },
];

const DAILY_KEY = "pawplay_daily";

function getDailyState() {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_e) { void _e; }
  return { day: 1, lastClaim: null, streak: 0 };
}

function saveDailyState(s: object) {
  localStorage.setItem(DAILY_KEY, JSON.stringify(s));
}

export default function BonusesPage() {
  const player = useGameStore();
  const [daily, setDaily] = useState(getDailyState());
  const [toast, setToast] = useState<string | null>(null);
  const [activating, setActivating] = useState<string | null>(null);

  const canClaimToday = !daily.lastClaim || new Date(daily.lastClaim).toDateString() !== new Date().toDateString();
  const currentDay = ((daily.streak ?? 0) % 7) + 1;

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  function claimDaily() {
    if (!canClaimToday) return;
    const reward = DAILY_BONUSES[(currentDay - 1) % 7];
    const amount = reward.reward.includes("монет") ? parseInt(reward.reward) : parseInt(reward.reward) * 10;
    gameStore.addDemoBalance(amount);
    const newState = { day: currentDay, lastClaim: new Date().toISOString(), streak: (daily.streak ?? 0) + 1 };
    setDaily(newState);
    saveDailyState(newState);
    showToast(`${reward.icon} День ${currentDay}: ${reward.reward} получено!`);
  }

  function handleActivate(id: string) {
    const bonus = player.bonuses.find(b => b.id === id);
    if (!bonus) return;
    setActivating(id);
    setTimeout(() => {
      if (bonus.type === "freespins") {
        const spins = gameStore.claimFreeSpins(id);
        showToast(`🎰 ${spins} фриспинов зачислено! +${spins * 10} демо-монет`);
      } else {
        gameStore.activateBonus(id);
        showToast(`✅ Бонус активирован! Пополни счёт от ${bonus.minDeposit} ₽`);
      }
      setActivating(null);
    }, 800);
  }

  const ICONS: Record<string, string> = { deposit: "TrendingUp", freespins: "Zap", cashback: "RotateCcw" };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {toast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-accent/40 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm text-center">
            {toast}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-display font-black text-white mb-2">🎁 Бонусы</h1>
          <p className="text-muted-foreground">Ежедневные награды и специальные предложения</p>
        </div>

        {/* Daily streak */}
        <div className="bg-gradient-to-br from-accent/10 to-amber-500/5 border border-accent/30 rounded-3xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-display font-black text-xl text-white mb-1">Ежедневный вход</div>
              <div className="text-muted-foreground text-sm">
                {canClaimToday ? "Сегодня можно забрать награду!" : "Приходи завтра за следующей наградой"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Серия входов</div>
              <div className="text-2xl font-black text-accent">{daily.streak ?? 0} дней</div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-5">
            {DAILY_BONUSES.map((b, i) => {
              const dayNum = i + 1;
              const isPast = (daily.streak ?? 0) > i && !canClaimToday;
              const isCurrent = dayNum === currentDay && canClaimToday;
              const isFuture = dayNum > currentDay || (dayNum === currentDay && !canClaimToday && (daily.streak ?? 0) >= dayNum);
              return (
                <div key={i} className={`flex flex-col items-center gap-1 p-2 rounded-2xl border transition-all ${isPast ? "bg-accent/20 border-accent/40" : isCurrent ? "bg-accent/30 border-accent ring-2 ring-accent/50 scale-105" : "bg-black/30 border-white/10"}`}>
                  <div className="text-[10px] text-muted-foreground font-bold">День {dayNum}</div>
                  <div className="text-2xl">{b.icon}</div>
                  <div className="text-[9px] text-center text-white/70 leading-tight">{b.reward}</div>
                  {isPast && <div className="text-[9px] text-accent font-bold">✓</div>}
                </div>
              );
            })}
          </div>

          <button
            onClick={claimDaily}
            disabled={!canClaimToday}
            className="w-full py-4 bg-gradient-to-r from-accent to-amber-400 text-black font-black text-lg rounded-2xl hover:shadow-2xl hover:shadow-accent/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {canClaimToday ? `🎁 Забрать день ${currentDay}: ${DAILY_BONUSES[(currentDay-1)%7].reward}` : "✓ Уже получено сегодня"}
          </button>
        </div>

        {/* Balance */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-2xl">🪙</div>
            <div>
              <div className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Демо баланс</div>
              <div className="text-xl font-black text-white">{player.demoBalance.toLocaleString()}</div>
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-2xl">💰</div>
            <div>
              <div className="text-[10px] text-green-400 uppercase tracking-wider font-bold">Реальный баланс</div>
              <div className="text-xl font-black text-white">{player.realBalance.toLocaleString()} ₽</div>
            </div>
          </div>
        </div>

        {/* Promo bonuses */}
        <div className="mb-4">
          <h2 className="text-2xl font-display font-black text-white mb-1">Акционные бонусы</h2>
          <p className="text-muted-foreground text-sm mb-5">Активируй и получи при следующем пополнении</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {player.bonuses.map(bonus => (
            <div key={bonus.id} className={`relative rounded-2xl overflow-hidden border transition-all ${bonus.claimed ? "border-white/10 opacity-60" : bonus.activated ? "border-accent/50" : "border-white/10 hover:border-accent/30"}`}>
              <div className={`bg-gradient-to-br ${bonus.color} p-4 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="font-display font-black text-white text-lg">{bonus.title}</div>
                    <div className="text-white/80 text-xs mt-0.5">{bonus.description}</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-2">
                    <Icon name={ICONS[bonus.type] ?? "Gift"} fallback="Gift" size={20} className="text-white" />
                  </div>
                </div>
                {bonus.activated && !bonus.claimed && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">АКТИВЕН</div>
                )}
                {bonus.claimed && (
                  <div className="absolute top-2 right-2 bg-black/40 text-white/60 text-[10px] font-bold px-2 py-0.5 rounded-full">ИСПОЛЬЗОВАН</div>
                )}
              </div>
              <div className="bg-black/60 p-4">
                <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Icon name="Clock" size={12} /><span>{bonus.expiresIn}</span></div>
                  {bonus.minDeposit > 0 && <div>от {bonus.minDeposit.toLocaleString()} ₽</div>}
                </div>
                {bonus.claimed ? (
                  <div className="w-full py-2.5 rounded-xl text-center text-muted-foreground text-sm border border-white/10">✓ Получен</div>
                ) : bonus.activated ? (
                  <div className="w-full py-2.5 rounded-xl text-center text-green-400 text-sm border border-green-500/30 bg-green-500/10">✓ Ожидает депозита</div>
                ) : (
                  <button onClick={() => handleActivate(bonus.id)} disabled={activating === bonus.id}
                    className="w-full py-2.5 bg-gradient-to-r from-accent to-amber-400 text-black text-sm font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-70 active:scale-95">
                    {activating === bonus.id ? "Активируем..." : "Активировать"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

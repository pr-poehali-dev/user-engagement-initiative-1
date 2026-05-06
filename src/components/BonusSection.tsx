import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useGameStore, gameStore } from "@/store/gameStore";

export default function BonusSection() {
  const player = useGameStore();
  const [activating, setActivating] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
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
        showToast(`✅ Бонус активирован! Пополни счёт от ${bonus.minDeposit} ₽ чтобы получить`);
      }
      setActivating(null);
    }, 800);
  }

  const ICONS: Record<string, string> = {
    deposit: "TrendingUp",
    freespins: "Zap",
    cashback: "RotateCcw",
  };

  return (
    <div className="w-full">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-accent/40 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-2xl shadow-accent/20 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm text-center">
          {toast}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {player.bonuses.map((bonus) => (
          <div key={bonus.id} className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 ${bonus.claimed ? "border-white/10 opacity-60" : bonus.activated ? "border-accent/50 shadow-lg shadow-accent/10" : "border-white/10 hover:border-accent/30"}`}>

            {/* Gradient header */}
            <div className={`bg-gradient-to-br ${bonus.color} p-4 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <div className="font-display font-black text-white text-lg leading-tight">{bonus.title}</div>
                  <div className="text-white/80 text-xs mt-0.5">{bonus.description}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-2 flex-shrink-0">
                  <Icon name={ICONS[bonus.type] ?? "Gift"} fallback="Gift" size={20} className="text-white" />
                </div>
              </div>

              {/* Badge */}
              {bonus.activated && !bonus.claimed && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">АКТИВЕН</div>
              )}
              {bonus.claimed && (
                <div className="absolute top-2 right-2 bg-black/40 text-white/60 text-[10px] font-bold px-2 py-0.5 rounded-full">ИСПОЛЬЗОВАН</div>
              )}
            </div>

            {/* Body */}
            <div className="bg-black/60 backdrop-blur p-4">
              <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  <span>{bonus.expiresIn}</span>
                </div>
                {bonus.minDeposit > 0 && (
                  <div className="flex items-center gap-1">
                    <Icon name="ArrowUp" size={12} />
                    <span>от {bonus.minDeposit.toLocaleString()} ₽</span>
                  </div>
                )}
              </div>

              {bonus.claimed ? (
                <div className="w-full py-2.5 rounded-xl text-center text-muted-foreground text-sm font-medium border border-white/10">
                  ✓ Получен
                </div>
              ) : bonus.activated ? (
                <div className="w-full py-2.5 rounded-xl text-center text-green-400 text-sm font-medium border border-green-500/30 bg-green-500/10">
                  ✓ Ожидает депозита
                </div>
              ) : (
                <button
                  onClick={() => handleActivate(bonus.id)}
                  disabled={activating === bonus.id}
                  className="w-full py-2.5 bg-gradient-to-r from-accent to-amber-400 text-black text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-70 active:scale-95"
                >
                  {activating === bonus.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <Icon name="Loader2" size={14} className="animate-spin" />
                      Активируем...
                    </span>
                  ) : "Активировать"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Balance display */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-lg">🪙</div>
          <div>
            <div className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Демо баланс</div>
            <div className="text-xl font-black text-white">{player.demoBalance.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-lg">💰</div>
          <div>
            <div className="text-[10px] text-green-400 uppercase tracking-wider font-bold">Реальный баланс</div>
            <div className="text-xl font-black text-white">{player.realBalance.toLocaleString()} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
}

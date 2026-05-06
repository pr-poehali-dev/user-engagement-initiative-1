import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import { useGameStore, gameStore } from "@/store/gameStore";

const METHODS = [
  { id: "visa",       label: "Visa",          icon: "💳", color: "from-blue-600 to-blue-800",    fee: "0%",   time: "Мгновенно" },
  { id: "mc",         label: "Mastercard",    icon: "💳", color: "from-red-600 to-orange-700",   fee: "0%",   time: "Мгновенно" },
  { id: "mir",        label: "МИР",           icon: "🇷🇺", color: "from-green-700 to-emerald-800", fee: "0%",  time: "Мгновенно" },
  { id: "sbp",        label: "СБП",           icon: "⚡", color: "from-yellow-600 to-amber-700", fee: "0%",   time: "До 1 мин" },
  { id: "sber",       label: "Сбербанк",      icon: "💚", color: "from-green-600 to-green-800",  fee: "0%",   time: "До 1 мин" },
  { id: "tinkoff",    label: "Тинькофф",      icon: "💛", color: "from-yellow-500 to-yellow-700",fee: "0%",   time: "До 1 мин" },
  { id: "qiwi",       label: "QIWI",          icon: "🟠", color: "from-orange-600 to-red-600",   fee: "1%",   time: "Мгновенно" },
  { id: "crypto",     label: "Криптовалюта",  icon: "₿",  color: "from-amber-500 to-yellow-600", fee: "0%",   time: "До 30 мин" },
];

const PRESETS = [500, 1000, 2000, 5000, 10000, 25000];

export default function DepositPage() {
  const player = useGameStore();
  const [method, setMethod] = useState(METHODS[0]);
  const [amount, setAmount] = useState(1000);
  const [step, setStep] = useState<"select" | "form" | "success">("select");
  const [cardNum, setCardNum] = useState("");
  const [phone, setPhone] = useState("");

  const activeBonus = player.bonuses.find(b => b.activated && !b.claimed && b.type === "deposit");
  const bonusAmount = activeBonus ? Math.floor(amount * activeBonus.value / 100) : 0;
  const totalCredit = amount + bonusAmount;

  function handlePay() {
    const res = gameStore.deposit(amount);
    setStep("success");
  }

  function formatCard(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  if (step === "success") {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="text-3xl font-display font-black text-white mb-3">Баланс пополнен!</h1>
          <div className="text-accent font-black text-4xl mb-2">+{totalCredit.toLocaleString()} ₽</div>
          {bonusAmount > 0 && <div className="text-green-400 text-sm mb-6">Включая бонус +{bonusAmount.toLocaleString()} ₽</div>}
          <div className="bg-black/40 border border-accent/20 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Метод</span><span className="text-white font-medium">{method.icon} {method.label}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Сумма</span><span className="text-white font-medium">{amount.toLocaleString()} ₽</span></div>
            {bonusAmount > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Бонус</span><span className="text-green-400 font-medium">+{bonusAmount.toLocaleString()} ₽</span></div>}
            <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-2"><span className="text-white">Итого</span><span className="text-accent">{totalCredit.toLocaleString()} ₽</span></div>
          </div>
          <button onClick={() => { setStep("select"); setCardNum(""); setPhone(""); }}
            className="w-full py-4 bg-gradient-to-r from-accent to-amber-400 text-black font-black text-lg rounded-2xl hover:shadow-xl hover:shadow-accent/30 transition-all">
            Играть →
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-black text-white mb-2">💳 Пополнение счёта</h1>
          <p className="text-muted-foreground">Все переводы защищены SSL-шифрованием</p>
        </div>

        {/* Current balance */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
            <div className="text-[10px] text-green-400 uppercase tracking-wider font-bold mb-1">Реальный баланс</div>
            <div className="text-2xl font-black text-white">{player.realBalance.toLocaleString()} ₽</div>
          </div>
          {activeBonus && (
            <div className="flex-1 bg-accent/10 border border-accent/20 rounded-2xl p-4">
              <div className="text-[10px] text-accent uppercase tracking-wider font-bold mb-1">Активный бонус</div>
              <div className="text-2xl font-black text-accent">+{activeBonus.value}%</div>
            </div>
          )}
        </div>

        {step === "select" && (
          <>
            {/* Amount */}
            <div className="mb-6">
              <div className="text-sm font-bold text-white mb-3">Сумма пополнения</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESETS.map(p => (
                  <button key={p} onClick={() => setAmount(p)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${amount === p ? "bg-accent text-black border-accent" : "border-accent/20 text-muted-foreground hover:border-accent/50 hover:text-white"}`}>
                    {p.toLocaleString()} ₽
                  </button>
                ))}
              </div>
              <input type="number" value={amount} min={100} onChange={e => setAmount(Math.max(100, Number(e.target.value)))}
                className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white text-lg font-black focus:outline-none focus:border-accent/60" />
              {bonusAmount > 0 && (
                <div className="mt-2 text-sm text-green-400 font-medium flex items-center gap-2">
                  <Icon name="TrendingUp" size={14} />
                  Бонус +{bonusAmount.toLocaleString()} ₽ → итого {totalCredit.toLocaleString()} ₽
                </div>
              )}
            </div>

            {/* Methods */}
            <div className="mb-6">
              <div className="text-sm font-bold text-white mb-3">Способ оплаты</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {METHODS.map(m => (
                  <button key={m.id} onClick={() => setMethod(m)}
                    className={`p-3 rounded-2xl border transition-all text-left ${method.id === m.id ? "border-accent ring-1 ring-accent/30 bg-accent/10" : "border-white/10 hover:border-accent/30 bg-black/30"}`}>
                    <div className="text-2xl mb-1">{m.icon}</div>
                    <div className="text-xs font-bold text-white">{m.label}</div>
                    <div className="text-[10px] text-muted-foreground">{m.time}</div>
                    {m.fee !== "0%" && <div className="text-[10px] text-yellow-400">Комиссия {m.fee}</div>}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep("form")}
              className="w-full py-4 bg-gradient-to-r from-accent to-amber-400 text-black font-black text-xl rounded-2xl hover:shadow-2xl hover:shadow-accent/40 transition-all active:scale-95">
              Продолжить → {totalCredit.toLocaleString()} ₽
            </button>
          </>
        )}

        {step === "form" && (
          <div className="space-y-4">
            <button onClick={() => setStep("select")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-2">
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>

            <div className={`bg-gradient-to-r ${method.color} rounded-2xl p-4 flex items-center gap-3`}>
              <span className="text-3xl">{method.icon}</span>
              <div>
                <div className="font-bold text-white">{method.label}</div>
                <div className="text-white/70 text-sm">{method.time} · Комиссия {method.fee}</div>
              </div>
            </div>

            {["visa","mc","mir"].includes(method.id) && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Номер карты</label>
                  <input value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50 font-mono text-lg tracking-widest" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Срок действия</label>
                    <input placeholder="MM/YY" className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">CVV/CVC</label>
                    <input placeholder="•••" type="password" maxLength={3} className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50" />
                  </div>
                </div>
              </div>
            )}

            {["sbp","sber","tinkoff","qiwi"].includes(method.id) && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Номер телефона</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (999) 000-00-00"
                  className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50 text-lg" />
              </div>
            )}

            {method.id === "crypto" && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-sm text-amber-300">
                После нажатия кнопки вы получите адрес кошелька для перевода. Зачисление после 1 подтверждения сети.
              </div>
            )}

            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">К оплате</span><span className="text-white font-bold">{amount.toLocaleString()} ₽</span></div>
              {bonusAmount > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Бонус</span><span className="text-green-400 font-bold">+{bonusAmount.toLocaleString()} ₽</span></div>}
              <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-2"><span className="text-white">Будет зачислено</span><span className="text-accent text-lg">{totalCredit.toLocaleString()} ₽</span></div>
            </div>

            <button onClick={handlePay}
              className="w-full py-4 bg-gradient-to-r from-accent to-amber-400 text-black font-black text-xl rounded-2xl hover:shadow-2xl hover:shadow-accent/40 transition-all active:scale-95">
              💳 Оплатить {amount.toLocaleString()} ₽
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Icon name="ShieldCheck" size={14} />
              Защищено SSL · Данные не хранятся
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

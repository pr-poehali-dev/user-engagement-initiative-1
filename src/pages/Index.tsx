import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";
import { ALL_SLOTS } from "@/data/slots";

const FEATURED = ALL_SLOTS.filter(s => s.hot).slice(0, 8);
const NEW_SLOTS = ALL_SLOTS.filter(s => s.new).slice(0, 8);

const STATS = [
  { value: "500+", label: "Слотов", icon: "🎰" },
  { value: "100K+", label: "Игроков", icon: "👥" },
  { value: "16", label: "Провайдеров", icon: "🏢" },
  { value: "24/7", label: "Поддержка", icon: "💬" },
];

const FEATURES = [
  { icon: "Zap", title: "Мгновенные выплаты", desc: "Вывод средств за несколько минут без лишних проверок" },
  { icon: "Shield", title: "Безопасная игра", desc: "SSL-шифрование и лицензированная платформа" },
  { icon: "TrendingUp", title: "Высокий RTP", desc: "Средний RTP слотов 93–98% — одни из лучших условий" },
  { icon: "Gift", title: "Бонусы каждый день", desc: "Приветственный бонус 200%, кэшбэк, ежедневные награды" },
  { icon: "Smartphone", title: "Мобильная версия", desc: "Играй с любого устройства — телефона, планшета, ПК" },
  { icon: "Headphones", title: "Поддержка 24/7", desc: "Живой чат-бот и операторы на русском языке" },
];

export default function Index() {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const ids = ["hero","stats","features","popular","cta"];
    const obs: Record<string, IntersectionObserver> = {};
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      obs[id] = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setVisible(p => ({ ...p, [id]: true })); obs[id].unobserve(el); }
      }, { threshold: 0.1 });
      obs[id].observe(el);
    });
    return () => Object.values(obs).forEach(o => o.disconnect());
  }, []);

  const anim = (id: string) => `transition-all duration-1000 ${visible[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <Layout>
      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="" className="w-auto h-3/4 object-contain opacity-50" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-amber-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,197,50,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={anim("hero")}>
              <div className="mb-6 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">🎰 Онлайн-казино нового уровня</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">Играй. Побеждай.</span>
                <br />
                <span className="text-accent">Наслаждайся.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                Paw Play Casino — 500+ слотов от лучших провайдеров, щедрые бонусы и мгновенные выплаты. Начни играть прямо сейчас!
              </p>
              <div className="flex gap-4 flex-col sm:flex-row mb-12">
                <Link to="/slots" className="group px-8 py-4 bg-gradient-to-r from-accent to-amber-400 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-bold text-lg flex items-center gap-3 justify-center">
                  Смотреть слоты
                  <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition" />
                </Link>
                <Link to="/bonuses" className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white text-center">
                  🎁 Получить бонус
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                {STATS.map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-lg mb-1">{s.icon}</div>
                    <div className="text-2xl font-black text-accent">{s.value}</div>
                    <div className="text-xs text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative h-96 lg:h-[550px] flex items-center justify-center transition-all duration-1000 delay-300 ${visible["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-amber-500/10 to-transparent rounded-3xl blur-3xl animate-pulse" />
              <div className="relative z-10 text-center">
                <div className="text-[140px] leading-none animate-float select-none">🐾</div>
                <div className="text-4xl font-display font-black text-accent tracking-tighter">Paw Play</div>
                <div className="text-white/60 text-lg">Casino</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section id="stats" className="py-8 px-6 border-y border-accent/10 bg-accent/3">
        <div className={`max-w-7xl mx-auto ${anim("stats")}`}>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            {["Gates of Olympus","Sweet Bonanza","Book of Ra","Wolf Gold","Starlight Princess","Big Bass Bonanza"].map(name => (
              <div key={name} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-accent">🔥</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 ${anim("features")}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Преимущества</span>
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mt-3">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">Всё для победы</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className={`group p-7 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 cursor-pointer ${anim("features")}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <Icon name={f.icon} fallback="Star" size={36} className="mb-5 text-accent group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular slots preview */}
      <section id="popular" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-end justify-between mb-10 ${anim("popular")}`}>
            <div>
              <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Хиты</span>
              <h2 className="text-4xl font-display font-black mt-2">🔥 Популярные слоты</h2>
            </div>
            <Link to="/slots" className="flex items-center gap-2 text-accent text-sm font-bold hover:underline">
              Все 500+ <Icon name="ArrowRight" size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
            {FEATURED.map((slot, i) => (
              <Link to="/slots" key={slot.id}
                className={`group relative bg-black/50 border border-accent/10 hover:border-accent/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 ${anim("popular")}`}
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="absolute top-1.5 left-1.5 z-10">
                  <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">🔥</span>
                </div>
                <div className="relative h-24 overflow-hidden">
                  <img src={slot.image} alt={slot.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-1 left-2 right-2 text-[9px] text-yellow-400 font-bold text-right">{slot.maxWin}</div>
                </div>
                <div className="p-2">
                  <div className="font-bold text-xs text-white truncate">{slot.name}</div>
                  <div className="text-[10px] text-accent">RTP {slot.rtp}%</div>
                </div>
              </Link>
            ))}
          </div>

          {/* New slots */}
          <div className={`flex items-end justify-between mb-6 ${anim("popular")}`}>
            <h2 className="text-2xl font-display font-black">✨ Новинки</h2>
            <Link to="/slots?category=Новинки" className="flex items-center gap-2 text-accent text-sm font-bold hover:underline">
              Смотреть все <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {NEW_SLOTS.map((slot, i) => (
              <Link to="/slots" key={slot.id}
                className={`group relative bg-black/50 border border-accent/10 hover:border-accent/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${anim("popular")}`}
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="absolute top-1.5 left-1.5 z-10">
                  <span className="bg-accent text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>
                </div>
                <div className="relative h-24 overflow-hidden">
                  <img src={slot.image} alt={slot.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-1 right-2 text-[9px] text-yellow-400 font-bold">{slot.maxWin}</div>
                </div>
                <div className="p-2">
                  <div className="font-bold text-xs text-white truncate">{slot.name}</div>
                  <div className="text-[10px] text-muted-foreground">{slot.provider}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-28 px-6 bg-accent/5">
        <div className={`max-w-3xl mx-auto text-center ${anim("cta")}`}>
          <div className="text-6xl mb-6">🐾</div>
          <h2 className="text-5xl font-display font-black tracking-tighter mb-5">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">Готов сорвать куш?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 font-light max-w-xl mx-auto">
            Присоединяйся к 100 000+ игрокам. Получи приветственный бонус +200% прямо сейчас.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/slots" className="group px-10 py-5 bg-gradient-to-r from-accent to-amber-400 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 justify-center">
              Начать играть
              <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/deposit" className="px-10 py-5 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white text-center">
              💳 Пополнить счёт
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import SlotMachine from "@/components/SlotMachine";
import SlotCatalog from "@/components/SlotCatalog";
import BonusSection from "@/components/BonusSection";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    const sectionIds = ["hero", "features", "how", "slots", "catalog", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              Paw Play Casino
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
              Преимущества
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как начать
            </a>
            <a href="#slots" className="text-muted-foreground hover:text-white transition-colors">
              Играть
            </a>
            <a href="#catalog" className="text-muted-foreground hover:text-white transition-colors">
              Каталог
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
              Бонусы
            </a>
          </nav>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all text-white">
              Войти
            </button>
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Играть сейчас
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="Casino atmosphere" className="w-auto h-3/4 object-contain opacity-60" />
        </div>
        {/* Golden gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-amber-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,197,50,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                  🎰 Онлайн-казино нового уровня
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Играй. Побеждай.
                </span>
                <br />
                <span className="text-accent">Наслаждайся.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                Paw Play Casino — место, где каждый спин приносит азарт.
                Сотни слотов, живые дилеры и щедрые бонусы ждут тебя прямо сейчас.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-amber-400 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center">
                  Получить бонус
                  <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white">
                  Смотреть игры
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">500+</div>
                  <p className="text-sm text-white/60">Игровых слотов</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">100 000+</div>
                  <p className="text-sm text-white/60">Игроков по всему миру</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">24/7</div>
                  <p className="text-sm text-white/60">Живые дилеры</p>
                </div>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-amber-500/10 to-transparent rounded-3xl blur-3xl animate-pulse" />
              <div className="relative z-10 text-center">
                <div className="text-[160px] leading-none animate-float select-none">🐾</div>
                <div className="mt-4 text-4xl font-display font-black text-accent tracking-tighter">Paw Play</div>
                <div className="text-white/60 text-lg mt-1">Casino</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Преимущества</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Всё для победы
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Zap",
                title: "Мгновенные выплаты",
                desc: "Выигрыши выводятся за несколько минут без лишних проверок",
              },
              {
                icon: "Shield",
                title: "Безопасная игра",
                desc: "Лицензированная платформа с SSL-шифрованием и защитой данных",
              },
              {
                icon: "TrendingUp",
                title: "Щедрые джекпоты",
                desc: "Прогрессивные джекпоты растут каждую секунду — ты можешь стать следующим победителем",
              },
              {
                icon: "Gift",
                title: "Бонусы каждый день",
                desc: "Приветственный бонус 200%, кэшбэк, фриспины и VIP-привилегии",
              },
              {
                icon: "Smartphone",
                title: "Игра с телефона",
                desc: "Полностью адаптированная мобильная версия — играй где угодно",
              },
              {
                icon: "Headphones",
                title: "Поддержка 24/7",
                desc: "Живые операторы готовы помочь в любое время суток на русском языке",
              },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Icon name={item.icon} fallback="Star" size={40} className="mb-6 text-accent group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Как начать</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Четыре шага до выигрыша
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Регистрация", desc: "Создай аккаунт за 2 минуты — только email и пароль" },
              { num: "02", title: "Бонус", desc: "Получи приветственный бонус 200% на первый депозит" },
              { num: "03", title: "Выбор игры", desc: "Более 500 слотов, рулетка, покер и живые дилеры" },
              { num: "04", title: "Выигрыш", desc: "Выводи деньги удобным способом — карта, криптовалюта или кошелёк" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm cursor-pointer">
                    <div>
                      <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Slot Demo */}
      <section id="slots" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections["slots"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Демо-игра</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Попробуй прямо сейчас
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Бесплатный демо-слот — почувствуй атмосферу Paw Play Casino без регистрации
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${visibleSections["slots"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <SlotMachine />
          </div>
        </div>
      </section>

      {/* Slot Catalog */}
      <section id="catalog" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections["catalog"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Каталог игр</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                500+ слотов
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Фрукты, приключения, Египет, космос и многое другое — выбирай свой любимый жанр
            </p>
          </div>
          <div className={`transition-all duration-1000 delay-200 ${visibleSections["catalog"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SlotCatalog />
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Бонусы</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Активируй бонусы
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Нажми «Активировать» — и бонус автоматически применится к следующему депозиту
            </p>
          </div>
          <div className={`transition-all duration-1000 delay-200 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <BonusSection />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-6xl mb-6">🐾</div>
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готов сорвать куш?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Присоединяйся к сотням тысяч игроков Paw Play Casino и получи приветственный бонус уже сегодня.
          </p>
          <button className="group px-10 py-5 bg-gradient-to-r from-accent to-amber-400 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto">
            Начать играть бесплатно
            <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 Paw Play Casino — Играй ответственно 18+</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Условия
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Ответственная игра
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
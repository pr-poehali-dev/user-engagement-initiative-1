import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const NAV = [
  { path: "/", label: "Главная", icon: "Home" },
  { path: "/slots", label: "Слоты", icon: "Gamepad2" },
  { path: "/providers", label: "Провайдеры", icon: "Building2" },
  { path: "/bonuses", label: "Бонусы", icon: "Gift" },
  { path: "/deposit", label: "Пополнить", icon: "CreditCard" },
  { path: "/support", label: "Поддержка", icon: "MessageCircle" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/90 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-display font-black text-lg sm:text-xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              Paw Play Casino
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-1">
            {NAV.map((n) => (
              <Link key={n.path} to={n.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${pathname === n.path ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}>
                <Icon name={n.icon} fallback="Circle" size={14} />
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/verification"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm border border-accent/30 rounded-xl text-accent hover:bg-accent/10 transition-all font-medium">
              <Icon name="ShieldCheck" size={14} />
              Верификация
            </Link>
            <Link to="/deposit"
              className="px-4 py-2 bg-gradient-to-r from-accent to-amber-400 text-black rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all">
              Пополнить
            </Link>
            {/* Mobile burger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-muted-foreground hover:text-white">
              <Icon name={mobileOpen ? "X" : "Menu"} size={18} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur px-4 py-3 grid grid-cols-3 gap-2">
            {NAV.map((n) => (
              <Link key={n.path} to={n.path} onClick={() => setMobileOpen(false)}
                className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs font-medium transition-all ${pathname === n.path ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-white"}`}>
                <Icon name={n.icon} fallback="Circle" size={18} />
                {n.label}
              </Link>
            ))}
            <Link to="/verification" onClick={() => setMobileOpen(false)}
              className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-white transition-all">
              <Icon name="ShieldCheck" size={18} />
              Верификация
            </Link>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-8 px-6 bg-background/50 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>🐾</span>
            <span className="font-bold text-white">Paw Play Casino</span>
            <span>© 2026 · 18+</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {["Конфиденциальность","Условия","Ответственная игра","Контакты"].map(t => (
              <a key={t} href="#" className="hover:text-white transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

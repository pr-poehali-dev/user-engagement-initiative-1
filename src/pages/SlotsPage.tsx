import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";
import { ALL_SLOTS, SLOT_CATEGORIES, PROVIDERS, type SlotGame } from "@/data/slots";
import SlotModal from "@/components/SlotModal";

const PAGE_SIZE = 40;

export default function SlotsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Все");
  const [activeProvider, setActiveProvider] = useState<string>("Все");
  const [page, setPage] = useState(1);
  const [activeSlot, setActiveSlot] = useState<SlotGame | null>(null);
  const [sortBy, setSortBy] = useState<"default" | "rtp" | "maxwin">("default");

  const filtered = useMemo(() => {
    let list = ALL_SLOTS;
    if (activeCategory !== "Все") list = list.filter(s => s.category === activeCategory);
    if (activeProvider !== "Все") list = list.filter(s => s.provider === activeProvider);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q));
    }
    if (sortBy === "rtp") list = [...list].sort((a, b) => b.rtp - a.rtp);
    if (sortBy === "maxwin") list = [...list].sort((a, b) => parseInt(b.maxWin.replace("x","")) - parseInt(a.maxWin.replace("x","")));
    return list;
  }, [search, activeCategory, activeProvider, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage() { setPage(1); }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-black text-white mb-2">
            🎰 Каталог слотов
          </h1>
          <p className="text-muted-foreground">500+ игр от лучших провайдеров мира</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search + Sort */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск игры..."
                value={search}
                onChange={e => { setSearch(e.target.value); resetPage(); }}
                className="w-full pl-9 pr-4 py-2.5 bg-black/40 border border-accent/20 rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:border-accent/50 text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2.5 bg-black/40 border border-accent/20 rounded-xl text-white text-sm focus:outline-none focus:border-accent/50"
            >
              <option value="default">По умолчанию</option>
              <option value="rtp">По RTP</option>
              <option value="maxwin">По макс. выигрышу</option>
            </select>
          </div>

          {/* Provider filter */}
          <div className="flex gap-2 flex-wrap">
            {["Все", ...PROVIDERS].map(p => (
              <button key={p} onClick={() => { setActiveProvider(p); resetPage(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${activeProvider === p ? "bg-accent text-black border-accent font-bold" : "border-white/10 text-muted-foreground hover:border-accent/30 hover:text-white"}`}>
                {p}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {["Все", ...SLOT_CATEGORIES].map(c => (
              <button key={c} onClick={() => { setActiveCategory(c); resetPage(); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${activeCategory === c ? "bg-accent text-black border-accent font-bold" : "border-accent/15 text-muted-foreground hover:border-accent/40 hover:text-white"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="text-sm text-muted-foreground mb-5">
          Найдено: <span className="text-accent font-bold">{filtered.length}</span> игр
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3 mb-8">
          {paginated.map(slot => (
            <div key={slot.id}
              className="group relative bg-black/50 border border-accent/10 hover:border-accent/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20"
              onClick={() => setActiveSlot(slot)}
            >
              {/* Badges */}
              <div className="absolute top-1.5 left-1.5 flex flex-col gap-0.5 z-10">
                {slot.hot && <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">🔥</span>}
                {slot.new && <span className="bg-accent text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>}
              </div>

              {/* Image */}
              <div className="relative h-24 overflow-hidden">
                <img src={slot.image} alt={slot.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-1 left-2 right-2 flex justify-between">
                  <span className="text-[9px] text-white/70 truncate max-w-[60%]">{slot.provider}</span>
                  <span className="text-[9px] text-yellow-400 font-bold">{slot.maxWin}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-2">
                <div className="font-bold text-xs text-white leading-tight mb-1 truncate">{slot.name}</div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-accent font-medium">RTP {slot.rtp}%</span>
                  <span className="text-[10px] text-muted-foreground">{slot.lines} линий</span>
                </div>
              </div>

              {/* Hover */}
              <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 p-2">
                <button onClick={e => { e.stopPropagation(); setActiveSlot(slot); }}
                  className="w-full py-2 bg-gradient-to-r from-accent to-amber-400 text-black text-xs font-bold rounded-xl">
                  🎰 Демо
                </button>
                <button onClick={e => { e.stopPropagation(); setActiveSlot(slot); }}
                  className="w-full py-1.5 border border-accent/30 text-accent text-xs font-medium rounded-xl hover:bg-accent/10">
                  💰 На деньги
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-2 border border-accent/20 rounded-xl text-muted-foreground hover:text-white disabled:opacity-30 transition-all">
              <Icon name="ChevronLeft" size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i-1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) => p === "..." ? (
                <span key={`e${i}`} className="text-muted-foreground px-1">...</span>
              ) : (
                <button key={p} onClick={() => setPage(p as number)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${page === p ? "bg-accent text-black font-bold" : "border border-accent/20 text-muted-foreground hover:text-white"}`}>
                  {p}
                </button>
              ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-2 border border-accent/20 rounded-xl text-muted-foreground hover:text-white disabled:opacity-30 transition-all">
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        )}
      </div>

      {activeSlot && <SlotModal slot={activeSlot} onClose={() => setActiveSlot(null)} />}
    </Layout>
  );
}

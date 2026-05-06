import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { ALL_SLOTS, SLOT_CATEGORIES, type SlotCategory, type SlotGame } from "@/data/slots";
import SlotModal from "@/components/SlotModal";

const PAGE_SIZE = 40;

export default function SlotCatalog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<SlotCategory | "Все">("Все");
  const [page, setPage] = useState(1);
  const [activeSlot, setActiveSlot] = useState<SlotGame | null>(null);

  const filtered = useMemo(() => {
    let list = ALL_SLOTS;
    if (activeCategory !== "Все") list = list.filter((s) => s.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategoryChange(cat: SlotCategory | "Все") {
    setActiveCategory(cat);
    setPage(1);
  }

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  return (
    <div className="w-full">
      {/* Search */}
      <div className="relative mb-6 max-w-md mx-auto">
        <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск слота или провайдера..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:border-accent/60 transition-colors"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {(["Все", ...SLOT_CATEGORIES] as (SlotCategory | "Все")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-accent text-black font-bold shadow-lg shadow-accent/30"
                : "border border-accent/20 text-muted-foreground hover:border-accent/50 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="text-center text-muted-foreground text-sm mb-6">
        Найдено: <span className="text-accent font-bold">{filtered.length}</span> игр
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3 mb-10">
        {paginated.map((slot) => (
          <div
            key={slot.id}
            className="group relative bg-black/50 border border-accent/10 hover:border-accent/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20"
            onClick={() => setActiveSlot(slot)}
          >
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {slot.hot && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">🔥</span>
              )}
              {slot.new && (
                <span className="bg-accent text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>
              )}
            </div>

            {/* Image cover */}
            <div className="relative h-24 overflow-hidden">
              <img src={slot.image} alt={slot.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-end">
                <span className="text-[9px] text-white/70 font-medium truncate">{slot.provider}</span>
                <span className="text-[9px] text-yellow-400 font-bold">{slot.maxWin}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-2">
              <div className="font-bold text-xs text-white leading-tight mb-1 truncate">{slot.name}</div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-accent font-medium">RTP {slot.rtp}%</span>
                <span className="text-[10px] text-muted-foreground">{slot.lines} линий</span>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
              <button
                className="w-full py-2 bg-gradient-to-r from-accent to-amber-400 text-black text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                onClick={(e) => { e.stopPropagation(); setActiveSlot(slot); }}
              >
                🎰 Демо
              </button>
              <button
                className="w-full py-1.5 border border-accent/30 text-accent text-xs font-medium rounded-lg hover:bg-accent/10 transition-all"
                onClick={(e) => { e.stopPropagation(); setActiveSlot(slot); }}
              >
                💰 На деньги
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-accent/20 rounded-xl text-sm text-muted-foreground hover:border-accent/50 hover:text-white disabled:opacity-30 transition-all"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | "...")[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="text-muted-foreground px-1">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                    page === p
                      ? "bg-accent text-black font-bold shadow-lg shadow-accent/30"
                      : "border border-accent/20 text-muted-foreground hover:border-accent/50 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              )
            )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-accent/20 rounded-xl text-sm text-muted-foreground hover:border-accent/50 hover:text-white disabled:opacity-30 transition-all"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      )}

      {/* Modal */}
      {activeSlot && (
        <SlotModal slot={activeSlot} onClose={() => setActiveSlot(null)} />
      )}
    </div>
  );
}
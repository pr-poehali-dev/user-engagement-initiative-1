import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { PROVIDERS, PROVIDER_COLORS, ALL_SLOTS } from "@/data/slots";

export default function ProvidersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const providers = PROVIDERS
    .filter(p => p.toLowerCase().includes(search.toLowerCase()))
    .map(p => ({
      name: p,
      count: ALL_SLOTS.filter(s => s.provider === p).length,
      hot: ALL_SLOTS.filter(s => s.provider === p && s.hot).length,
      newGames: ALL_SLOTS.filter(s => s.provider === p && s.new).length,
      avgRtp: +(ALL_SLOTS.filter(s => s.provider === p).reduce((a, s) => a + s.rtp, 0) / ALL_SLOTS.filter(s => s.provider === p).length).toFixed(1),
      color: PROVIDER_COLORS[p] ?? "from-gray-600 to-gray-700",
      sample: ALL_SLOTS.filter(s => s.provider === p).slice(0, 3),
    }));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-black text-white mb-2">🏢 Провайдеры</h1>
          <p className="text-muted-foreground">Лучшие разработчики казино-игр в одном месте</p>
        </div>

        <div className="relative mb-8 max-w-md">
          <input type="text" placeholder="Поиск провайдера..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-accent/20 rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:border-accent/50 text-sm" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {providers.map(p => (
            <div key={p.name}
              className="group bg-black/40 border border-white/10 hover:border-accent/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1"
              onClick={() => navigate(`/slots?provider=${encodeURIComponent(p.name)}`)}>
              {/* Header gradient */}
              <div className={`bg-gradient-to-r ${p.color} p-5 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10">
                  <div className="font-display font-black text-xl text-white mb-1">{p.name}</div>
                  <div className="text-white/70 text-xs">{p.count} игр в каталоге</div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center bg-black/30 rounded-xl py-2">
                    <div className="text-sm font-black text-accent">{p.count}</div>
                    <div className="text-[10px] text-muted-foreground">Игр</div>
                  </div>
                  <div className="text-center bg-black/30 rounded-xl py-2">
                    <div className="text-sm font-black text-white">{p.avgRtp}%</div>
                    <div className="text-[10px] text-muted-foreground">Ср. RTP</div>
                  </div>
                  <div className="text-center bg-black/30 rounded-xl py-2">
                    <div className="text-sm font-black text-red-400">{p.hot}</div>
                    <div className="text-[10px] text-muted-foreground">🔥 Хит</div>
                  </div>
                </div>

                {/* Sample games */}
                <div className="space-y-1.5 mb-4">
                  {p.sample.map(s => (
                    <div key={s.id} className="flex items-center gap-2">
                      <img src={s.image} alt={s.name} className="w-7 h-7 rounded-lg object-cover flex-shrink-0" />
                      <span className="text-xs text-white/80 truncate">{s.name}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-accent/20 to-amber-400/20 border border-accent/30 text-accent text-sm font-bold rounded-xl hover:from-accent hover:to-amber-400 hover:text-black transition-all">
                  Смотреть игры →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

import { useState, useEffect } from "react";

export type GameMode = "demo" | "real";

export interface Bonus {
  id: string;
  title: string;
  description: string;
  type: "deposit" | "freespins" | "cashback";
  value: number;
  minDeposit: number;
  activated: boolean;
  claimed: boolean;
  expiresIn: string;
  color: string;
}

export interface PlayerState {
  demoBalance: number;
  realBalance: number;
  mode: GameMode;
  bonuses: Bonus[];
  totalDeposited: number;
}

const INITIAL_BONUSES: Bonus[] = [
  {
    id: "welcome",
    title: "Приветственный бонус",
    description: "+200% к первому депозиту",
    type: "deposit",
    value: 200,
    minDeposit: 500,
    activated: false,
    claimed: false,
    expiresIn: "7 дней",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "freespins50",
    title: "50 Фриспинов",
    description: "Бесплатные спины на Book of Ra",
    type: "freespins",
    value: 50,
    minDeposit: 0,
    activated: false,
    claimed: false,
    expiresIn: "3 дня",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "cashback",
    title: "Кэшбэк 15%",
    description: "Возврат 15% от проигрыша за неделю",
    type: "cashback",
    value: 15,
    minDeposit: 1000,
    activated: false,
    claimed: false,
    expiresIn: "5 дней",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "reload",
    title: "Бонус пополнения",
    description: "+50% на каждый депозит этой недели",
    type: "deposit",
    value: 50,
    minDeposit: 300,
    activated: false,
    claimed: false,
    expiresIn: "2 дня",
    color: "from-rose-500 to-pink-600",
  },
];

const STORAGE_KEY = "pawplay_player";

function loadState(): PlayerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_e) {
    // ignore
  }
  return {
    demoBalance: 5000,
    realBalance: 0,
    mode: "demo",
    bonuses: INITIAL_BONUSES,
    totalDeposited: 0,
  };
}

function saveState(state: PlayerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Simple global store using module-level state + subscribers
let _state: PlayerState = loadState();
const _subscribers: Set<() => void> = new Set();

function notify() {
  saveState(_state);
  _subscribers.forEach((fn) => fn());
}

export const gameStore = {
  getState: () => _state,

  subscribe: (fn: () => void) => {
    _subscribers.add(fn);
    return () => _subscribers.delete(fn);
  },

  setMode: (mode: GameMode) => {
    _state = { ..._state, mode };
    notify();
  },

  deposit: (amount: number) => {
    const bonusBoost = _state.bonuses.find(
      (b) => b.activated && !b.claimed && b.type === "deposit" && amount >= b.minDeposit
    );
    let credited = amount;
    if (bonusBoost) {
      credited = amount + Math.floor(amount * bonusBoost.value / 100);
      _state = {
        ..._state,
        bonuses: _state.bonuses.map((b) =>
          b.id === bonusBoost.id ? { ...b, claimed: true } : b
        ),
      };
    }
    _state = {
      ..._state,
      realBalance: _state.realBalance + credited,
      totalDeposited: _state.totalDeposited + amount,
    };
    notify();
    return { credited, bonus: credited - amount };
  },

  addDemoBalance: (amount: number) => {
    _state = { ..._state, demoBalance: _state.demoBalance + amount };
    notify();
  },

  deductBalance: (amount: number) => {
    if (_state.mode === "demo") {
      _state = { ..._state, demoBalance: Math.max(0, _state.demoBalance - amount) };
    } else {
      _state = { ..._state, realBalance: Math.max(0, _state.realBalance - amount) };
    }
    notify();
  },

  addWin: (amount: number) => {
    if (_state.mode === "demo") {
      _state = { ..._state, demoBalance: _state.demoBalance + amount };
    } else {
      _state = { ..._state, realBalance: _state.realBalance + amount };
    }
    notify();
  },

  activateBonus: (id: string) => {
    _state = {
      ..._state,
      bonuses: _state.bonuses.map((b) =>
        b.id === id ? { ...b, activated: true } : b
      ),
    };
    notify();
  },

  claimFreeSpins: (id: string) => {
    const bonus = _state.bonuses.find((b) => b.id === id);
    if (!bonus || bonus.claimed) return 0;
    _state = {
      ..._state,
      demoBalance: _state.demoBalance + bonus.value * 10,
      bonuses: _state.bonuses.map((b) =>
        b.id === id ? { ...b, claimed: true, activated: true } : b
      ),
    };
    notify();
    return bonus.value;
  },
};

// React hook
export function useGameStore() {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    return gameStore.subscribe(() => forceUpdate((n) => n + 1));
  }, []);
  return gameStore.getState();
}
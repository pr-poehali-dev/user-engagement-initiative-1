import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  time: string;
}

const FAQ = [
  { q: "Как пополнить счёт?", a: "Перейдите в раздел «Пополнить» → выберите способ оплаты (Visa, Mastercard, МИР, СБП, Сбербанк, Тинькофф, QIWI или крипту) → введите сумму и данные → нажмите «Оплатить». Зачисление мгновенно." },
  { q: "Как вывести деньги?", a: "Для вывода необходимо пройти верификацию. После подтверждения личности перейдите в профиль → «Вывод средств» → выберите метод и введите реквизиты. Срок вывода: карты 1-3 дня, СБП до 24 часов." },
  { q: "Как активировать бонус?", a: "Перейдите в раздел «Бонусы» → нажмите «Активировать» на нужном бонусе → пополните счёт на указанную сумму. Бонус применится автоматически. Ежедневный бонус доступен раз в сутки." },
  { q: "Что такое фриспины?", a: "Фриспины — бесплатные спины на слотах. После активации бонуса «50 Фриспинов» демо-монеты зачисляются сразу на баланс. Играйте в любые слоты!" },
  { q: "Как пройти верификацию?", a: "Перейдите в раздел «Верификация» → заполните личные данные → загрузите фото паспорта → сделайте селфи с паспортом. Проверка занимает от 15 минут до 24 часов." },
  { q: "Не работает игра", a: "Попробуйте: 1) Обновить страницу. 2) Очистить кэш браузера. 3) Попробовать другой браузер. Если проблема сохраняется — опишите её в чате и мы поможем!" },
  { q: "Минимальный депозит", a: "Минимальная сумма пополнения — 100 ₽. Для активации приветственного бонуса нужно пополнить на 500 ₽ и более." },
  { q: "RTP — что это?", a: "RTP (Return to Player) — процент возврата игроку. Например, RTP 96% означает, что в долгосрочной перспективе игра возвращает 96 копеек с каждого рубля ставки. Чем выше RTP — тем лучше для игрока." },
];

const BOT_RESPONSES: Record<string, string> = {
  "привет": "Привет! 👋 Я виртуальный помощник Paw Play Casino. Чем могу помочь? Выберите вопрос ниже или напишите сами.",
  "привет!": "Привет! 👋 Рад вас видеть! Как могу помочь?",
  "здравствуйте": "Здравствуйте! 👋 Добро пожаловать в службу поддержки Paw Play Casino. Чем могу помочь?",
  "пополнить": "Для пополнения счёта перейдите в раздел «Пополнить» в меню. Доступны: Visa, Mastercard, МИР, СБП, Сбербанк, Тинькофф, QIWI и криптовалюта. Минимум 100 ₽, зачисление мгновенно! 💳",
  "депозит": "Минимальный депозит — 100 ₽. Доступны все популярные методы оплаты. При активном бонусе сумма увеличивается автоматически! Перейдите: Пополнить → выберите метод. 💰",
  "бонус": "Бонусы доступны в разделе «Бонусы»! 🎁\n\n• Приветственный +200% к депозиту\n• 50 фриспинов\n• Кэшбэк 15%\n• Ежедневный вход (заходи каждый день!)\n\nНажмите «Активировать» на нужном бонусе.",
  "фриспины": "Фриспины — это бесплатные спины! 🎰 Активируйте бонус «50 Фриспинов» в разделе «Бонусы» и демо-монеты зачислятся сразу на счёт.",
  "вывод": "Для вывода средств необходимо пройти верификацию. После этого: Профиль → Вывод средств → выберите метод. Сроки: карты 1-3 дня, СБП до 24 часов. 💸",
  "верификация": "Верификация нужна для вывода средств. Перейдите в раздел «Верификация»:\n1️⃣ Личные данные\n2️⃣ Данные паспорта + фото\n3️⃣ Селфи с паспортом\n\nПроверка 15 мин — 24 часа. 🛡️",
  "паспорт": "Для верификации понадобится:\n• Фото разворота паспорта с фотографией\n• Селфи с паспортом в руке\n\nПерейдите в раздел «Верификация» для загрузки. 📄",
  "слоты": "В нашем каталоге более 500 слотов от лучших провайдеров! 🎰\n\nПопулярные: Gates of Olympus, Sweet Bonanza, Book of Ra, Wolf Gold.\n\nПерейдите в раздел «Слоты» чтобы выбрать игру. Есть демо и игра на деньги!",
  "провайдеры": "Мы работаем с лучшими провайдерами: Pragmatic Play, Play'n GO, NetEnt, Microgaming, Yggdrasil, BGaming и другими — 16 провайдеров! Смотрите раздел «Провайдеры». 🏢",
  "rtp": "RTP (Return to Player) — процент возврата игроку. 📊\n\nНапример, RTP 96% = на дистанции возвращается 96₽ с каждых 100₽ ставок.\n\nВ нашем каталоге средний RTP 93-98%. Чем выше — тем лучше!",
  "демо": "Демо-режим доступен во всех играх без регистрации! 🎮\n\nНажмите на любой слот в каталоге → кнопка «🎰 Демо». Вам будет начислен демо-баланс для игры.",
  "помощь": "Я готов помочь! Вот что я умею:\n\n💳 Вопросы по пополнению\n💰 Вывод средств\n🎁 Бонусы и акции\n🎰 Вопросы по играм\n🛡️ Верификация\n\nНапишите ваш вопрос или выберите из списка выше.",
  "спасибо": "Всегда рад помочь! 😊 Если возникнут ещё вопросы — пишите. Удачи в игре! 🍀",
  "пока": "До свидания! 👋 Удачи и больших выигрышей в Paw Play Casino! 🐾",
};

function getBotResponse(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const [key, val] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key)) return val;
  }
  // FAQ match
  for (const item of FAQ) {
    const words = item.q.toLowerCase().split(" ").filter(w => w.length > 3);
    if (words.some(w => lower.includes(w))) return item.a;
  }
  return "Понял ваш вопрос! 🤔 К сожалению, не могу ответить автоматически. Наш оператор ответит в течение 5 минут. Или попробуйте выбрать тему из быстрых ответов выше.";
}

function now() {
  return new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
}

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "bot", text: "Привет! 👋 Я виртуальный помощник Paw Play Casino.\n\nЧем могу помочь? Выберите вопрос ниже или напишите сами.", time: now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getBotResponse(text);
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: response, time: now() }]);
    }, 800 + Math.random() * 600);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6">
          <h1 className="text-4xl font-display font-black text-white mb-2">💬 Поддержка</h1>
          <p className="text-muted-foreground">Онлайн-чат · Среднее время ответа: 2 минуты</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* FAQ sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <div className="text-sm font-bold text-white mb-3">Частые вопросы</div>
            {FAQ.map((item, i) => (
              <button key={i} onClick={() => sendMessage(item.q)}
                className="w-full text-left px-3 py-2.5 bg-black/40 border border-white/10 hover:border-accent/40 rounded-xl text-xs text-muted-foreground hover:text-white transition-all">
                {item.q}
              </button>
            ))}
          </div>

          {/* Chat */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-accent/20 rounded-t-2xl">
              <div className="w-9 h-9 bg-gradient-to-br from-accent to-amber-500 rounded-xl flex items-center justify-center text-black font-black text-lg">🐾</div>
              <div>
                <div className="font-bold text-sm text-white">Paw Support Bot</div>
                <div className="flex items-center gap-1.5 text-xs text-green-400">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Онлайн
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-[400px] max-h-[500px] overflow-y-auto bg-black/20 border-x border-accent/10 p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 bg-gradient-to-br from-accent to-amber-500 rounded-lg flex items-center justify-center text-black text-sm mr-2 flex-shrink-0 mt-0.5">🐾</div>
                  )}
                  <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === "user" ? "bg-accent text-black font-medium rounded-br-sm" : "bg-black/50 border border-white/10 text-white rounded-bl-sm"}`}>
                      {msg.text}
                    </div>
                    <div className="text-[10px] text-muted-foreground px-1">{msg.time}</div>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 bg-gradient-to-br from-accent to-amber-500 rounded-lg flex items-center justify-center text-black text-sm mr-2 flex-shrink-0">🐾</div>
                  <div className="bg-black/50 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 p-3 bg-black/40 border border-accent/20 rounded-b-2xl">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Напишите вопрос..."
                className="flex-1 px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:border-accent/40 text-sm"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-accent to-amber-400 text-black rounded-xl font-bold text-sm hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const STEPS = [
  { id: "personal", label: "Личные данные", icon: "User" },
  { id: "passport", label: "Паспорт", icon: "FileText" },
  { id: "selfie",   label: "Фото с паспортом", icon: "Camera" },
  { id: "done",     label: "Готово", icon: "ShieldCheck" },
];

export default function VerificationPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", birth: "", phone: "", passNum: "", passDate: "", passCode: "" });
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleField(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function nextStep() {
    if (step < STEPS.length - 1) setStep(s => s + 1);
  }

  function handleSubmit() {
    setSubmitted(true);
    setStep(3);
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-black text-white mb-2">🛡️ Верификация</h1>
          <p className="text-muted-foreground">Подтвердите личность для вывода средств</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className={`flex flex-col items-center gap-1 flex-1 ${i <= step ? "opacity-100" : "opacity-40"}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all ${i < step ? "bg-accent border-accent text-black" : i === step ? "border-accent bg-accent/20 text-accent" : "border-white/20 text-muted-foreground"}`}>
                  {i < step ? <Icon name="Check" size={16} /> : <Icon name={s.icon} fallback="Circle" size={16} />}
                </div>
                <div className="text-[10px] text-center text-muted-foreground hidden sm:block">{s.label}</div>
              </div>
              {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-1 transition-all ${i < step ? "bg-accent" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        {/* Step 0: Personal */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-black text-white">Личные данные</h2>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">ФИО полностью</label>
              <input value={form.name} onChange={e => handleField("name", e.target.value)}
                placeholder="Иванов Иван Иванович"
                className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Дата рождения</label>
              <input type="date" value={form.birth} onChange={e => handleField("birth", e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Номер телефона</label>
              <input value={form.phone} onChange={e => handleField("phone", e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50" />
            </div>
            <button onClick={nextStep} disabled={!form.name || !form.birth || !form.phone}
              className="w-full py-4 bg-gradient-to-r from-accent to-amber-400 text-black font-black text-lg rounded-2xl disabled:opacity-50 hover:shadow-xl transition-all active:scale-95">
              Далее →
            </button>
          </div>
        )}

        {/* Step 1: Passport */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-black text-white">Данные паспорта</h2>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Серия и номер</label>
              <input value={form.passNum} onChange={e => handleField("passNum", e.target.value)}
                placeholder="1234 567890" maxLength={11}
                className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50 font-mono text-lg tracking-widest" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Дата выдачи</label>
              <input type="date" value={form.passDate} onChange={e => handleField("passDate", e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Код подразделения</label>
              <input value={form.passCode} onChange={e => handleField("passCode", e.target.value)}
                placeholder="123-456" maxLength={7}
                className="w-full px-4 py-3 bg-black/40 border border-accent/20 rounded-xl text-white focus:outline-none focus:border-accent/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Фото паспорта (разворот с фото)</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-accent/30 rounded-2xl cursor-pointer hover:border-accent/60 hover:bg-accent/5 transition-all">
                {passportFile ? (
                  <div className="text-center">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="text-sm text-accent font-medium">{passportFile.name}</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Icon name="Upload" size={28} className="text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">JPG, PNG до 10 МБ</div>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={e => setPassportFile(e.target.files?.[0] ?? null)} />
              </label>
            </div>
            <button onClick={nextStep} disabled={!form.passNum || !passportFile}
              className="w-full py-4 bg-gradient-to-r from-accent to-amber-400 text-black font-black text-lg rounded-2xl disabled:opacity-50 hover:shadow-xl transition-all active:scale-95">
              Далее →
            </button>
          </div>
        )}

        {/* Step 2: Selfie */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-black text-white">Селфи с паспортом</h2>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-sm text-blue-300 space-y-1.5">
              <div className="font-bold text-white mb-2">📋 Требования к фото:</div>
              <div>• Держите паспорт открытым рядом с лицом</div>
              <div>• Лицо и текст паспорта должны быть чёткими</div>
              <div>• Хорошее освещение, без бликов</div>
              <div>• Не закрывайте серию и номер паспорта</div>
            </div>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-accent/30 rounded-2xl cursor-pointer hover:border-accent/60 hover:bg-accent/5 transition-all">
              {selfieFile ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <div className="text-sm text-accent font-medium">{selfieFile.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">Нажмите чтобы заменить</div>
                </div>
              ) : (
                <div className="text-center">
                  <Icon name="Camera" size={40} className="text-muted-foreground mx-auto mb-3" />
                  <div className="text-sm font-medium text-white">Загрузить фото</div>
                  <div className="text-xs text-muted-foreground mt-1">JPG, PNG до 10 МБ</div>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={e => setSelfieFile(e.target.files?.[0] ?? null)} />
            </label>
            <button onClick={handleSubmit} disabled={!selfieFile}
              className="w-full py-4 bg-gradient-to-r from-accent to-amber-400 text-black font-black text-lg rounded-2xl disabled:opacity-50 hover:shadow-xl transition-all active:scale-95">
              Отправить на проверку
            </button>
          </div>
        )}

        {/* Step 3: Done */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="text-7xl mb-6">✅</div>
            <h2 className="text-2xl font-display font-black text-white mb-3">Документы отправлены!</h2>
            <p className="text-muted-foreground mb-2">Проверка занимает от 15 минут до 24 часов.</p>
            <p className="text-muted-foreground text-sm mb-8">Мы уведомим вас по SMS когда верификация будет завершена.</p>
            <div className="bg-black/40 border border-accent/20 rounded-2xl p-5 text-left space-y-2 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 bg-yellow-500/20 rounded-full flex items-center justify-center"><Icon name="Clock" size={14} className="text-yellow-400" /></div>
                <span className="text-muted-foreground">На проверке</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-40">
                <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center"><Icon name="CheckCircle" size={14} className="text-green-400" /></div>
                <span className="text-muted-foreground">Верификация пройдена</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

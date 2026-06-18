import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Camera, Check, ChevronRight, Loader2, MapPin, Phone, Sparkles, Sun } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/apply")({
 head: () => ({
 meta: [
 { title: "Apply — Resilience Capital" },
 { name: "description", content: "Vendor application demo. From decline to disbursement in under 3 minutes." },
 ],
 }),
 component: ApplyPage,
});

type Step = "form" | "scoring" | "approved" | "disbursed";

type LoanRecord = {
 id: string;
 vendor: string;
 location: string;
 msisdn: string;
 amount: number;
 units: number;
 score: number;
 apr: number;
 totalRepayment: number;
 createdAt: string;
 status: "approved" | "disbursed";
};

function generateLoanId() {
 return "RC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function ApplyPage() {
 const [step, setStep] = useState<Step>("form");
 const [loan, setLoan] = useState<LoanRecord | null>(null);

 return (
 <div className="min-h-screen bg-background text-foreground">
 <SiteNav />
 <section className="border-b border-border bg-[image:var(--gradient-earth)]">
 <div className="mx-auto max-w-5xl px-6 py-12">
 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Vendor application · Demo</p>
 <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">From "declined" to disbursed in 3 minutes.</h1>
 <Steps current={step} />
 </div>
 </section>

 <section className="mx-auto max-w-5xl px-6 py-12">
 {step === "form" && (
 <FormStep
 onSubmit={(draft) => {
 const record: LoanRecord = {
 id: generateLoanId(),
 ...draft,
 score: 82,
 apr: 12,
 totalRepayment: 2400,
 createdAt: new Date().toISOString(),
 status: "approved",
 };
 try {
 const existing = JSON.parse(localStorage.getItem("rc_loans") ?? "[]");
 localStorage.setItem("rc_loans", JSON.stringify([record, ...existing]));
 } catch {}
 setLoan(record);
 setStep("scoring");
 }}
 />
 )}
 {step === "scoring" && <ScoringStep onDone={() => setStep("approved")} />}
 {step === "approved" && loan && (
 <ApprovedStep
 loan={loan}
 onDisburse={() => {
 const updated = { ...loan, status: "disbursed" as const };
 setLoan(updated);
 try {
 const all = JSON.parse(localStorage.getItem("rc_loans") ?? "[]");
 localStorage.setItem(
 "rc_loans",
 JSON.stringify(all.map((l: LoanRecord) => (l.id === updated.id ? updated : l))),
 );
 } catch {}
 setStep("disbursed");
 }}
 />
 )}
 {step === "disbursed" && loan && <DisbursedStep loan={loan} />}
 </section>
 <SiteFooter />
 </div>
 );
}

function Steps({ current }: { current: Step }) {
 const order: Step[] = ["form", "scoring", "approved", "disbursed"];
 const labels: Record<Step, string> = {
 form: "Application",
 scoring: "Resilience scoring",
 approved: "Adaptive offer",
 disbursed: "M-Pesa disbursement",
 };
 const idx = order.indexOf(current);
 return (
 <ol className="mt-8 flex flex-wrap items-center gap-3 text-sm">
 {order.map((s, i) => {
 const done = i < idx;
 const active = i === idx;
 return (
 <li key={s} className="flex items-center gap-3">
 <span className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold ${done ? "border-[color:var(--success)] bg-[color:var(--success)] text-white" : active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}>
 {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
 </span>
 <span className={active ? "font-medium text-foreground" : "text-muted-foreground"}>{labels[s]}</span>
 {i < order.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground/50" />}
 </li>
 );
 })}
 </ol>
 );
}

function Card({ children }: { children: React.ReactNode }) {
 return <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">{children}</div>;
}

function FormStep({ onSubmit }: { onSubmit: (draft: { vendor: string; location: string; msisdn: string; amount: number; units: number }) => void }) {
 const [name, setName] = useState("James Ochieng");
 const [location, setLocation] = useState("Turkana, Kenya");
 const [msisdn, setMsisdn] = useState("+254 712 894 102");
 const [amount, setAmount] = useState(2000);
 const [units, setUnits] = useState(50);

 return (
 <Card>
 <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
 <form
 className="space-y-5"
 onSubmit={(e) => {
 e.preventDefault();
 onSubmit({ vendor: name, location, msisdn, amount, units });
 }}
 >
 <Field label="Full name">
 <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
 </Field>
 <div className="grid grid-cols-2 gap-4">
 <Field label="Location">
 <div className="relative">
 <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
 <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm" />
 </div>
 </Field>
 <Field label="M-Pesa number">
 <div className="relative">
 <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
 <input value={msisdn} onChange={(e) => setMsisdn(e.target.value)} className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm" />
 </div>
 </Field>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <Field label="Loan amount (USD)">
 <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
 </Field>
 <Field label="Panel units to stock">
 <input type="number" value={units} onChange={(e) => setUnits(+e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
 </Field>
 </div>
 <Field label="Inventory photo (GPS-tagged)">
 <button type="button" className="flex w-full items-center justify-between rounded-md border border-dashed border-border bg-background px-4 py-4 text-sm text-muted-foreground hover:border-primary hover:text-foreground">
 <span className="inline-flex items-center gap-2"><Camera className="h-4 w-4" /> Tap to capture current stock</span>
 <span className="text-xs">Offline-capable</span>
 </button>
 </Field>

 <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5">
 Submit application <ArrowRight className="h-4 w-4" />
 </button>
 </form>

 <aside className="rounded-xl border border-border bg-secondary/40 p-5">
 <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What we'll check</p>
 <ul className="mt-4 space-y-3 text-sm">
 <Pulse label="Satellite rainfall (NASA POWER)" />
 <Pulse label="Soil moisture index (90-day)" />
 <Pulse label="Vegetation health (NDVI)" />
 <Pulse label="M-Pesa transaction history" />
 <Pulse label="Community reference signals" />
 </ul>
 <p className="mt-5 text-xs text-muted-foreground">No credit bureau lookup. No paperwork. Designed for the credit-invisible.</p>
 </aside>
 </div>
 </Card>
 );
}

function Pulse({ label }: { label: string }) {
 return (
 <li className="flex items-center gap-2 text-muted-foreground">
 <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {label}
 </li>
 );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
 return (
 <label className="block">
 <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
 {children}
 </label>
 );
}

function ScoringStep({ onDone }: { onDone: () => void }) {
 const [isDone, setIsDone] = useState(false);

 useEffect(() => {
 const timer = setTimeout(() => setIsDone(true), 1500);
 return () => clearTimeout(timer);
 }, []);

 return (
 <Card>
 <div className="flex flex-col items-center py-8 text-center">
 <div className="grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground transition-all duration-500">
 {isDone ? <Check className="h-6 w-6" /> : <Loader2 className="h-6 w-6 animate-spin" />}
 </div>
 <h2 className="mt-6 text-2xl font-semibold tracking-tight">
 {isDone ? "Resilience model complete" : "Running the Resilience model…"}
 </h2>
 <p className="mt-2 max-w-md text-sm text-muted-foreground">Rainfall 35% · Soil moisture 30% · Vegetation 20% · Seasonal 15%</p>

 <div className="mt-10 grid w-full max-w-2xl gap-3 text-left">
 <Tick label="NASA POWER rainfall ingested · 90-day window" />
 <Tick label="Soil moisture ensemble — moderate drought signal" delay={300} />
 <Tick label="M-Pesa flows: KSh 812 avg monthly, 31 months active" delay={600} />
 <Tick label="Community references: 4 of 4 returned positive" delay={900} />
 <Tick label="Resilience Score computed: 82 / 100" delay={1200} highlight />
 </div>

 <div className={`mt-10 transition-opacity duration-500 ${isDone ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
 <button
 onClick={onDone}
 className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
 >
 View adaptive offer <ArrowRight className="h-4 w-4" />
 </button>
 </div>
 </div>
 </Card>
 );
}

function Tick({ label, delay = 0, highlight }: { label: string; delay?: number; highlight?: boolean }) {
 return (
 <div
 className={`flex items-center gap-3 rounded-md border px-4 py-3 text-sm opacity-0 ${highlight ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}
 style={{ animation: `fadeIn 0.5s ${delay}ms forwards` }}
 >
 <Check className={`h-4 w-4 ${highlight ? "text-primary" : "text-[color:var(--success)]"}`} />
 <span className={highlight ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>
 <style>{`@keyframes fadeIn { to { opacity: 1; transform: translateY(0); } from { opacity: 0; transform: translateY(4px); } }`}</style>
 </div>
 );
}

function ApprovedStep({ loan, onDisburse }: { loan: LoanRecord; onDisburse: () => void }) {
 return (
 <Card>
 <div className="flex items-start justify-between gap-6">
 <div>
 <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--success)]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--success)]">
 <Check className="h-3 w-3" /> Approved
 </span>
 <h2 className="mt-3 text-3xl font-semibold tracking-tight">KSh {loan.amount.toLocaleString()} — adaptive 12-month schedule</h2>
 <p className="mt-2 text-sm text-muted-foreground">Loan {loan.id} · Total repayment KSh {loan.totalRepayment.toLocaleString()} · {loan.apr}% APR · Origination 2.5%</p>
 </div>
 <div className="hidden text-right md:block">
 <p className="text-xs uppercase tracking-wider text-muted-foreground">Resilience Score</p>
 <p className="text-4xl font-semibold text-primary">{loan.score}</p>
 </div>
 </div>

 <div className="mt-8 grid gap-3 md:grid-cols-3">
 <Month label="Jan–Feb" amount="KSh 120 / mo" tone="discount" note="−30% drought discount" icon={<Sun className="h-4 w-4" />} />
 <Month label="Mar–May" amount="KSh 280 / mo" tone="premium" note="+40% rainy premium" icon={<Sparkles className="h-4 w-4" />} />
 <Month label="Jun–Dec" amount="KSh 200 / mo" tone="base" note="Baseline cadence" />
 </div>

 <div className="mt-8 grid gap-3 rounded-xl border border-border bg-secondary/40 p-5 md:grid-cols-3">
 <Perk title="Carbon credits" value="+KSh 3.40 / mo" body="Auto-claimed and paid to your M-Pesa." />
 <Perk title="Parametric insurance" value="KSh 50–200" body="Auto payout when drought index ≥ 80%." />
 <Perk title="Community pool" value="2 endorsers" body="Strengthens your score for the next loan." />
 </div>

 <button
 onClick={onDisburse}
 className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5"
 >
 Accept and disburse via M-Pesa <ArrowRight className="h-4 w-4" />
 </button>
 </Card>
 );
}

function Month({ label, amount, tone, note, icon }: { label: string; amount: string; tone: "discount" | "premium" | "base"; note: string; icon?: React.ReactNode }) {
 const styles =
 tone === "discount"
 ? "bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/30"
 : tone === "premium"
 ? "bg-[color:var(--warning)]/10 text-[oklch(0.5_0.15_60)] border-[color:var(--warning)]/30"
 : "bg-card text-foreground border-border";
 return (
 <div className={`rounded-xl border p-4 ${styles}`}>
 <div className="flex items-center justify-between">
 <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{label}</p>
 {icon}
 </div>
 <p className="mt-1.5 text-2xl font-semibold">{amount}</p>
 <p className="text-xs opacity-80">{note}</p>
 </div>
 );
}

function Perk({ title, value, body }: { title: string; value: string; body: string }) {
 return (
 <div>
 <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
 <p className="mt-1 text-lg font-semibold">{value}</p>
 <p className="mt-1 text-xs text-muted-foreground">{body}</p>
 </div>
 );
}

function DisbursedStep({ loan }: { loan: LoanRecord }) {
 const t0 = new Date(loan.createdAt);
 const fmt = (offsetSec: number) =>
 new Date(t0.getTime() + offsetSec * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
 const timeline = [
 { t: fmt(0), label: "Application submitted", body: `${loan.vendor} · ${loan.location}`, done: true },
 { t: fmt(12), label: "Satellite + M-Pesa signals fused", body: `Resilience score ${loan.score}/100`, done: true },
 { t: fmt(48), label: "Adaptive schedule generated", body: `12 months · total KSh ${loan.totalRepayment.toLocaleString()}`, done: true },
 { t: fmt(120), label: "Loan approved", body: `Loan ID ${loan.id}`, done: true },
 { t: fmt(167), label: "M-Pesa disbursement", body: `KSh ${loan.amount.toLocaleString()} → ${loan.msisdn}`, done: true },
 { t: "+24h", label: "Inventory verification ping", body: "GPS-tagged photo requested from vendor", done: false },
 ];
 return (
 <Card>
 <div className="flex flex-col items-center text-center">
 <div className="grid h-16 w-16 place-items-center rounded-full bg-[image:var(--gradient-sun)] text-accent-foreground shadow-[var(--shadow-glow)]">
 <Check className="h-8 w-8" />
 </div>
 <h2 className="mt-6 text-3xl font-semibold tracking-tight">KSh {loan.amount.toLocaleString()} sent to {loan.msisdn}</h2>
 <p className="mt-2 max-w-md text-sm text-muted-foreground">Loan {loan.id} · M-Pesa confirmation NLJ7RT61SV · 2 min 47 sec from submission to disbursement.</p>

 <div className="mt-8 grid w-full max-w-xl grid-cols-3 gap-3 text-left">
 <Mini label={`${loan.units} panels`} value="Inventory" />
 <Mini label="125 households" value="Energy access" />
 <Mini label="60 tons" value="CO₂ avoided" />
 </div>

 <div className="mt-10 w-full max-w-2xl text-left">
 <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Approval timeline</p>
 <ol className="mt-4 space-y-3">
 {timeline.map((s, i) => (
 <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
 <span className={`mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full text-[10px] font-semibold ${s.done ? "bg-[color:var(--success)] text-white" : "border border-dashed border-border text-muted-foreground"}`}>
 {s.done ? <Check className="h-3 w-3" /> : i + 1}
 </span>
 <div className="flex-1">
 <p className="text-sm font-medium">{s.label}</p>
 <p className="text-xs text-muted-foreground">{s.body}</p>
 </div>
 <span className="text-xs tabular-nums text-muted-foreground">{s.t}</span>
 </li>
 ))}
 </ol>
 </div>

 <div className="mt-10 flex flex-wrap justify-center gap-3">
 <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
 See it on the lender dashboard <ArrowRight className="h-4 w-4" />
 </Link>
 <Link to="/compare" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground">
 Replay the comparison
 </Link>
 </div>
 </div>
 </Card>
 );
}

function Mini({ label, value }: { label: string; value: string }) {
 return (
 <div className="rounded-lg border border-border bg-secondary/40 p-3 text-center">
 <p className="text-lg font-semibold text-foreground">{label}</p>
 <p className="text-xs uppercase tracking-wider text-muted-foreground">{value}</p>
 </div>
 );
}


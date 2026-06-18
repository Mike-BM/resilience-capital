import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ban, Check, CloudRain, Sun, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/compare")({
 head: () => ({
 meta: [
 { title: "Traditional Bank vs. Resilience Capital" },
 { name: "description", content: "The killer comparison: identical vendor, two answers. Flat decline vs. climate-adaptive approval." },
 { property: "og:title", content: "DECLINED vs. APPROVED — same vendor, different model" },
 { property: "og:description", content: "See exactly how climate-adaptive pricing turns a 'too risky' loan into a 96% survival bet." },
 ],
 }),
 component: ComparePage,
});

function ComparePage() {
 // Drought severity 0–50% discount on Jan–Feb baseline (KSh 200).
 // Total repayment must stay KSh 2,400 → 2*Jan + 3*Mar + 7*200 = 2400 → 2J + 3M = 1000.
 const [droughtPct, setDroughtPct] = useState(30);
 const jan = Math.round(200 * (1 - droughtPct / 100));
 const mar = Math.round((1000 - 2 * jan) / 3);
 const rainyPct = Math.round(((mar - 200) / 200) * 100);
 const schedule = useMemo(
 () => [
 { m: "Jan", v: jan, t: "discount" as const },
 { m: "Feb", v: jan, t: "discount" as const },
 { m: "Mar", v: mar, t: "premium" as const },
 { m: "Apr", v: mar, t: "premium" as const },
 { m: "May", v: mar, t: "premium" as const },
 ...Array.from({ length: 7 }, (_, i) => ({ m: ["Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], v: 200, t: "base" as const })),
 ],
 [jan, mar],
 );
 const total = schedule.reduce((s, x) => s + x.v, 0);

 return (
 <div className="min-h-screen bg-background text-foreground">
 <SiteNav />
 <section className="border-b border-border bg-[image:var(--gradient-earth)]">
 <div className="mx-auto max-w-7xl px-6 py-16 text-center">
 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Same vendor. Same loan. Two answers.</p>
 <h1 className="mx-auto mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-6xl">
 James needs <span className="text-primary">KSh 2,000</span> for 50 panels<br />
 before the rainy season.
 </h1>
 <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
 One model sees a drought zone. The other sees a forecast.
 </p>
 </div>
 </section>

 <section className="mx-auto max-w-7xl px-6 py-16">
 <div className="grid gap-6 lg:grid-cols-2">
 <BankCard />
 <ResilienceCard jan={jan} mar={mar} droughtPct={droughtPct} rainyPct={rainyPct} schedule={schedule} onDrought={setDroughtPct} />
 </div>

 <div className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-sm">
 <div className="flex flex-wrap items-center justify-between gap-6">
 <div>
 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The math both models agree on</p>
 <p className="mt-2 text-2xl font-medium">Total repaid: <span className="font-semibold">KSh {total.toLocaleString()}</span>. We just route it through the seasons that can pay it.</p>
 </div>
 <Link to="/apply" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5">
 Try the vendor flow <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </div>
 </section>
 <SiteFooter />
 </div>
 );
}

function BankCard() {
 return (
 <article className="relative overflow-hidden rounded-3xl border border-destructive/30 bg-card p-8 shadow-sm">
 <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-destructive">
 <Ban className="h-3 w-3" /> Declined
 </span>
 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Traditional Bank</p>
 <h3 className="mt-2 text-3xl font-semibold tracking-tight">"Too high risk."</h3>
 <p className="mt-3 text-sm text-muted-foreground">Flat monthly model. Single drought signal. No further analysis.</p>

 <dl className="mt-8 space-y-1 divide-y divide-border/60 border-y border-border/60">
 <Row label="Risk score" value="N/A — region blacklisted" />
 <Row label="Monthly payment" value="—" />
 <Row label="Total repayment" value="—" />
 <Row label="Disbursement" value="—" />
 <Row label="Projected survival" value="0%" tone="bad" />
 </dl>

 <div className="mt-8 grid grid-cols-12 gap-1.5 opacity-40">
 {Array.from({ length: 12 }).map((_, i) => (
 <div key={i} className="h-12 rounded-sm bg-destructive/15" />
 ))}
 </div>
 <p className="mt-3 text-xs text-muted-foreground">Twelve months. Zero approvals.</p>

 <p className="mt-8 text-sm italic text-muted-foreground">
 "I've sold panels for three years. I've never missed a payment. They didn't even open my file." — James
 </p>
 </article>
 );
}

function ResilienceCard({
 jan,
 mar,
 droughtPct,
 rainyPct,
 schedule,
 onDrought,
}: {
 jan: number;
 mar: number;
 droughtPct: number;
 rainyPct: number;
 schedule: { m: string; v: number; t: "discount" | "premium" | "base" }[];
 onDrought: (n: number) => void;
}) {
 return (
 <article className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-8 shadow-[var(--shadow-soft)]">
 <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[image:var(--gradient-sun)] opacity-30 blur-3xl" />
 <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-[color:var(--success)]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--success)]">
 <Check className="h-3 w-3" /> Approved
 </span>
 <p className="text-xs font-semibold uppercase tracking-widest text-primary">Resilience Capital</p>
 <h3 className="mt-2 text-3xl font-semibold tracking-tight">Score: <span className="text-primary">82 / 100</span></h3>
 <p className="mt-3 text-sm text-muted-foreground">Satellite + M-Pesa + community signals. Adaptive schedule from a 90-day forecast.</p>

 <dl className="mt-8 space-y-1 divide-y divide-border/60 border-y border-border/60">
 <Row label="Risk score" value="82 / 100 (resilience-adjusted)" />
 <Row label="Jan–Feb (drought)" value={`KSh ${jan} / mo · −${droughtPct}%`} tone="good" icon={<Sun className="h-3.5 w-3.5" />} />
 <Row label="Mar–May (rainy)" value={`KSh ${mar} / mo · +${rainyPct}%`} tone="warn" icon={<CloudRain className="h-3.5 w-3.5" />} />
 <Row label="Jun–Dec (baseline)" value="KSh 200 / mo" />
 <Row label="Total repayment" value="KSh 2,400" />
 <Row label="Disbursement" value="M-Pesa · 3 minutes" tone="good" />
 <Row label="Projected survival" value="96%" tone="good" />
 </dl>

 <DroughtControl droughtPct={droughtPct} rainyPct={rainyPct} onChange={onDrought} />
 <ScheduleBars schedule={schedule} />

 <p className="mt-6 text-xs text-muted-foreground">
 Carbon credits add <span className="font-semibold text-foreground">KSh 2–5/mo</span> back to James. Parametric trigger covers 80%+ drought events automatically.
 </p>
 </article>
 );
}

function DroughtControl({ droughtPct, rainyPct, onChange }: { droughtPct: number; rainyPct: number; onChange: (n: number) => void }) {
 return (
 <div className="mt-6 rounded-xl border border-border bg-background p-4">
 <div className="flex items-center justify-between">
 <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Drought severity (Jan–Feb)</p>
 <p className="text-xs text-muted-foreground">Rainy premium auto-balances → <span className="font-semibold text-foreground">+{rainyPct}%</span></p>
 </div>
 <input
 type="range"
 min={0}
 max={50}
 step={1}
 value={droughtPct}
 onChange={(e) => onChange(+e.target.value)}
 className="mt-3 w-full accent-[color:var(--success)]"
 aria-label="Drought discount percentage"
 />
 <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
 <span>No drought · 0%</span>
 <span className="font-semibold text-foreground">−{droughtPct}% discount</span>
 <span>Severe · 50%</span>
 </div>
 </div>
 );
}

function Row({ label, value, tone, icon }: { label: string; value: string; tone?: "good" | "bad" | "warn"; icon?: React.ReactNode }) {
 const valColor =
 tone === "good" ? "text-[color:var(--success)]" : tone === "bad" ? "text-destructive" : tone === "warn" ? "text-[oklch(0.55_0.16_60)]" : "text-foreground";
 return (
 <div className="flex items-center justify-between py-3 text-sm">
 <dt className="text-muted-foreground">{label}</dt>
 <dd className={`inline-flex items-center gap-1.5 font-semibold ${valColor}`}>
 {icon}
 {value === "—" ? <X className="h-3.5 w-3.5 text-destructive" /> : null}
 {value}
 </dd>
 </div>
 );
}

function ScheduleBars({ schedule }: { schedule: { m: string; v: number; t: "discount" | "premium" | "base" }[] }) {
 const max = Math.max(280, ...schedule.map((m) => m.v));
 return (
 <div className="mt-6 rounded-xl border border-border bg-secondary/40 p-4">
 <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">12-month adaptive schedule</p>
 <div className="mt-4 flex items-end gap-1.5">
 {schedule.map((m) => {
 const color =
 m.t === "discount" ? "bg-[color:var(--success)]" : m.t === "premium" ? "bg-[color:var(--warning)]" : "bg-primary/70";
 return (
 <div key={m.m} className="flex flex-1 flex-col items-center gap-1">
 <div className="flex h-28 w-full items-end">
 <div className={`w-full rounded-sm ${color} `} style={{ height: `${(m.v / max) * 100}%` }} />
 </div>
 <span className="text-[10px] text-muted-foreground">{m.m}</span>
 </div>
 );
 })}
 </div>
 <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
 <Legend swatch="bg-[color:var(--success)]" label="Drought −30%" />
 <Legend swatch="bg-[color:var(--warning)]" label="Rainy +40%" />
 <Legend swatch="bg-primary/70" label="Baseline" />
 </div>
 </div>
 );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
 return (
 <span className="inline-flex items-center gap-1.5">
 <span className={`h-2 w-3 rounded-sm ${swatch}`} /> {label}
 </span>
 );
}


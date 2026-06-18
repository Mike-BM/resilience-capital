import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cloud, Coins, Shield, Sparkles, Sun, TrendingUp, Zap } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/")({
 head: () => ({
 meta: [
 { title: "Resilience Capital — Lending against climate" },
 { name: "description", content: "Adaptive micro-loans for off-grid solar vendors. We don't ignore drought risk — we model it, and turn it into our edge." },
 { property: "og:title", content: "Resilience Capital" },
 { property: "og:description", content: "Climate-adaptive micro-lending for the 2.3M vendors banks decline." },
 ],
 }),
 component: Index,
});

function Index() {
 return (
 <div className="min-h-screen bg-background text-foreground">
 <SiteNav />
 <Hero />
 <Problem />
 <Solution />
 <Moat />
 <Traction />
 <CTA />
 <SiteFooter />
 </div>
 );
}

function Hero() {
 return (
 <section className="relative overflow-hidden">
 <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)] opacity-95" />
 <div className="absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_20%_20%,oklch(0.78_0.16_75/0.35),transparent_40%),radial-gradient(circle_at_80%_60%,oklch(0.55_0.15_155/0.3),transparent_45%)]" />
 <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
 <div className="text-primary-foreground">
 <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
 <Sparkles className="h-3 w-3" /> Climate-adaptive micro-lending
 </span>
 <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
 We don't lend money.<br />
 <span className="text-[oklch(0.88_0.12_75)]">We lend against climate.</span>
 </h1>
 <p className="mt-6 max-w-xl text-lg text-white/80">
 Banks decline 78% of off-grid solar vendors because they live in
 "drought zones." We approve them — with monthly payments that flow
 with the rain.
 </p>
 <div className="mt-10 flex flex-wrap gap-3">
 <Link
 to="/compare"
 className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5"
 >
 See the comparison
 <ArrowRight className="h-4 w-4 group-hover:translate-x-1" />
 </Link>
 <Link
 to="/dashboard"
 className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/10"
 >
 Lender dashboard
 </Link>
 </div>
 <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 text-white">
 <Stat value="96%" label="Vendor survival" />
 <Stat value="<5%" label="Default rate" />
 <Stat value="3 min" label="To disbursement" />
 </dl>
 </div>
 <HeroCard />
 </div>
 </section>
 );
}

function Stat({ value, label }: { value: string; label: string }) {
 return (
 <div>
 <dt className="text-3xl font-semibold tracking-tight">{value}</dt>
 <dd className="mt-1 text-xs uppercase tracking-wider text-white/60">{label}</dd>
 </div>
 );
}

function HeroCard() {
 return (
 <div className="relative">
 <div className="absolute -inset-4 rounded-3xl bg-white/10 blur-2xl" aria-hidden />
 <div className="relative rounded-2xl border border-white/15 bg-white/95 p-6 shadow-2xl">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-sun)] text-accent-foreground">
 <Sun className="h-5 w-5" />
 </div>
 <div>
 <p className="text-sm font-semibold text-foreground">James Ochieng</p>
 <p className="text-xs text-muted-foreground">Turkana, Kenya · Solar vendor</p>
 </div>
 </div>
 <span className="rounded-full bg-[color:var(--success)]/10 px-2.5 py-1 text-xs font-medium text-[color:var(--success)]">
 Approved
 </span>
 </div>
 <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
 <Mini label="Loan" value="KSh 2,000" />
 <Mini label="Resilience Score" value="82 / 100" />
 <Mini label="Climate window" value="90-day forecast" />
 <Mini label="Disbursement" value="M-Pesa · 3 min" />
 </div>
 <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4">
 <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Adaptive schedule</p>
 <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
 <Schedule label="Jan–Feb" amount="KSh 120" tone="discount" note="−30% drought" />
 <Schedule label="Mar–May" amount="KSh 280" tone="premium" note="+40% rainy" />
 <Schedule label="Jun–Dec" amount="KSh 200" tone="base" note="baseline" />
 </div>
 <p className="mt-4 text-xs text-muted-foreground">Total repayment: <span className="font-semibold text-foreground">KSh 2,400</span> — identical to a flat loan.</p>
 </div>
 </div>
 </div>
 );
}

function Mini({ label, value }: { label: string; value: string }) {
 return (
 <div className="rounded-lg border border-border bg-background p-3">
 <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
 <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
 </div>
 );
}

function Schedule({ label, amount, tone, note }: { label: string; amount: string; tone: "discount" | "premium" | "base"; note: string }) {
 const styles =
 tone === "discount"
 ? "bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/30"
 : tone === "premium"
 ? "bg-[color:var(--warning)]/10 text-[oklch(0.5_0.15_60)] border-[color:var(--warning)]/30"
 : "bg-muted text-foreground border-border";
 return (
 <div className={`rounded-md border px-2 py-2 ${styles}`}>
 <p className="text-[10px] font-medium uppercase tracking-wider opacity-80">{label}</p>
 <p className="mt-0.5 text-sm font-semibold">{amount}</p>
 <p className="text-[10px] opacity-75">{note}</p>
 </div>
 );
}

function Problem() {
 return (
 <section className="border-y border-border bg-secondary/40">
 <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
 <div>
 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The Problem</p>
 <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
 When loans are flat, climate breaks businesses.
 </h2>
 <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
 2.3 million off-grid solar vendors in Africa need inventory financing.
 Banks decline 78% because they live in "drought zones." The result isn't
 just vendor failure — it's <span className="font-semibold text-foreground">energy poverty</span>.
 Kerosene burns. Children study by smoke. Clinics go dark.
 </p>
 <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
 The flat monthly repayment model is fundamentally broken for
 climate-dependent cash flows.
 </p>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <Stat2 value="78%" label="Solar vendors declined by banks" />
 <Stat2 value="60%" label="Industry vendor survival rate" />
 <Stat2 value="18%" label="MFI default rate" />
 <Stat2 value="600M" label="Africans without grid power" />
 </div>
 </div>
 </section>
 );
}

function Stat2({ value, label }: { value: string; label: string }) {
 return (
 <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
 <p className="text-4xl font-semibold tracking-tight text-foreground">{value}</p>
 <p className="mt-2 text-sm text-muted-foreground">{label}</p>
 </div>
 );
}

function Solution() {
 return (
 <section className="mx-auto max-w-7xl px-6 py-24">
 <div className="max-w-3xl">
 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The Solution</p>
 <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
 The Resilience Pricing Algorithm.
 </h2>
 <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
 We model 90-day drought forecasts using satellite rainfall, soil moisture,
 vegetation index, and seasonal patterns — then auto-adjust monthly
 payments to match real cash flow.
 </p>
 </div>
 <div className="mt-12 grid gap-5 md:grid-cols-3">
 <Pill tone="success" title="Critical drought months" delta="−30%" body="Payments drop when cash flow does. Vendors keep stock instead of defaulting." />
 <Pill tone="warning" title="Rainy season premium" delta="+40%" body="Vendors pay more when demand surges. The total is identical to a flat loan." />
 <Pill tone="base" title="Resilience score" delta="0–100" body="Satellite + mobile money + community references. Built for the credit-invisible." />
 </div>
 <div className="mt-10 rounded-2xl border border-border bg-[image:var(--gradient-earth)] p-8 shadow-[var(--shadow-soft)]">
 <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">The unlock</p>
 <p className="mt-2 text-2xl font-medium leading-snug text-foreground md:text-3xl">
 "Drought is exactly when people need solar most."
 </p>
 <p className="mt-2 text-sm text-muted-foreground">— James Ochieng, vendor, Turkana</p>
 </div>
 </section>
 );
}

function Pill({ tone, title, delta, body }: { tone: "success" | "warning" | "base"; title: string; delta: string; body: string }) {
 const color =
 tone === "success" ? "text-[color:var(--success)]" : tone === "warning" ? "text-[oklch(0.55_0.16_60)]" : "text-primary";
 return (
 <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:-translate-y-1">
 <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
 <p className={`mt-2 text-4xl font-semibold tracking-tight ${color}`}>{delta}</p>
 <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
 </div>
 );
}

const moatItems = [
 { icon: TrendingUp, title: "Alternative data scoring", body: "Satellite imagery, M-Pesa flows, and community references replace credit bureaus." },
 { icon: Cloud, title: "Adaptive repayment", body: "Climate-adjusted pricing — our core innovation. Same total, smarter cadence." },
 { icon: Coins, title: "Carbon credit revenue", body: "Each financed panel earns KSh 2–5/month in CO₂-avoided credits, paid to vendors." },
 { icon: Shield, title: "Parametric insurance", body: "Auto KSh 50–200 payout when drought index hits 80%. No claims process." },
 { icon: Zap, title: "Tokenized portfolios", body: "Climate Resilience Bonds — packaged loan books for global ESG investors." },
];

function Moat() {
 return (
 <section className="border-t border-border bg-secondary/30">
 <div className="mx-auto max-w-7xl px-6 py-24">
 <div className="flex items-end justify-between gap-8">
 <div>
 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The Moat</p>
 <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">Five layers deep.</h2>
 </div>
 <p className="hidden max-w-md text-sm text-muted-foreground md:block">
 Defensibility isn't a feature. It's a stack. Each layer compounds the next.
 </p>
 </div>
 <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
 {moatItems.map((m, i) => (
 <div key={m.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:-translate-y-1">
 <span className="absolute right-4 top-4 text-xs font-mono text-muted-foreground/60">0{i + 1}</span>
 <div className="grid h-10 w-10 place-items-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
 <m.icon className="h-5 w-5" />
 </div>
 <h3 className="mt-4 text-base font-semibold text-foreground">{m.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}

function Traction() {
 return (
 <section className="mx-auto max-w-7xl px-6 py-24">
 <div className="grid gap-12 md:grid-cols-2">
 <div>
 <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Impact per KSh 100K deployed</p>
 <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
 Better risk management. Period.
 </h2>
 <p className="mt-6 text-lg text-muted-foreground">
 This isn't charity. Adaptive pricing produces a measurably better book
 than any flat-rate MFI portfolio in the same region.
 </p>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <Stat2 value="25,000" label="People gaining energy access" />
 <Stat2 value="1,200t" label="CO₂ avoided per 1,000 panels" />
 <Stat2 value="96%" label="Vendor survival rate" />
 <Stat2 value="6%" label="Unit margin per loan" />
 </div>
 </div>
 </section>
 );
}

function CTA() {
 return (
 <section className="px-6 pb-24">
 <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-12 text-primary-foreground shadow-[var(--shadow-soft)] md:p-16">
 <p className="text-xs font-semibold uppercase tracking-widest text-white/70">The Ask</p>
 <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
 KSh 50,000 for a 6-month Kenya pilot.
 </h2>
 <p className="mt-4 max-w-2xl text-lg text-white/80">
 500 vendors. 2 MFI partnerships. A validated default-prediction model.
 Then we package the book as a Climate Resilience Bond and scale.
 </p>
 <div className="mt-8 flex flex-wrap gap-3">
 <Link to="/compare" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5">
 See the interactive demo <ArrowRight className="h-4 w-4" />
 </Link>
 <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/10">
 Open lender dashboard
 </Link>
 </div>
 </div>
 </section>
 );
}


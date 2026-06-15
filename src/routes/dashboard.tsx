import { createFileRoute } from "@tanstack/react-router";
import { Activity, ArrowDownRight, ArrowUpRight, CloudRain, Droplets, Sun, TrendingUp, Users } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Lender Dashboard — Resilience Capital" },
      { name: "description", content: "Live portfolio of climate-adaptive loans across East Africa. Resilience scores, climate exposure, repayment health." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Lender dashboard</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">Kenya Pilot · Cohort 01</h1>
              <p className="mt-2 text-sm text-muted-foreground">Live portfolio · 487 active vendors · Updated 2 minutes ago</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--success)]/15 px-2.5 py-1 font-medium text-[color:var(--success)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--success)]" /> Climate feed online
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-medium text-muted-foreground">
                NASA POWER · OpenWeatherMap
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-4">
          <Kpi label="Deployed capital" value="$612,400" delta="+12.3%" trend="up" icon={TrendingUp} />
          <Kpi label="Default rate" value="3.8%" delta="−14.2 pts vs industry" trend="down" icon={Activity} good />
          <Kpi label="Vendor survival" value="96.1%" delta="+36 pts vs industry" trend="up" icon={Users} good />
          <Kpi label="CO₂ avoided (YTD)" value="1,240 t" delta="+118 t / mo" trend="up" icon={Sun} />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Climate exposure map</h2>
                <p className="text-xs text-muted-foreground">Resilience-weighted vendor density · East Africa</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <Legend swatch="bg-[color:var(--success)]" label="Low risk" />
                <Legend swatch="bg-[color:var(--warning)]" label="Moderate" />
                <Legend swatch="bg-destructive" label="Critical" />
              </div>
            </div>
            <ClimateMap />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">90-day climate forecast</h2>
            <p className="text-xs text-muted-foreground">Turkana region · drought index</p>
            <ForecastChart />
            <ul className="mt-5 space-y-2 text-sm">
              <Insight icon={<Sun className="h-4 w-4 text-[color:var(--warning)]" />} text="Drought signal rising — 38 vendors enter discount window next month." />
              <Insight icon={<CloudRain className="h-4 w-4 text-primary" />} text="Long rains expected on Mar 12 (±9 days). Premium tier activates automatically." />
              <Insight icon={<Droplets className="h-4 w-4 text-[color:var(--success)]" />} text="Soil moisture model: 0.21 m³/m³ — below 5-year average." />
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-0 shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold">Active vendors</h2>
              <span className="text-xs text-muted-foreground">Showing 6 of 487</span>
            </div>
            <VendorTable />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Portfolio composition</h2>
            <p className="text-xs text-muted-foreground">Resilience Bond — Series A</p>
            <div className="mt-5 space-y-4">
              <Bar label="Critical drought zones" pct={32} tone="warn" />
              <Bar label="Moderate exposure" pct={47} tone="base" />
              <Bar label="Low exposure" pct={21} tone="good" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <Mini2 label="Weighted yield" value="11.4%" />
              <Mini2 label="Origination fee" value="2.5%" />
              <Mini2 label="Net margin" value="6.0%" />
              <Mini2 label="Carbon uplift" value="+0.8%" />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Kpi({ label, value, delta, trend, icon: Icon, good }: { label: string; value: string; delta: string; trend: "up" | "down"; icon: any; good?: boolean }) {
  const arrow = trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />;
  const positive = good ?? trend === "up";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${positive ? "text-[color:var(--success)]" : "text-destructive"}`}>
        {arrow} {delta}
      </p>
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

const mapDots = [
  { x: 28, y: 22, r: 14, tone: "warn", label: "Turkana" },
  { x: 36, y: 30, r: 10, tone: "warn", label: "Marsabit" },
  { x: 44, y: 44, r: 18, tone: "good", label: "Nakuru" },
  { x: 56, y: 52, r: 22, tone: "good", label: "Nairobi" },
  { x: 68, y: 60, r: 12, tone: "base", label: "Machakos" },
  { x: 50, y: 64, r: 9, tone: "bad", label: "Kajiado" },
  { x: 72, y: 38, r: 11, tone: "warn", label: "Garissa" },
  { x: 40, y: 58, r: 13, tone: "good", label: "Narok" },
  { x: 60, y: 30, r: 8, tone: "warn", label: "Isiolo" },
  { x: 80, y: 70, r: 14, tone: "good", label: "Mombasa" },
];

function ClimateMap() {
  return (
    <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-earth)]">
      <div className="absolute inset-0 [background-image:linear-gradient(oklch(0.42_0.11_155/0.06)_1px,transparent_1px),linear-gradient(90deg,oklch(0.42_0.11_155/0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full">
        <path d="M22 18 Q40 8 65 16 T92 38 Q88 60 70 66 Q45 72 28 60 Q12 48 18 30 Z" fill="oklch(0.55 0.08 155 / 0.15)" stroke="oklch(0.42 0.11 155 / 0.5)" strokeWidth="0.3" />
      </svg>
      {mapDots.map((d, i) => {
        const color =
          d.tone === "good" ? "oklch(0.55 0.15 155)" : d.tone === "warn" ? "oklch(0.72 0.17 60)" : d.tone === "bad" ? "oklch(0.55 0.22 28)" : "oklch(0.42 0.11 155)";
        return (
          <div key={i} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
            <span className="absolute inset-0 -m-2 animate-ping rounded-full opacity-30" style={{ backgroundColor: color, width: d.r * 2 + 8, height: d.r * 2 + 8 }} />
            <span className="block rounded-full ring-2 ring-white" style={{ width: d.r, height: d.r, backgroundColor: color }} />
            <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground/90 px-1.5 py-0.5 text-[10px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
              {d.label}
            </span>
          </div>
        );
      })}
      <div className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
        487 active vendors · 14 counties
      </div>
    </div>
  );
}

function ForecastChart() {
  const data = [22, 28, 35, 44, 58, 68, 72, 64, 50, 38, 30, 26];
  const max = 80;
  return (
    <div className="mt-4 h-32 w-full">
      <svg viewBox="0 0 240 100" className="h-full w-full">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.17 60)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.72 0.17 60)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="url(#g1)"
          stroke="none"
          points={`0,100 ${data.map((d, i) => `${(i / (data.length - 1)) * 240},${100 - (d / max) * 90}`).join(" ")} 240,100`}
        />
        <polyline
          fill="none"
          stroke="oklch(0.72 0.17 60)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={data.map((d, i) => `${(i / (data.length - 1)) * 240},${100 - (d / max) * 90}`).join(" ")}
        />
        <line x1="0" y1={100 - (60 / max) * 90} x2="240" y2={100 - (60 / max) * 90} stroke="oklch(0.55 0.22 28)" strokeWidth="0.5" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

function Insight({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-muted-foreground">
      <span className="mt-0.5">{icon}</span>
      <span>{text}</span>
    </li>
  );
}

const vendors = [
  { name: "James Ochieng", loc: "Turkana", loan: "$2,000", score: 82, status: "Current", climate: "warn", repay: 41 },
  { name: "Amina Hassan", loc: "Garissa", loan: "$1,400", score: 76, status: "Current", climate: "warn", repay: 62 },
  { name: "Peter Mwangi", loc: "Nakuru", loan: "$3,200", score: 88, status: "Current", climate: "good", repay: 78 },
  { name: "Grace Wairimu", loc: "Machakos", loan: "$1,800", score: 71, status: "Discount window", climate: "base", repay: 28 },
  { name: "Daniel Kiprop", loc: "Narok", loan: "$2,600", score: 84, status: "Current", climate: "good", repay: 55 },
  { name: "Mary Achieng", loc: "Kajiado", loan: "$900", score: 64, status: "Parametric paid", climate: "bad", repay: 33 },
];

function VendorTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-6 py-3 text-left font-medium">Vendor</th>
            <th className="px-3 py-3 text-left font-medium">Loan</th>
            <th className="px-3 py-3 text-left font-medium">Score</th>
            <th className="px-3 py-3 text-left font-medium">Climate</th>
            <th className="px-3 py-3 text-left font-medium">Repayment</th>
            <th className="px-6 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.name} className="border-t border-border hover:bg-secondary/30">
              <td className="px-6 py-4">
                <p className="font-medium text-foreground">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.loc}</p>
              </td>
              <td className="px-3 py-4 font-medium">{v.loan}</td>
              <td className="px-3 py-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-12 rounded-full bg-secondary">
                    <span className="block h-full rounded-full bg-primary" style={{ width: `${v.score}%` }} />
                  </span>
                  <span className="font-semibold">{v.score}</span>
                </span>
              </td>
              <td className="px-3 py-4">
                <ClimateChip tone={v.climate as "good" | "warn" | "bad" | "base"} />
              </td>
              <td className="px-3 py-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-16 rounded-full bg-secondary">
                    <span className="block h-full rounded-full bg-[color:var(--success)]" style={{ width: `${v.repay}%` }} />
                  </span>
                  <span className="text-xs text-muted-foreground">{v.repay}%</span>
                </span>
              </td>
              <td className="px-6 py-4 text-xs text-muted-foreground">{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClimateChip({ tone }: { tone: "good" | "warn" | "bad" | "base" }) {
  const map = {
    good: { bg: "bg-[color:var(--success)]/15", fg: "text-[color:var(--success)]", label: "Low" },
    warn: { bg: "bg-[color:var(--warning)]/15", fg: "text-[oklch(0.5_0.15_60)]", label: "Drought" },
    bad: { bg: "bg-destructive/15", fg: "text-destructive", label: "Critical" },
    base: { bg: "bg-primary/10", fg: "text-primary", label: "Moderate" },
  } as const;
  const s = map[tone];
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${s.bg} ${s.fg}`}>{s.label}</span>;
}

function Bar({ label, pct, tone }: { label: string; pct: number; tone: "good" | "warn" | "base" }) {
  const color = tone === "good" ? "bg-[color:var(--success)]" : tone === "warn" ? "bg-[color:var(--warning)]" : "bg-primary";
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{pct}%</span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-secondary">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Mini2({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-semibold">{value}</p>
    </div>
  );
}
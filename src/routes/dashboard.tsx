import { createFileRoute } from "@tanstack/react-router";
import { Activity, ArrowDownRight, ArrowUpRight, CloudRain, Droplets, ExternalLink, Sun, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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

// [lng, lat] for Kenya vendor hubs
const vendorPins: { name: string; coords: [number, number]; score: number; loan: number }[] = [
  { name: "Turkana", coords: [35.6, 3.12], score: 62, loan: 2000 },
  { name: "Marsabit", coords: [37.99, 2.33], score: 58, loan: 1500 },
  { name: "Garissa", coords: [39.66, -0.45], score: 64, loan: 1400 },
  { name: "Isiolo", coords: [37.58, 0.35], score: 67, loan: 1800 },
  { name: "Nakuru", coords: [36.07, -0.30], score: 88, loan: 3200 },
  { name: "Nairobi", coords: [36.82, -1.29], score: 91, loan: 4100 },
  { name: "Machakos", coords: [37.27, -1.52], score: 71, loan: 1800 },
  { name: "Narok", coords: [35.87, -1.08], score: 84, loan: 2600 },
  { name: "Kajiado", coords: [36.78, -1.85], score: 54, loan: 900 },
  { name: "Mombasa", coords: [39.66, -4.04], score: 86, loan: 2400 },
];

function scoreColor(score: number) {
  if (score >= 80) return "oklch(0.55 0.15 155)"; // success
  if (score >= 65) return "oklch(0.72 0.17 60)"; // warning
  return "oklch(0.55 0.22 28)"; // critical
}

function ClimateMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("mapbox_token") ?? "" : "",
  );
  const [draft, setDraft] = useState(token);

  useEffect(() => {
    if (!token || !containerRef.current) return;
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [37.9, 0.5],
      zoom: 4.6,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      vendorPins.forEach((v) => {
        const el = document.createElement("div");
        const color = scoreColor(v.score);
        const size = 14 + Math.round(v.loan / 200);
        el.style.cssText = `width:${size}px;height:${size}px;border-radius:9999px;background:${color};box-shadow:0 0 0 3px white,0 0 16px ${color};cursor:pointer;`;
        new mapboxgl.Marker({ element: el })
          .setLngLat(v.coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 14, closeButton: false }).setHTML(
              `<div style="font-family:inherit;padding:4px 2px"><strong>${v.name}</strong><br/>Resilience score: <b>${v.score}</b><br/>Loan: $${v.loan.toLocaleString()}</div>`,
            ),
          )
          .addTo(map);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [token]);

  if (!token) {
    return (
      <div className="mt-5 rounded-xl border border-dashed border-border bg-secondary/40 p-6">
        <p className="text-sm font-medium">Connect Mapbox to render the live exposure map.</p>
        <p className="mt-1 text-xs text-muted-foreground">Paste a public token (pk.…) from your Mapbox account. Stored locally in this browser only.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="pk.eyJ1Ijo..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            onClick={() => {
              localStorage.setItem("mapbox_token", draft.trim());
              setToken(draft.trim());
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Activate map
          </button>
        </div>
        <a
          href="https://account.mapbox.com/access-tokens/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Get a free Mapbox token <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-xl border border-border">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-background/85 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
        487 active vendors · 14 counties
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("mapbox_token");
          setToken("");
          setDraft("");
        }}
        className="absolute left-3 top-3 rounded-md bg-background/85 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur hover:text-foreground"
      >
        Reset token
      </button>
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
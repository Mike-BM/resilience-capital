import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brian Muema | Data Analyst | Data Science" },
      { name: "description", content: "Brian Muema is a data analyst and data science professional focused on statistics, Python, SQL, data visualization, and business problem solving." },
      { property: "og:title", content: "Brian Muema | Data Analyst | Data Science" },
      { property: "og:description", content: "Turning data into insights, insights into decisions." },
    ],
  }),
  component: Index,
});

const skillGroups = [
  {
    title: "Data Analysis",
    items: ["Python", "Pandas", "NumPy", "Excel", "R", "SPSS", "STATA"],
  },
  {
    title: "Data Visualization",
    items: ["Power BI", "Tableau", "Matplotlib", "Plotly", "Seaborn", "Dashboards"],
  },
  {
    title: "Data Management",
    items: ["SQL", "PostgreSQL", "Data Cleaning", "ETL", "Data Modeling", "Reporting"],
  },
  {
    title: "Data Science",
    items: ["Statistics", "Machine Learning", "Forecasting", "Predictive Modeling", "Experimentation", "A/B Testing"],
  },
];

const projectCards = [
  {
    title: "Sales Performance Dashboard",
    summary: "Built a KPI dashboard to uncover revenue gaps, seasonality, and channel profitability for operational teams.",
    tags: ["Power BI", "SQL", "Python"],
    impact: "Improved decision speed and highlighted underperforming segments in one review cycle.",
  },
  {
    title: "Customer Retention Analysis",
    summary: "Analyzed churn indicators and segment trends using statistical methods and data storytelling to guide retention strategy.",
    tags: ["Python", "Pandas", "Statistics"],
    impact: "Identified recurring churn behaviors and ranked risk drivers for business action.",
  },
  {
    title: "Market Insight Tracker",
    summary: "Created a reusable analytics workflow to monitor market movement, performance signals, and business opportunities.",
    tags: ["Tableau", "Excel", "Forecasting"],
    impact: "Turned fragmented data into a clear, decision-ready reporting view.",
  },
];

const insights = [
  {
    title: "Business Metrics That Matter",
    body: "Simple scorecards often hide the real signal. I focus on the metrics that reflect business outcomes, not just activity.",
  },
  {
    title: "Storytelling Through Data",
    body: "Clear visual narratives help teams move from raw numbers to action. That is where analytical work becomes valuable.",
  },
  {
    title: "Decision-Making with Evidence",
    body: "I translate analysis into measurable recommendations, making technical insight useful to both analysts and leaders.",
  },
];

const experience = [
  {
    role: "Data Analyst / Data Science Enthusiast",
    company: "Independent Projects & Practice",
    period: "2023 — Present",
    bullets: [
      "Built dashboards and analytical workflows using Python, SQL, and visualization tools to solve real-world business problems.",
      "Applied exploratory analysis, statistics, and predictive thinking to uncover patterns, monitor trends, and inform decisions.",
      "Turned messy data into clear, actionable narratives for technical and non-technical audiences.",
    ],
  },
  {
    role: "Analytical & Research Experience",
    company: "Economics & Statistics Foundation",
    period: "2019 — 2023",
    bullets: [
      "Developed a strong analytical base in quantitative reasoning, inference, and economic and statistical problem solving.",
      "Used data-driven methods to interpret patterns, compare outcomes, and support evidence-based conclusions.",
      "Strengthened technical skills in data analysis, reporting, and interpretation across applied study contexts.",
    ],
  },
];

const education = [
  {
    title: "Economics & Statistics",
    school: "Academic foundation",
    detail: "Focused on quantitative analysis, research methods, and evidence-based decision-making.",
  },
  {
    title: "Data Analytics & Data Science Practice",
    school: "Self-directed learning & applied projects",
    detail: "Continuous development in Python, SQL, visualization, and machine learning for practical problem solving.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)] opacity-95" />
          <div className="absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_15%_20%,oklch(0.78_0.16_215/0.45),transparent_38%),radial-gradient(circle_at_85%_62%,oklch(0.68_0.12_190/0.35),transparent_40%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
            <div className="text-primary-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" /> Data Analyst | Data Science
              </span>
              <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                Turning Data Into Insights, <span className="text-[oklch(0.88_0.12_200)]">Insights Into Decisions.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                I analyze data, uncover patterns, and build data-driven solutions using statistics, Python, SQL, data visualization, and machine learning.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
                >
                  View My Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/Brian-Muema-CV.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-white/75">
                {['Python', 'SQL', 'Statistics', 'Power BI', 'Machine Learning'].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-white/10 blur-3xl" aria-hidden="true" />
              <div className="relative rounded-[1.75rem] border border-white/20 bg-white/95 p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Portfolio snapshot</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">Q1 analytics overview</p>
                  </div>
                  <span className="rounded-full bg-[color:var(--success)]/10 px-2.5 py-1 text-xs font-medium text-[color:var(--success)]">Up 18%</span>
                </div>

                <div className="mt-8 flex h-36 items-end gap-3">
                  {[38, 56, 68, 80, 62, 88, 96].map((height, index) => (
                    <div key={height} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className={`w-full rounded-t-xl ${index % 2 === 0 ? 'bg-[oklch(0.66_0.14_215)]' : 'bg-[oklch(0.54_0.12_200)]'}`}
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <MetricCard label="Projects" value="12+" />
                  <MetricCard label="Insights" value="95%" />
                  <MetricCard label="Focus" value="Data" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">About Me</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Turning analytical thinking into practical business value.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                I have a foundation in Economics and Statistics and I am focused on developing practical expertise in Data Analytics and Data Science. My work is grounded in statistical thinking, data analysis, and clear communication.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                I enjoy uncovering patterns, building useful visualizations, and turning complex data into actionable insight. Python, SQL, and machine learning are part of my toolkit, but business problem solving remains at the center of everything I do.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Data professional with a statistical foundation
              </div>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  "Economics & Statistics",
                  "Data Analytics",
                  "Data Science",
                ].map((step, index) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium text-foreground">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="border-y border-border bg-secondary/35">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Skills</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Analytical skills built for real-world problems.</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {skillGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                      {group.title.includes("Visualization") ? <BarChart3 className="h-5 w-5" /> : group.title.includes("Data Management") ? <Database className="h-5 w-5" /> : group.title.includes("Science") ? <TrendingUp className="h-5 w-5" /> : <Code2 className="h-5 w-5" />}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[color:var(--success)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Projects</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Selected work.</h2>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-90">
              Let's connect
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projectCards.map((project) => (
              <article key={project.title} className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/30 p-4 text-sm text-foreground">
                  <span className="font-semibold">Impact:</span> {project.impact}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="insights" className="border-y border-border bg-secondary/35">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Insights</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">What drives my approach.</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {insights.map((insight) => (
                <div key={insight.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{insight.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{insight.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Experience</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Analytical experience with a strong foundation.</h2>
          </div>

          <div className="mt-12 space-y-6">
            {experience.map((item) => (
              <div key={item.role} className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xl font-semibold text-foreground">{item.role}</p>
                    <p className="mt-1 text-sm font-medium text-primary">{item.company}</p>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{item.period}</span>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="border-y border-border bg-secondary/35">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Education</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Academic base and continuous learning.</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {education.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium text-primary">{item.school}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="rounded-[2rem] border border-border bg-[image:var(--gradient-hero)] p-8 text-primary-foreground shadow-[var(--shadow-soft)] md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Let's Connect</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Open to data opportunities and collaborations.</h2>
                <p className="mt-4 max-w-xl text-base text-white/80">
                  I am interested in data analysis, data science, business insight work, and meaningful collaborative projects that turn information into impact.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <a href="mailto:brian.muema@example.com" className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                  <Mail className="h-4 w-4" />
                  brian.muema@example.com
                </a>
                <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
                  <BriefcaseBusiness className="h-4 w-4" />
                  Available for data-focused roles and collaborations
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-3">
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

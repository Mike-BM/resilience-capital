import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function SiteNav() {
 return (
 <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
 <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
 <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
 <span className="grid h-8 w-8 place-items-center rounded-md bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
 <Leaf className="h-4 w-4" />
 </span>
 <span className="text-lg">Resilience Capital</span>
 </Link>
 <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
 <Link to="/compare" className=" hover:text-foreground" activeProps={{ className: "text-foreground" }}>
 The Comparison
 </Link>
 <Link to="/apply" className=" hover:text-foreground" activeProps={{ className: "text-foreground" }}>
 Vendor Application
 </Link>
 <Link to="/dashboard" className=" hover:text-foreground" activeProps={{ className: "text-foreground" }}>
 Lender Dashboard
 </Link>
 </nav>
 <Link
 to="/apply"
 className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5"
 >
 Apply for a loan
 </Link>
 </div>
 </header>
 );
}

export function SiteFooter() {
 return (
 <footer className="border-t border-border/60 bg-secondary/40">
 <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
 <p>© {new Date().getFullYear()} Resilience Capital. Lending against climate.</p>
 <p className="text-xs">Demo build · NASA POWER · OpenWeatherMap · M-Pesa Daraja</p>
 </div>
 </footer>
 );
}


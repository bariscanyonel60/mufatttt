"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Inbox, Settings, Search, Briefcase, Building2, Newspaper,
  UserPlus, MessageSquareQuote, BadgeCheck, ListOrdered, Info, Image, History,
  LogOut, Menu, X, ExternalLink,
} from "lucide-react";
import { navItems } from "@/lib/admin/schema";

const icons = {
  LayoutDashboard, Inbox, Settings, Search, Briefcase, Building2, Newspaper,
  UserPlus, MessageSquareQuote, BadgeCheck, ListOrdered, Info, Image, History,
} as const;

export default function AdminShell({
  user,
  children,
}: {
  user: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const Nav = (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
      {navItems.map((item) => {
        const Icon = icons[item.icon];
        const active = item.href === "/admin" ? path === "/admin" : path.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-gold/15 text-gold"
                : "text-white/65 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={17} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-white">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/8 bg-[#12151b] lg:flex">
        <div className="border-b border-white/8 px-5 py-5">
          <p className="font-display text-lg font-extrabold tracking-tight">
            MUFAT<span className="text-gold">.</span>
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/40">Yönetim Paneli</p>
        </div>
        {Nav}
        <div className="border-t border-white/8 p-4">
          <p className="truncate text-xs text-white/45">{user}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={15} /> Çıkış
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button className="absolute inset-0 bg-black/60" aria-label="Kapat" onClick={() => setOpen(false)} />
          <aside className="relative z-10 flex h-full w-72 flex-col bg-[#12151b]">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-4">
              <p className="font-display font-extrabold">MUFAT<span className="text-gold">.</span></p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Kapat"><X size={18} /></button>
            </div>
            {Nav}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/8 bg-[#0f1115]/90 px-4 backdrop-blur md:px-6">
          <button type="button" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Menü">
            <Menu size={20} />
          </button>
          <p className="hidden text-sm text-white/50 lg:block">İçerik ve başvuru yönetimi</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:border-gold/40 hover:text-gold"
          >
            Siteyi gör <ExternalLink size={12} />
          </a>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

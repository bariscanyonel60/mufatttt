import Link from "next/link";
import { getDashboardStats } from "@/lib/admin/store";
import {
  Briefcase, Building2, Newspaper, Inbox, UserPlus, MessageSquareQuote,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const stats = getDashboardStats();

  const cards = [
    { label: "Hizmetler", value: stats.services, href: "/admin/services", Icon: Briefcase },
    { label: "Projeler", value: stats.projects, href: "/admin/projects", Icon: Building2 },
    { label: "Blog yazıları", value: stats.posts, href: "/admin/blog", Icon: Newspaper },
    { label: "Açık ilanlar", value: stats.jobs, href: "/admin/jobs", Icon: UserPlus },
    { label: "Yorumlar", value: stats.testimonials, href: "/admin/testimonials", Icon: MessageSquareQuote },
    { label: "Yeni başvurular", value: stats.newSubmissions, href: "/admin/submissions", Icon: Inbox, highlight: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Özet</h1>
        <p className="mt-1 text-sm text-white/45">
          Son güncelleme: {new Date(stats.updatedAt).toLocaleString("tr-TR")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, href, Icon, highlight }) => (
          <Link
            key={href + label}
            href={href}
            className={`rounded-xl border p-5 transition hover:border-gold/40 ${
              highlight ? "border-gold/30 bg-gold/10" : "border-white/8 bg-[#151922]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/50">{label}</p>
              <Icon size={18} className={highlight ? "text-gold" : "text-white/35"} />
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-white/8 bg-[#151922] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Son başvurular</h2>
            <Link href="/admin/submissions" className="text-xs text-gold hover:underline">Tümü</Link>
          </div>
          <ul className="space-y-3">
            {stats.recentSubmissions.length === 0 && (
              <li className="text-sm text-white/40">Henüz başvuru yok.</li>
            )}
            {stats.recentSubmissions.map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 text-sm last:border-0">
                <div>
                  <p className="font-medium text-white/90">{s.name}</p>
                  <p className="text-white/40">
                    {s.type === "contact" ? `İletişim · ${s.subject}` : `Kariyer · ${s.jobTitle}`}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                  s.status === "new" ? "bg-gold/20 text-gold" : "bg-white/10 text-white/50"
                }`}>
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-white/8 bg-[#151922] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Son aktiviteler</h2>
            <Link href="/admin/activity" className="text-xs text-gold hover:underline">Tümü</Link>
          </div>
          <ul className="space-y-3">
            {stats.recentActivity.length === 0 && (
              <li className="text-sm text-white/40">Aktivite kaydı yok.</li>
            )}
            {stats.recentActivity.map((a) => (
              <li key={a.id} className="border-b border-white/5 pb-3 text-sm last:border-0">
                <p className="text-white/85">
                  <span className="text-gold">{a.action}</span> · {a.entity}
                </p>
                <p className="text-white/40">{a.detail} · {new Date(a.at).toLocaleString("tr-TR")}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-dashed border-white/15 bg-[#151922]/60 p-5">
        <h2 className="font-semibold">Hızlı işlemler</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["/admin/projects", "Yeni proje"],
            ["/admin/blog", "Blog yazısı"],
            ["/admin/jobs", "İş ilanı"],
            ["/admin/site", "İletişim bilgileri"],
            ["/admin/media", "Medya yükle"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:border-gold/40 hover:text-gold"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

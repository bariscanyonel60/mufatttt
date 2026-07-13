import { getActivity } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default function Page() {
  const { items } = getActivity();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Aktivite Günlüğü</h1>
        <p className="mt-1 text-sm text-white/45">Son 200 işlem kaydı</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/8 bg-[#151922]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/8 text-[11px] uppercase tracking-wider text-white/40">
            <tr>
              <th className="px-4 py-3">Zaman</th>
              <th className="px-4 py-3">İşlem</th>
              <th className="px-4 py-3">Varlık</th>
              <th className="hidden px-4 py-3 md:table-cell">Detay</th>
              <th className="px-4 py-3">Kullanıcı</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id} className="border-b border-white/5">
                <td className="px-4 py-3 text-white/50">{new Date(a.at).toLocaleString("tr-TR")}</td>
                <td className="px-4 py-3 text-gold">{a.action}</td>
                <td className="px-4 py-3">{a.entity}</td>
                <td className="hidden px-4 py-3 text-white/50 md:table-cell">{a.detail}</td>
                <td className="px-4 py-3 text-white/50">{a.user}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-white/40">Kayıt yok</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
